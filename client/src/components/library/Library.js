import React, { Fragment, useContext, useEffect, useState } from 'react';
import LibraryContext from '../../context/library/libraryContext';
import useAPIRequest from '../../utils/useAPIRequest';

export const Library = () => {
  const libraryContext = useContext(LibraryContext);
  const { artists, isLoading, loadLibrary } = libraryContext;
  const [state, setConfig] = useAPIRequest({
    url: '/api/library',
    method: 'get'
  });
  useEffect(() => {
    loadLibrary(state);
  }, [state]);

  return (
    <Fragment>
      <h1>{state.isLoading ? 'Loading...' : 'Library'}</h1>
    </Fragment>
  );
};

export default Library;
