import React, { Fragment, useContext, useEffect } from 'react';
import LibraryContext from '../../context/library/libraryContext';
import AlertContext from '../../context/alert/alertContext';
import useAPIRequest from '../../utils/useAPIRequest';
import ArtistList from './ArtistList';
import AlbumList from './AlbumList';
import History from './History';

export const Library = () => {
  const {
    artists,
    loading,
    loadLibrary,
    error,
    clearErrors,
    currentArtist,
    currentAlbum
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
  return (
    <Fragment>
      {currentArtist ? <AlbumList /> : <ArtistList />}
      {currentAlbum ? (
        <div className='history'>
          {currentAlbum.tracks.map(currentAlbumE => (
            <p key={currentAlbumE._id}>{currentAlbumE.name}</p>
          ))}
        </div>
      ) : (
        <History />
      )}
    </Fragment>
  );
};

export default Library;
