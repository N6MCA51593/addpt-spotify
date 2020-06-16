import React, { useReducer } from 'react';
//import { LOAD_SETTINGS, UPDATE_SETTINGS } from '../types';
import SettingsContext from './settingsContext';
import settingsReducer from './settingsReducer';

const SettingsState = ({ children }) => {
  const initialState = {
    trackThresholdsContext: [3, 6, 8, 10],
    albumThresholdsContext: [30, 60, 80, 100],
    artistThresholdsContext: [30, 60, 80, 100],
    doNotTrack: false,
    areLoaded: false
  };

  const [state, dispatch] = useReducer(settingsReducer, initialState);
  return (
    <SettingsContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsState;
