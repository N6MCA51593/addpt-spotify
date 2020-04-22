import { useState, useEffect } from 'react';
import useAPIRequest from './useAPIRequest';

const useDeleteArtist = () => {
  const setConfig = useAPIRequest({})[1];
  const [id, setID] = useState(null);
  const [name, setName] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (id && confirmed) {
      setConfig({
        url: 'api/library',
        method: 'delete',
        params: { artistid: id }
      });
      setID(null);
      setName(null);
      setConfirmed(false);
    }
  }, [id, confirmed, setConfirmed, setConfig]);
  return { id, setID, name, setName, setConfirmed };
};

export default useDeleteArtist;
