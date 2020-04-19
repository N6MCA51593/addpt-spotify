import React, { Fragment, useContext, useEffect } from 'react';
import LibraryContext from '../../context/library/libraryContext';
import AlertContext from '../../context/alert/alertContext';
import useAPIRequest from '../../utils/useAPIRequest';
import useCurrentArtistUpdate from '../../utils/useCurrentArtistUpdate';
import ArtistList from './ArtistList';
import AlbumList from './AlbumList';
import TrackSection from '../layout/TrackSection';

export const Library = () => {
  const {
    artists,
    loading,
    loadLibrary,
    error,
    message,
    clearErrors,
    currentArtist,
    currentAlbum,
    setCurrentArtist
  } = useContext(LibraryContext);
  const { setAlert } = useContext(AlertContext);

  const [state, setConfig] = useAPIRequest({
    url: '/api/library',
    method: 'get'
  });

  const [artist, setParams] = useCurrentArtistUpdate();

  useEffect(() => {
    setCurrentArtist(artist);
  }, [artist]);

  useEffect(() => {
    if (state.data) {
      loadLibrary(state);
    }
    // eslint-disable-next-line
  }, [state]);

  useEffect(() => {
    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }
    if (message) {
      setAlert(message, 'success');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, message]);
  return (
    <Fragment>
      {currentArtist ? <AlbumList /> : <ArtistList />}
      <TrackSection currentAlbum={currentAlbum} />
    </Fragment>
  );
};

export default Library;
