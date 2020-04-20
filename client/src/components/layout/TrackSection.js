import React from 'react';
import History from '../library/History';
import TrackItem from '../library/TrackItem';

const TrackSection = ({ currentAlbum, toggleTracking }) => {
  return (
    <div className='history'>
      {currentAlbum ? (
        currentAlbum.tracks.map(currentAlbumE => (
          <div key={currentAlbumE.spID}>
            <TrackItem
              track={currentAlbumE}
              toggleTracking={toggleTracking}
              albumID={currentAlbum._id}
            />
          </div>
        ))
      ) : (
        <History />
      )}
    </div>
  );
};

export default TrackSection;
