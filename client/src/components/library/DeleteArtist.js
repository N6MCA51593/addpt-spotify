import React from 'react';
import PropTypes from 'prop-types';

const DeleteArtist = ({
  id,
  name,
  deleteArtist,
  hide,
  setConfirmed,
  setType
}) => {
  const del = id => {
    deleteArtist(id);
    setConfirmed(true);
    setType(null);
    hide();
  };

  const decline = () => {
    setType(null);
    hide();
  };

  return (
    <div>
      <p>{`Are you sure you want to delete ${name}? This action cannot be reversed.`}</p>
      <input type='button' value='Yes' onClick={() => del(id)} />
      <input type='button' value='No' onClick={decline} />
    </div>
  );
};

DeleteArtist.propTypes = {
  id: PropTypes.string.isRequired,
  deleteArtist: PropTypes.func.isRequired
};

export default DeleteArtist;
