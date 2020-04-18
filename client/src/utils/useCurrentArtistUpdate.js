import { useState, useEffect } from 'react';

const useCurrentArtistUpdate = () => {
  const [artist, setArtist] = useState(null);
  const [params, setParams] = useState(null);
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    if (params) {
      const { artistParam, albumParam, trackParam, listens } = params;
      if (trackParam) {
        console.log(trackParam);
        setAlbum({
          ...albumParam
        });
      }
    }
  }, [params]);
  console.log(album);

  return [artist, setParams];
};

export default useCurrentArtistUpdate;
