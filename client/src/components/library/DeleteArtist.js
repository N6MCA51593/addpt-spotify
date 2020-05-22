import React, { useState } from 'react';
import PropTypes from 'prop-types';

const DeleteArtist = ({ id, name, deleteArtist, hide, setConfirmed }) => {
  const [artistName] = useState(name);

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
      <h3>{`Are you sure you want to delete ${artistName}? All associated data will de removed.`}</h3>
      <div>
        <button onClick={decline}> Cancel</button>
        <button onClick={() => del(id)}> Delete </button>
      </div>
    </div>
  );
};

DeleteArtist.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  deleteArtist: PropTypes.func.isRequired,
  hide: PropTypes.func,
  setConfirmed: PropTypes.func.isRequired
};

export default DeleteArtist;
