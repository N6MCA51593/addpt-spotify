import React, { Fragment, useContext } from 'react';
import LibraryContext from '../../context/library/libraryContext';
import ArtistItem from './ArtistItem';
import LoadingSpinner from '../layout/LoadingSpinner';
import Accordion from '../layout/Accordion';
import useModal from '../../utils/useModal';
import Search from './Search';

const ArtistList = () => {
  const libraryContext = useContext(LibraryContext);
  const { artists, loading } = libraryContext;
  const { isShowing, toggle } = useModal();

  // if (artists && artists.length === 0 && !loading) {
  //   return <h4>No artists found</h4>;
  // }

  return (
    <div className='wrapper'>
      {artists && !loading ? (
        <Fragment>
          <Search isShowing={isShowing} hide={toggle} />
          <Accordion openByDef={true} title={'Tracked'} toggle={toggle}>
            {artists
              .filter(artistsE => !artistsE.isArchived && artistsE.isTracked)
              .map(artistsE => {
                return <ArtistItem key={artistsE._id} artist={artistsE} />;
              })}
          </Accordion>
          {artists.some(artistE => !artistE.isTracked) && (
            <Accordion openByDef={false} title={'Not Tracked'}>
              {artists
                .filter(artistsE => !artistsE.isTracked)
                .map(artistsE => {
                  return <ArtistItem key={artistsE._id} artist={artistsE} />;
                })}
            </Accordion>
          )}
          {artists.some(artistE => artistE.isArchived) && (
            <Accordion openByDef={false} title={'Archived'}>
              {artists
                .filter(artistsE => artistsE.isArchived)
                .map(artistsE => {
                  return <ArtistItem key={artistsE._id} artist={artistsE} />;
                })}
            </Accordion>
          )}
        </Fragment>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default ArtistList;
