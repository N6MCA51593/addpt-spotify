import React, { Fragment } from 'react';
import History from '../library/History';
import TrackItem from '../library/TrackItem';

const TrackSection = ({ currentAlbum, toggleTracking, updArtists }) => {
  return (
    <div className='track-section'>
      <div className='tracks'>
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
          <History updArtists={updArtists} />
        )}
      </div>
    </div>
  );
};

export default TrackSection;
