import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
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

  return { assessTrack, assessAlbum, assessArtist };
};

useSettings.propTypes = {};

export default useSettings;
