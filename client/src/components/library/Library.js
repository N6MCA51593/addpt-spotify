import React, {
  Fragment,
  useContext,
  useEffect,
  useState,
  useCallback
} from 'react';
import LibraryContext from '../../context/library/libraryContext';
import AlertContext from '../../context/alert/alertContext';
import useAPIRequest from '../../utils/useAPIRequest';
import useCurrentArtistUpdate from '../../utils/useCurrentArtistUpdate';
import ArtistList from './ArtistList';
import AlbumList from './AlbumList';
import TrackSection from '../layout/TrackSection';
import LibraryNav from '../layout/LibraryNav';
import LoadingSpinner from '../layout/LoadingSpinner';
import BottomNav from '../layout/BottomNav';
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
    clearCurrent,
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
  const [areTracksShowing, setAreTracksShowing] = useState(false);
  const [artist, album, setParams] = useCurrentArtistUpdate();
  const [{ isError, data }, setConfig] = useAPIRequest({
    url: '/api/library',
    method: 'get'
  });

  const toggleTracking = useCallback(
    (albumID, trackID, listens) => {
      setParams({
        artistInit: currentArtist,
        albumID,
        ...(trackID ? { trackID } : {}),
        ...(listens !== undefined ? { listens } : {})
      });

      setConfig({
        url: '/api/library',
        method: 'put',
        params: {
          artistid: currentArtist._id,
          albumid: albumID,
          ...(trackID ? { trackid: trackID } : {}),
          ...(listens !== undefined ? { listens } : {})
        }
      });
    },
    [currentArtist, setConfig, setParams]
  );

  useEffect(() => {
    if (artist && currentArtist) {
      setCurrentArtist(artist);
    }

    if (album && currentAlbum && album._id === currentAlbum._id) {
      setCurrentAlbum(album);
    }
  }, [
    artist,
    album,
    setCurrentArtist,
    setCurrentAlbum,
    currentAlbum,
    currentArtist
  ]);

  useEffect(() => {
    if (!childUnmounted && data && Array.isArray(data)) {
      // Initial load
      loadLibrary(isError, data);
    } else if (data && data._id === childUnmounted) {
      setChildUnmounted(null);
      toggleArtist(data);
    }
  }, [
    data,
    childUnmounted,
    toggleArtist,
    isError,
    loadLibrary,
    setChildUnmounted
  ]);

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
      if (document.visibilityState === 'hidden') {
        const title = document.title;
        const flashUpdate = () => {
          document.title =
            document.title === title ? document.title + ' (!!!)' : title;
        };
        const interval = setInterval(flashUpdate, 500);
        setTimeout(() => {
          clearInterval(interval);
          document.title = title;
        }, 5000);
      }

      reset();
    }
  }, [error, message, msg, reset, updArtists, setAlert, clearErrors]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Fragment>
      <LibraryNav
        areTracksShowing={areTracksShowing}
        setAreTracksShowing={setAreTracksShowing}
        currentAlbum={currentAlbum}
      />
      <div className={`main-content${areTracksShowing ? ' hidden' : ''}`}>
        <BottomNav clearCurrent={currentArtist && clearCurrent} />
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
      <div className={`track-section${!areTracksShowing ? ' hidden' : ''}`}>
        <TrackSection
          currentAlbum={currentAlbum}
          toggleTracking={toggleTracking}
          updArtists={updArtists}
        />
      </div>
    </Fragment>
  );
};

export default Library;
