import React, { useContext, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import placeholder from '../layout/placeholder.png';
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

  useEffect(() => {
    if (data && !isError) {
      addAlbum(data);
    }
    // eslint-disable-next-line
  }, [data, isError]);

  const add = (artistid, albumid) => {
    console.log(artistid);
    console.log(albumid);
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
      className={`card card-${album.isTracked ? classMod : '5'}`}
      onClick={() => album._id && setCurrentAlbum(album)}
    >
      <div className='img-container'>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Fragment>
            <Controls>
              {!album._id ? (
                <Button
                  onClick={() => add(artistID, album.spID)}
                  type='add'
                  icon='plus'
                />
              ) : album.isTracked ? (
                <Button
                  type='track-on'
                  icon='eye'
                  onClick={() => toggleTracking(album._id)}
                />
              ) : (
                <Button
                  type='track-off'
                  icon='eye-slash'
                  onClick={() => toggleTracking(album._id)}
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
  album: PropTypes.object.isRequired
};

export default AlbumItem;
