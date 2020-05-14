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
import SSEUpdate from './SSEUpdate';
import useSettings from '../../utils/useSettings';

export const Library = () => {
  const { setAlert } = useContext(AlertContext);
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

  const { msg, updArtists, reset } = useSSE();
  useSettings();
  const [childUnmounted, setChildUnmounted] = useState(null);
  const [artist, album, setParams] = useCurrentArtistUpdate();

  const [{ isError, data }, setConfig] = useAPIRequest({
    url: '/api/library',
    method: 'get'
  });

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
    } else if (album) {
      setCurrentAlbum(album);
    }
  }, [artist, album]);

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

    if (msg) {
      setAlert(msg, 'success');
      reset();
    }

    if (updArtists) {
      setAlert('Artists updated', 'success');
      reset();
    }
    // eslint-disable-next-line
  }, [error, message, msg, reset, updArtists]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Fragment>
      <div className='main-content'>
        <SSEUpdate updArtists={updArtists} />
        {currentArtist ? (
          <AlbumList
            toggleTracking={toggleTracking}
            setChildUnmounted={setChildUnmounted}
          />
        ) : (
          <ArtistList />
        )}
      </div>
      <TrackSection
        currentAlbum={currentAlbum}
        toggleTracking={toggleTracking}
        updArtists={updArtists}
      />
    </Fragment>
  );
};

export default Library;
