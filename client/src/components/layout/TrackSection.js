import React, { Fragment, useEffect } from 'react';
import History from '../library/History';
import TrackItem from '../library/TrackItem';
import useAPIRequest from '../../utils/useAPIRequest';
import PropTypes from 'prop-types';

const TrackSection = ({ currentAlbum, toggleTracking, updArtists }) => {
  const [{ data, isLoading }, setConfig] = useAPIRequest(
    {
      url: '/api/history',
      method: 'get'
    },
    []
  );

  useEffect(() => {
    if (updArtists) {
      setConfig({
        url: '/api/history',
        method: 'get'
      });
    }
  }, [updArtists, setConfig]);

  return (
    <div className='tracks'>
      {currentAlbum ? (
        <div className='header-container'>
          <div
            className='header-bg'
            style={{
              backgroundImage: `url(${
                currentAlbum.img[1] && currentAlbum.img[1].url
              })`
            }}
          ></div>
          <h2 className='album-name'>{currentAlbum.name}</h2>
        </div>
      ) : (
        <h2>Your recently played tracked songs</h2>
      )}

      {currentAlbum ? (
        currentAlbum.tracks.map(currentAlbumE => (
          <Fragment key={currentAlbumE.spID}>
            <TrackItem
              track={currentAlbumE}
              toggleTracking={toggleTracking}
              albumID={currentAlbum._id}
            />
          </Fragment>
        ))
      ) : (
        <History data={data} isLoading={isLoading} />
      )}
    </div>
  );
};

TrackSection.propTypes = {
  currentAlbum: PropTypes.object,
  toggleTracking: PropTypes.func,
  updArtists: PropTypes.array
};

export default TrackSection;
