import { useEffect, useRef, useCallback, useState } from 'react';

const useSSE = () => {
  const [msg, setMsg] = useState(null);
  const [updArtists, setUpdArtists] = useState(null);

  const doNotTrack = JSON.parse(localStorage.getItem('doNotTrack'));

  const reset = useCallback(() => {
    setMsg(null);
    setUpdArtists(null);
  }, []);

  const evtSrc = useRef(null);
  const streamURI = process.env.REACT_APP_SSE_URI;

  const listenEvt = useCallback(() => {
    if (!evtSrc.current && !doNotTrack) {
      evtSrc.current = new EventSource(streamURI, { withCredentials: true });
      evtSrc.current.onmessage = e => {
        const streamData = JSON.parse(e.data);
        if (streamData.msg) {
          setMsg(streamData.msg);
        } else if (streamData.tracks) {
          const artists = streamData.tracks.map(streamDataE => streamDataE._id);
          setUpdArtists(artists);
        }
      };
    }
  }, [doNotTrack, streamURI]);

  useEffect(() => {
    listenEvt();
    return () => evtSrc.current && evtSrc.current.close();
  }, [listenEvt]);

  return { msg, updArtists, reset };
};

export default useSSE;
