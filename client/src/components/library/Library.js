import React, { Fragment, useContext, useEffect, useState } from 'react';
import LibraryContext from '../../context/library/libraryContext';
import AlertContext from '../../context/alert/alertContext';
import useAPIRequest from '../../utils/useAPIRequest';
import useCurrentArtistUpdate from '../../utils/useCurrentArtistUpdate';
import ArtistList from './ArtistList';
import AlbumList from './AlbumList';
import TrackSection from '../layout/TrackSection';

export const Library = () => {
  const {
    loadLibrary,
    error,
    message,
    clearErrors,
    currentArtist,
    currentAlbum,
    setCurrentArtist,
    toggleArtist
  } = useContext(LibraryContext);
  const { setAlert } = useContext(AlertContext);

  const [childUnmounted, setChildUnmounted] = useState(false);

  const [state, setConfig] = useAPIRequest({
    url: '/api/library',
    method: 'get'
  });

  const [artist, setParams] = useCurrentArtistUpdate();

  const toggleTracking = (albumID, trackID, listens) => {
    setParams({
      artistInit: currentArtist,
      albumID: albumID,
      ...(trackID ? { trackID: trackID } : {}),
      ...(listens ? { listens: listens } : {})
    });
    setConfig({
      url: '/api/library',
      method: 'put',
      params: {
        artistid: currentArtist._id,
        albumid: albumID,
        ...(trackID ? { trackid: trackID } : {}),
        ...(listens ? { listens: listens } : {})
      }
    });
  };

  useEffect(() => {
    if (artist) {
      setCurrentArtist(artist);
    }
  }, [artist]);

  useEffect(() => {
    if (!childUnmounted && state.data && Array.isArray(state.data)) {
      loadLibrary(state);
    } else if (childUnmounted && state.data && !Array.isArray(state.data)) {
      setChildUnmounted(false);
      toggleArtist(state.data);
    }
    // eslint-disable-next-line
  }, [state, childUnmounted]);

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
      {currentArtist ? (
        <AlbumList
          toggleTracking={toggleTracking}
          setChildUnmounted={setChildUnmounted}
        />
      ) : (
        <ArtistList />
      )}
      <TrackSection
        currentAlbum={currentAlbum}
        toggleTracking={toggleTracking}
      />
    </Fragment>
  );
};

export default Library;
