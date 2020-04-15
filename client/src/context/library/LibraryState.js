import React, { useReducer } from 'react';
import {
  GET_LIBRARY,
  CLEAR_ERRORS,
  LOAD_FAIL,
  ADD_ARTIST,
  SET_CURRENT_ARTIST,
  SET_CURRENT_ALBUM,
  CLEAR_CURRENT
} from '../types';
import LibraryContext from './libraryContext';
import libraryReducer from './libraryReducer';

const LibraryState = props => {
  const initialState = {
    artists: null,
    loading: true,
    error: null,
    currentArtist: null,
    currentAlbum: null
  };

  const [state, dispatch] = useReducer(libraryReducer, initialState);

  // Load Library
  const loadLibrary = ({ isError, data }) => {
    if (!isError) {
      dispatch({
        type: GET_LIBRARY,
        payload: data
      });
    } else {
      dispatch({ type: LOAD_FAIL, payload: state });
    }
  };

  const addArtist = artist => {
    dispatch({ type: ADD_ARTIST, payload: artist });
  };

  const setCurrentArtist = artist => {
    dispatch({ type: SET_CURRENT_ARTIST, payload: artist });
  };

  const setCurrentAlbum = album => {
    dispatch({ type: SET_CURRENT_ALBUM, payload: album });
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
  return (
    <LibraryContext.Provider
      value={{
        artists: state.artists,
        loading: state.loading,
        error: state.error,
        currentArtist: state.currentArtist,
        currentAlbum: state.currentAlbum,
        loadLibrary,
        clearErrors,
        addArtist,
        setCurrentArtist,
        setCurrentAlbum,
        clearCurrent
      }}
    >
      {props.children}
    </LibraryContext.Provider>
  );
};

export default LibraryState;
