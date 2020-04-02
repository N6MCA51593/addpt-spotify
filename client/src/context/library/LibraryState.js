import React, { useReducer } from 'react';
import axios from 'axios';
import { GET_LIBRARY, CLEAR_ERRORS, LOAD_FAIL } from '../types';
import LibraryContext from './libraryContext';
import libraryReducer from './libraryReducer';

const LibraryState = props => {
  const initialState = {
    artists: null,
    loading: true,
    error: null
  };

  const [state, dispatch] = useReducer(libraryReducer, initialState);

  // Load Library
  const loadLibrary = async () => {
    try {
      const res = await axios.get('/api/library');
      dispatch({
        type: GET_LIBRARY,
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: LOAD_FAIL, payload: err.response.msg });
    }
  };

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
  return (
    <LibraryContext.Provider
      value={{
        artists: state.artists,
        loading: state.loading,
        error: state.error,
        loadLibrary,
        clearErrors
      }}
    >
      {props.children}
    </LibraryContext.Provider>
  );
};

export default LibraryState;
