import { useEffect, useState } from 'react';
import useAPIRequest from './useAPIRequest';

const useSettings = () => {
  const [{ data }, setConfig] = useAPIRequest({});
  const [artistThresholds, setArtistThresholds] = useState(
    JSON.parse(localStorage.getItem('artistThresholds'))
  );
  const [albumThresholds, setAlbumThresholds] = useState(
    JSON.parse(localStorage.getItem('albumThresholds'))
  );
  const [trackThresholds, setTrackThresholds] = useState(
    JSON.parse(localStorage.getItem('trackThresholds'))
  );

  useEffect(() => {
    if (!albumThresholds || !artistThresholds || !trackThresholds) {
      setConfig({
        url: 'api/settings',
        method: 'get'
      });
      if (data) {
        setArtistThresholds(data.artistThresholds);
        localStorage.setItem(
          'artistThresholds',
          JSON.stringify(data.artistThresholds)
        );
        setAlbumThresholds(data.albumThresholds);
        localStorage.setItem(
          'albumThresholds',
          JSON.stringify(data.albumThresholds)
        );
        setTrackThresholds(data.trackThresholds);
        localStorage.setItem(
          'trackThresholds',
          JSON.stringify(data.trackThresholds)
        );
      }
    }
  }, [
    albumThresholds,
    setAlbumThresholds,
    setArtistThresholds,
    setTrackThresholds,
    artistThresholds,
    trackThresholds,
    data
  ]);

  const assessTrack = track => {
    const res = track.listens * (100 / trackThresholds[3]);
    return res > 100 ? 100 : Math.round(res);
  };

  const assessArr = arr => {
    const reducer = (accum, ent) => {
      if (ent.isTracked && ent.discNumber) {
        accum[0] += assessTrack(ent);
        accum[1] += 1;
      } else if (ent.isTracked && !ent.discNumber && !ent.isArchived) {
        const next = ent.albums ? ent.albums : ent.tracks;
        accum[0] += assessArr(next);
        accum[1] += 1;
      }
      return accum;
    };
    const res = arr.reduce(reducer, [0, 0]);
    console.log(res);
    return res[0] / res[1];
  };

  const assessAlbum = album => {
    const reducer = (accum, track) => {
      if (track.isTracked) {
        accum[0] += assessTrack(track);
        accum[1] += 1;
      }
      return accum;
    };
    const res = album.tracks.reduce(reducer, [0, 0]);
    return Math.round(res[0] / res[1]);
  };

  const assessArtist = artist => {
    const reducer = (accum, album) => {
      if (album.isTracked) {
        accum[0] += assessAlbum(album);
        accum[1] += 1;
      }
      return accum;
    };
    const res = artist.albums.reduce(reducer, [0, 0]);
    return Math.round(res[0] / res[1]);
  };

  return { assessTrack, assessAlbum, assessArtist, assessArr };
};

useSettings.propTypes = {};

export default useSettings;
