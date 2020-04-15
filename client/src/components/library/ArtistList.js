import React, { Fragment, useContext, useEffect } from 'react';
import LibraryContext from '../../context/library/libraryContext';
import ArtistItem from './ArtistItem';
import LoadingSpinner from '../layout/LoadingSpinner';
import Accordion from '../layout/Accordion';
import useModal from '../../utils/useModal';
import SearchModal from '../layout/SearchModal';
import Modal from '../layout/Modal';

const ArtistList = () => {
  const libraryContext = useContext(LibraryContext);
  const { artists, loading } = libraryContext;
  const { isShowing, toggle, setIsShowing } = useModal();

  useEffect(() => {
    setIsShowing(false);
  }, [artists]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className='wrapper'>
      {artists && (
        <Fragment>
          <Modal isShowing={isShowing} hide={toggle}>
            <SearchModal />
          </Modal>
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
      )}
    </div>
  );
};

export default ArtistList;
