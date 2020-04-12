import React from 'react';
import PropTypes from 'prop-types';

const ArtistItem = ({ artist }) => {
  return (
    <div className='card'>
      <img src={artist.img[2] && artist.img[2].url} alt={artist.name} />
      <p>{artist.name}</p>
    </div>
  );
};

ArtistItem.propTypes = {
  artist: PropTypes.object.isRequired
};

export default ArtistItem;
