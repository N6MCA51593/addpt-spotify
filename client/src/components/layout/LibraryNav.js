import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';

const LibraryNav = ({
  areTracksShowing,
  setAreTracksShowing,
  currentAlbum
}) => {
  const [albumID, setAlbumID] = useState(null);

  useEffect(() => {
    if (currentAlbum) {
      if (!albumID) {
        setAreTracksShowing(true);
      }
      setAlbumID(currentAlbum._id);
    } else {
      setAlbumID(null);
      setAreTracksShowing(false);
    }
  }, [
    currentAlbum,
    setAlbumID,
    areTracksShowing,
    setAreTracksShowing,
    albumID
  ]);

  return (
    <div className='library-nav'>
      <button onClick={() => setAreTracksShowing(false)}>
        Artists / Albums
      </button>
      <button onClick={() => setAreTracksShowing(true)}>
        Tracks / History
      </button>
    </div>
  );
};

LibraryNav.propTypes = {
  areTracksShowing: PropTypes.bool.isRequired,
  setAreTracksShowing: PropTypes.func.isRequired,
  currentAlbum: PropTypes.any
};

export default memo(LibraryNav);
