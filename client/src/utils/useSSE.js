import { useEffect, useRef, useCallback, useState } from 'react';

const useSSE = () => {
  const [msg, setMsg] = useState(null);
  const [updArtists, setUpdArtists] = useState(null);

  const reset = useCallback(() => {
    setMsg(null);
    setUpdArtists(null);
  }, []);

  const evtSrc = useRef(null);
  const streamURI =
    window.location.protocol === 'https:'
      ? process.env.REACT_APP_SSE_URI
      : process.env.REACT_APP_SSE_URI.replace('https', 'http');

  const listenEvt = useCallback(() => {
    if (!evtSrc.current) {
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
  }, [streamURI]);

  useEffect(() => {
    listenEvt();
    return () => evtSrc.current && evtSrc.current.close();
  }, [listenEvt]);

  return { msg, updArtists, reset };
};

export default useSSE;
