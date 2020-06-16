import { LOAD_SETTINGS, UPDATE_SETTINGS } from '../types';

export default (state, action) => {
  switch (action.type) {
    case LOAD_SETTINGS:
      return {
        trackThresholdsContext: [...action.payload.trackThresholds],
        albumThresholdsContext: [...action.payload.albumThresholds],
        artistThresholdsContext: [...action.payload.artistThresholds],
        doNotTrack: action.payload.doNotTrack,
        areLoaded: true
      };

    case UPDATE_SETTINGS:
      return {
        ...state,
        trackThresholdsContext: [...action.payload.trackThresholds],
        albumThresholdsContext: [...action.payload.albumThresholds],
        artistThresholdsContext: [...action.payload.artistThresholds],
        doNotTrack: action.payload.doNotTrack
      };

    default:
      return state;
  }
};
