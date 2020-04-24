import { useEffect, useState } from 'react';
import useAPIRequest from './useAPIRequest';

const useSettings = (archivedArtist = null) => {
  const [{ data }, setConfig] = useAPIRequest({});
  const artistState =
    archivedArtist && archivedArtist.isArchived
      ? archivedArtist.settingsSnapshot[2]
      : JSON.parse(localStorage.getItem('artistThresholds'));
  const albumState =
    archivedArtist && archivedArtist.isArchived
      ? archivedArtist.settingsSnapshot[1]
      : JSON.parse(localStorage.getItem('albumThresholds'));
  const trackState =
    archivedArtist && archivedArtist.isArchived
      ? archivedArtist.settingsSnapshot[0]
      : JSON.parse(localStorage.getItem('trackThresholds'));

  const [artistThresholds, setArtistThresholds] = useState(artistState);

  const [albumThresholds, setAlbumThresholds] = useState(albumState);

  const [trackThresholds, setTrackThresholds] = useState(trackState);

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
    return res[0] / res[1];
  };

  return { assessTrack, assessArr };
};

useSettings.propTypes = {};

export default useSettings;
