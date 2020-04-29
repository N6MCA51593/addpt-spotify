import React, { Fragment, useContext, useEffect, useState } from 'react';
import LibraryContext from '../../context/library/libraryContext';
import AlertContext from '../../context/alert/alertContext';
import useAPIRequest from '../../utils/useAPIRequest';
import useCurrentArtistUpdate from '../../utils/useCurrentArtistUpdate';
import ArtistList from './ArtistList';
import AlbumList from './AlbumList';
import TrackSection from '../layout/TrackSection';
import LoadingSpinner from '../layout/LoadingSpinner';
import useSSE from '../../utils/useSSE';

export const Library = () => {
  const {
    loadLibrary,
    error,
    message,
    clearErrors,
    currentArtist,
    currentAlbum,
    setCurrentArtist,
    setCurrentAlbum,
    toggleArtist,
    loading
  } = useContext(LibraryContext);
  const { setAlert } = useContext(AlertContext);
  useSSE();
  const [childUnmounted, setChildUnmounted] = useState(null);

  const [{ isError, data }, setConfig] = useAPIRequest({
    url: '/api/library',
    method: 'get'
  });

  const [artist, album, setParams] = useCurrentArtistUpdate();

  const toggleTracking = (albumID, trackID, listens) => {
    setParams({
      artistInit: currentArtist,
      albumID: albumID,
      ...(trackID ? { trackID: trackID } : {}),
      ...(listens !== undefined ? { listens: listens } : {})
    });
    setConfig({
      url: '/api/library',
      method: 'put',
      params: {
        artistid: currentArtist._id,
        albumid: albumID,
        ...(trackID ? { trackid: trackID } : {}),
        ...(listens !== undefined ? { listens: listens } : {})
      }
    });
  };

  useEffect(() => {
    if (artist) {
      setCurrentArtist(artist);
    }
  }, [artist]);

  useEffect(() => {
    setCurrentAlbum(album);
  }, [album]);

  useEffect(() => {
    if (!childUnmounted && data && Array.isArray(data)) {
      loadLibrary(isError, data);
    } else if (data && data._id === childUnmounted) {
      setChildUnmounted(null);
      toggleArtist(data);
    }
    // eslint-disable-next-line
  }, [data, childUnmounted]);

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

  if (loading) {
    return <LoadingSpinner />;
  }

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
