import React, { useState } from 'react';
import PropTypes from 'prop-types';

const DeleteArtist = ({ id, name, deleteArtist, hide, setConfirmed }) => {
  const [artistName, setArtistName] = useState(name);

  const del = id => {
    deleteArtist(id);
    setConfirmed(true);
    hide();
  };

  const decline = () => {
    hide();
  };

  return (
    <div className='modal-delete'>
      <h3>{`Are you sure you want to delete ${artistName}? This action cannot be reversed.`}</h3>
      <div>
        <button onClick={decline}> Cancel</button>
        <button onClick={() => del(id)}> Delete </button>
      </div>
    </div>
  );
};

DeleteArtist.propTypes = {
  id: PropTypes.string.isRequired,
  deleteArtist: PropTypes.func.isRequired
};

export default DeleteArtist;
