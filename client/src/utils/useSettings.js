import { useEffect, useState, useContext } from 'react';
import useAPIRequest from './useAPIRequest';
import SettingsContext from '../context/settings/settingsContext';

const useSettings = (archivedArtist = null) => {
  const { state, dispatch } = useContext(SettingsContext);
  const {
    trackThresholdsContext,
    albumThresholdsContext,
    artistThresholdsContext,
    doNotTrack,
    areLoaded
  } = state;

  const [{ data }, setConfig] = useAPIRequest({});
  const artistState =
    archivedArtist && archivedArtist.isArchived
      ? archivedArtist.settingsSnapshot[2]
      : artistThresholdsContext;
  const albumState =
    archivedArtist && archivedArtist.isArchived
      ? archivedArtist.settingsSnapshot[1]
      : albumThresholdsContext;
  const trackState =
    archivedArtist && archivedArtist.isArchived
      ? archivedArtist.settingsSnapshot[0]
      : trackThresholdsContext;

  const [artistThresholds] = useState(artistState);
  const [albumThresholds] = useState(albumState);
  const [trackThresholds] = useState(trackState);

  useEffect(() => {
    if (!areLoaded) {
      setConfig({
        url: 'api/settings',
        method: 'get'
      });
      if (data) {
        dispatch({ type: 'LOAD_SETTINGS', payload: data });
      }
    }
  }, [setConfig, data, areLoaded, dispatch]);

  const assessTrack = track => {
    if (areLoaded) {
      const res = track.listens * (100 / trackThresholds[3]);
      return res > 100 ? 100 : Math.round(res);
    }
  };

  const assessArr = arr => {
    if (areLoaded) {
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
    }
  };

  const assessPresentational = (progress, type) => {
    if (progress === undefined) {
      return { classMod: 0, status: '--' };
    }

    const progressSteps = [
      { classMod: 0, status: 'New' },
      { classMod: 1, status: 'Unfamiliar' },
      { classMod: 2, status: 'Accustomed' },
      { classMod: 3, status: 'Mastered' },
      { classMod: 4, status: 'Fully discovered' },
      { classMod: 5, status: 'Not tracked' }
    ];

    if (isNaN(progress)) {
      return progressSteps[5];
    }

    const settingsArr = type => {
      if (type === 'artist') {
        return artistThresholds;
      }
      if (type === 'album') {
        return albumThresholds;
      }
      if (type === 'track') {
        return trackThresholds;
      }
    };

    if (progress < settingsArr(type)[0]) {
      return progressSteps[0];
    } else if (progress < settingsArr(type)[1]) {
      return progressSteps[1];
    } else if (progress < settingsArr(type)[2]) {
      return progressSteps[2];
    } else if (progress < settingsArr(type)[3]) {
      return progressSteps[3];
    } else {
      return progressSteps[4];
    }
  };

  return {
    assessTrack,
    assessArr,
    assessPresentational,
    albumThresholds,
    trackThresholds,
    artistThresholds,
    doNotTrack
  };
};

useSettings.propTypes = {};

export default useSettings;
