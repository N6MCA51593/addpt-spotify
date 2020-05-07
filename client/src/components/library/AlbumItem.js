import React, { useContext, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import placeholder from '../layout/placeholder.png';
import LibraryContext from '../../context/library/libraryContext';
import useAPIRequest from '../../utils/useAPIRequest';
import LoadingSpinner from '../layout/LoadingSpinner';
import useSettings from '../../utils/useSettings';

const AlbumItem = ({ album, artistID, toggleTracking }) => {
  const { addAlbum, setCurrentAlbum } = useContext(LibraryContext);
  const { assessArr, assessPresentational } = useSettings();
  const [{ data, isError, isLoading }, setConfig] = useAPIRequest({});

  useEffect(() => {
    if (data && !isError) {
      addAlbum(data);
    }
    // eslint-disable-next-line
  }, [data, isError]);

  const add = e => {
    e.preventDefault();
    setConfig({
      url: '/api/library/append/new',
      method: 'post',
      params: {
        artistid: e.target.dataset.artist,
        albumid: e.target.dataset.album
      }
    });
  };

  const progress = album._id && assessArr(album.tracks);
  const { status, classMod } = assessPresentational(progress, 'album');

  return (
    <div className='card'>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <img
          src={album.img[1] ? album.img[1].url : placeholder}
          alt={album.name}
        />
      )}
      <p>{album.name}</p>
      <p>{album._id && album.isTracked.toString()}</p>
      {!album._id ? (
        <button onClick={add} data-album={album.spID} data-artist={artistID}>
          Add
        </button>
      ) : (
        <Fragment>
          <p>Album progress: {progress}</p>
          <p>Album status: {status}</p>
          <input
            type='button'
            value='Set current'
            onClick={() => setCurrentAlbum(album)}
          />
          <input
            type='button'
            value='Toggle tracking'
            onClick={() => toggleTracking(album._id)}
          />
        </Fragment>
      )}
    </div>
  );
};

AlbumItem.propTypes = {
  album: PropTypes.object.isRequired
};

export default AlbumItem;
