import React, { useReducer } from 'react';
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
  const loadLibrary = ({ isError, data }) => {
    console.log(data);
    if (!isError) {
      dispatch({
        type: GET_LIBRARY,
        payload: data
      });
    } else {
      dispatch({ type: LOAD_FAIL, payload: state });
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
