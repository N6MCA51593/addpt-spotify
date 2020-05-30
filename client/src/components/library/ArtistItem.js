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

const ArtistItem = ({ artist, toggleArtistSetConfig, delArtist }) => {
  const { addArtist, setCurrentArtist } = useContext(LibraryContext);
  const { assessArr, assessPresentational } = useSettings(artist);
  const [{ data, isError, isLoading }, setConfig] = useAPIRequest({});
  const [areControlsShowing, setAreControlsShowing] = useState(false);
  const [areControlsToggled, setAreControlsToggled] = useState(false);

  useEffect(() => {
    if (data && !isError) {
      addArtist(data);
    }
  }, [data, isError, addArtist]);

  const add = id => {
    setConfig({
      url: '/api/library/add/new',
      method: 'post',
      params: { id }
    });
  };

  const toggleTracking = (artistid, e) => {
    e.stopPropagation();
    toggleArtistSetConfig({
      url: '/api/library',
      method: 'put',
      params: { artistid }
    });
  };

  const toggleArchived = (artistid, e) => {
    e.stopPropagation();
    toggleArtistSetConfig({
      url: '/api/library',
      method: 'put',
      params: { artistid, action: 'archive' }
    });
  };

  const progress = artist._id && assessArr(artist.albums);
  const { status, classMod } = assessPresentational(progress, 'artist');

  return (
    <div
      className={`card card-artist card-${artist.isTracked ? classMod : '5'} ${
        !artist._id ? ' card-search-item' : ''
      }${areControlsToggled ? ' nohover' : ''} `}
      onClick={() =>
        artist._id && !artist.isArchived && setCurrentArtist(artist)
      }
    >
      <div className='img-container'>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Fragment>
            <Controls
              isShowing={areControlsShowing}
              setIsShowing={setAreControlsShowing}
              setIsToggled={setAreControlsToggled}
            >
              {!artist._id ? (
                <Button
                  onClick={() => add(artist.spID)}
                  type='add'
                  icon='plus'
                />
              ) : (
                <Fragment>
                  <Button
                    onClick={e => toggleArchived(artist._id, e)}
                    type='arch'
                    icon={!artist.isArchived ? 'unlock' : 'lock'}
                  />
                  {!artist.isArchived && (
                    <Button
                      type={artist.isTracked ? 'track-on' : 'track-off'}
                      icon={artist.isTracked ? 'eye' : 'eye-slash'}
                      onClick={e => toggleTracking(artist._id, e)}
                    />
                  )}
                  <Button
                    type='delete'
                    icon='trash-alt'
                    onClick={e => delArtist(artist._id, artist.name, e)}
                  />
                </Fragment>
              )}
            </Controls>
            <div className='max-cont'>
              <img
                src={artist.img[1] ? artist.img[1].url : placeholder}
                alt={artist.name}
              />
            </div>
          </Fragment>
        )}
      </div>
      <div className='text'>
        <p>{artist.name}</p>
        {artist._id && (
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

ArtistItem.propTypes = {
  artist: PropTypes.object.isRequired,
  toggleArtistSetConfig: PropTypes.func,
  delArtist: PropTypes.func
};

export default memo(ArtistItem);
