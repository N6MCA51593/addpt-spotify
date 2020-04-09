import React, { Fragment, useContext, useEffect } from 'react';
import LibraryContext from '../../context/library/libraryContext';
import useAPIRequest from '../../utils/useAPIRequest';
import ArtistList from './ArtistList';

export const Library = () => {
  const libraryContext = useContext(LibraryContext);
  const { artists, loading, loadLibrary } = libraryContext;
  const [state, setConfig] = useAPIRequest({
    url: '/api/library',
    method: 'get'
  });
  useEffect(() => {
    if (state.data) {
      loadLibrary(state);
    }
    // eslint-disable-next-line
  }, [state]);

  return (
    <Fragment>
      <h1>
        <ArtistList />
      </h1>
    </Fragment>
  );
};

export default Library;
