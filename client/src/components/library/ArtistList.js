import React, { Fragment, useContext, useEffect } from 'react';
import LibraryContext from '../../context/library/libraryContext';
import ArtistItem from './ArtistItem';
import LoadingSpinner from '../layout/LoadingSpinner';

const ArtistList = () => {
  const libraryContext = useContext(LibraryContext);
  const { artists, loading } = libraryContext;

  if (artists && artists.length === 0 && !loading) {
    return <h4>No artists found</h4>;
  }
  console.log(artists);
  console.log(loading);
  return (
    <div className='artist-container'>
      {artists && !loading ? (
        artists.map(artistsE => {
          return <ArtistItem key={artistsE._id} artist={artistsE} />;
        })
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default ArtistList;
