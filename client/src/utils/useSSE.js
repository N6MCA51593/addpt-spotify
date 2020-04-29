import React, { useEffect, useRef, useCallback } from 'react';

const useSSE = () => {
  const evtSrc = useRef(null);
  const streamURI = 'http://localhost:5000/api/sync/stream';
  const listenEvt = useCallback(() => {
    if (!evtSrc.current) {
      evtSrc.current = new EventSource(streamURI, { withCredentials: true });
      evtSrc.current.onopen = () => console.log('open');
      evtSrc.current.onmessage = e => console.log('fired');
    }
  }, []);

  useEffect(() => {
    listenEvt();
    return () => evtSrc.current.close();
  }, [listenEvt]);

  return <div></div>;
};

export default useSSE;
