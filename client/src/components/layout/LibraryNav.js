import React, { useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';

const LibraryNav = ({
  areTracksShowing,
  setAreTracksShowing,
  currentAlbum
}) => {
  const prevAlbumPropRef = useRef();

  useEffect(() => {
    prevAlbumPropRef.current = currentAlbum;
  });

  const prevAlbum = prevAlbumPropRef.current;

  useEffect(() => {
    if (
      currentAlbum &&
      ((prevAlbum && !(currentAlbum._id === prevAlbum._id)) || !prevAlbum)
    ) {
      setAreTracksShowing(true);
    }
  }, [currentAlbum, setAreTracksShowing, prevAlbum]);

  return (
    <div className='library-nav'>
      <button
        className={!areTracksShowing ? 'active' : ''}
        onClick={() => setAreTracksShowing(false)}
      >
        Artists / Albums
      </button>
      <button
        className={areTracksShowing ? 'active' : ''}
        onClick={() => {
          window.scrollTo(0, 50);
          setAreTracksShowing(true);
        }}
      >
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
