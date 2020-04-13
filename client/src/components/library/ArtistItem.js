import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import placeholder from '../layout/placeholder.png';
import LibraryContext from '../../context/library/libraryContext';
import useAPIRequest from '../../utils/useAPIRequest';
import LoadingSpinner from '../layout/LoadingSpinner';

const ArtistItem = ({ artist }) => {
  const { addArtist } = useContext(LibraryContext);

  const [{ data, isError, isLoading }, setConfig] = useAPIRequest({});

  useEffect(() => {
    if (data && !isError) {
      addArtist(data);
    }
    // eslint-disable-next-line
  }, [data, isError]);

  const add = e => {
    e.preventDefault();
    setConfig({
      url: '/api/library/add/new',
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
          src={artist.img[2] ? artist.img[2].url : placeholder}
          alt={artist.name}
        />
      )}
      <p>{artist.name}</p>
      {!artist._id && (
        <button onClick={add} value={artist.spID}>
          Add
        </button>
      )}
    </div>
  );
};

ArtistItem.propTypes = {
  artist: PropTypes.object.isRequired
};

export default ArtistItem;
