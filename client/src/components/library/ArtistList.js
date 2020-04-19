import React, { Fragment, useContext, useEffect } from 'react';
import LibraryContext from '../../context/library/libraryContext';
import ArtistItem from './ArtistItem';
import LoadingSpinner from '../layout/LoadingSpinner';
import Accordion from '../layout/Accordion';
import useModal from '../../utils/useModal';
import SearchModal from '../layout/SearchModal';
import Modal from '../layout/Modal';
import useAPIRequest from '../../utils/useAPIRequest';

const ArtistList = () => {
  const { artists, loading, toggleArtist } = useContext(LibraryContext);
  const { isShowing, toggle, setIsShowing } = useModal();
  const [{ data, isError, isLoading }, setConfig] = useAPIRequest({});

  useEffect(() => {
    setIsShowing(false);
  }, [artists, setIsShowing]);

  useEffect(() => {
    if (data && !isError) {
      toggleArtist(data);
    }
  }, [data, isError]);

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
                return (
                  <ArtistItem
                    key={artistsE._id}
                    artist={artistsE}
                    toggleArtistSetConfig={setConfig}
                  />
                );
              })}
          </Accordion>
          {artists.some(
            artistE => !artistE.isTracked && !artistE.isArchived
          ) && (
            <Accordion openByDef={false} title={'Not Tracked'}>
              {artists
                .filter(artistsE => !artistsE.isTracked && !artistsE.isArchived)
                .map(artistsE => {
                  return (
                    <ArtistItem
                      key={artistsE._id}
                      artist={artistsE}
                      toggleArtistSetConfig={setConfig}
                    />
                  );
                })}
            </Accordion>
          )}
          {artists.some(artistE => artistE.isArchived) && (
            <Accordion openByDef={false} title={'Archived'}>
              {artists
                .filter(artistsE => artistsE.isArchived)
                .map(artistsE => {
                  return (
                    <ArtistItem
                      key={artistsE._id}
                      artist={artistsE}
                      toggleArtistSetConfig={setConfig}
                    />
                  );
                })}
            </Accordion>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default ArtistList;
