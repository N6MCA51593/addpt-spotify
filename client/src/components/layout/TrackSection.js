import React from 'react';
import History from '../library/History';
import TrackItem from '../library/TrackItem';

const TrackSection = ({ currentAlbum }) => {
  return (
    <div className='history'>
      {currentAlbum ? (
        currentAlbum.tracks.map(currentAlbumE => (
          <div key={currentAlbumE._id}>
            <TrackItem track={currentAlbumE} />
          </div>
        ))
      ) : (
        <History />
      )}
    </div>
  );
};

export default TrackSection;
