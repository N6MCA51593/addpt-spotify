import React, { Fragment, useContext, useEffect } from 'react';
import LibraryContext from '../../context/library/libraryContext';
import AlertContext from '../../context/alert/alertContext';
import useAPIRequest from '../../utils/useAPIRequest';
import ArtistList from './ArtistList';
import AlbumList from './AlbumList';

export const Library = () => {
  const {
    artists,
    loading,
    loadLibrary,
    error,
    clearErrors,
    currentArtist
  } = useContext(LibraryContext);
  const { setAlert } = useContext(AlertContext);

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

  useEffect(() => {
    if (error) {
      setAlert(error, 'success');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error]);
  return <Fragment>{currentArtist ? <AlbumList /> : <ArtistList />}</Fragment>;
};

export default Library;
