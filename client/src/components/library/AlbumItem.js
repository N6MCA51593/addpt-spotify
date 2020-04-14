import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import placeholder from '../layout/placeholder.png';
import LibraryContext from '../../context/library/libraryContext';
import useAPIRequest from '../../utils/useAPIRequest';
import LoadingSpinner from '../layout/LoadingSpinner';

const AlbumItem = ({ album }) => {
  const { addAlbum } = useContext(LibraryContext);

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
      params: { id: e.target.value }
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
      {!album._id && (
        <button onClick={add} value={album.spID}>
          Add
        </button>
      )}
    </div>
  );
};

AlbumItem.propTypes = {
  album: PropTypes.object.isRequired
};

export default AlbumItem;
