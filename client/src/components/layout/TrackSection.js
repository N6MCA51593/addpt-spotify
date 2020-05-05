import React from 'react';
import History from '../library/History';
import TrackItem from '../library/TrackItem';

const TrackSection = ({ currentAlbum, toggleTracking, updArtists }) => {
  return (
    <div className='track-section'>
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
        <History updArtists={updArtists} />
      )}
    </div>
  );
};

export default TrackSection;
