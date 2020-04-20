import React, { useContext, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import placeholder from '../layout/placeholder.png';
import LibraryContext from '../../context/library/libraryContext';
import useAPIRequest from '../../utils/useAPIRequest';
import LoadingSpinner from '../layout/LoadingSpinner';

const AlbumItem = ({ album, artistID, toggleTracking }) => {
  const { addAlbum, setCurrentAlbum } = useContext(LibraryContext);

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
