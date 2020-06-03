import React, { useContext, useEffect, useState, Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import placeholder from '../../assets/placeholder.png';
import LibraryContext from '../../context/library/libraryContext';
import useAPIRequest from '../../utils/useAPIRequest';
import LoadingSpinner from '../layout/LoadingSpinner';
import useSettings from '../../utils/useSettings';
import Controls from '../layout/Controls';
import Button from '../layout/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AlbumItem = ({ album, artistID, toggleTracking }) => {
  const { addAlbum, setCurrentAlbum } = useContext(LibraryContext);
  const { assessArr, assessPresentational } = useSettings();
  const [{ data, isError, isLoading }, setConfig] = useAPIRequest({});
  const [areControlsShowing, setAreControlsShowing] = useState(false);
  const [areControlsToggled, setAreControlsToggled] = useState(false);

  useEffect(() => {
    if (data && !isError) {
      addAlbum(data);
    }
  }, [data, isError, addAlbum]);

  const add = (artistid, albumid) => {
    setConfig({
      url: '/api/library/append/new',
      method: 'post',
      params: { albumid, artistid }
    });
  };

  const progress = album._id && assessArr(album.tracks);
  const { status, classMod } = assessPresentational(progress, 'album');

  return (
    <div
      className={`card card-${album.isTracked ? classMod : '5'} ${
        !album._id && ' card-search-item'
      }${areControlsToggled ? ' nohover' : ''} `}
      onClick={() => album._id && setCurrentAlbum(album)}
    >
      <div
        className={`img-container${isLoading ? ' img-container-loading' : ''}`}
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Fragment>
            <Controls
              isShowing={areControlsShowing}
              setIsShowing={setAreControlsShowing}
              setIsToggled={setAreControlsToggled}
            >
              {!album._id ? (
                <Button
                  onClick={() => add(artistID, album.spID)}
                  type='add'
                  icon='plus'
                />
              ) : (
                <Button
                  type={album.isTracked ? 'track-on' : 'track-off'}
                  icon={album.isTracked ? 'eye' : 'eye-slash'}
                  onClick={e => {
                    e.stopPropagation();
                    areControlsShowing && setAreControlsShowing(false);
                    toggleTracking(album._id);
                  }}
                />
              )}
            </Controls>
            <img
              src={album.img[1] ? album.img[1].url : placeholder}
              alt={album.name}
            />
          </Fragment>
        )}
      </div>
      <div className='text'>
        <p>{album.name}</p>
        {album._id && (
          <Fragment>
            <p>
              {<FontAwesomeIcon icon='ruler-vertical' />}{' '}
              <span className='color'>
                {isNaN(progress) ? '--' : progress.toFixed(2) + '%'}
              </span>
            </p>
            <p>
              Status: <span className='status color'>{status}</span>
            </p>
          </Fragment>
        )}
      </div>
    </div>
  );
};

AlbumItem.propTypes = {
  album: PropTypes.object.isRequired,
  artistID: PropTypes.string,
  toggleTracking: PropTypes.func
};

export default memo(AlbumItem);
