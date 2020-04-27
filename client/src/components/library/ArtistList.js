import React, { useContext, useEffect } from 'react';
import LibraryContext from '../../context/library/libraryContext';
import ArtistItem from './ArtistItem';
import DeleteArtist from './DeleteArtist';
import Accordion from '../layout/Accordion';
import useModal from '../../utils/useModal';
import SearchModal from '../layout/SearchModal';
import Modal from '../layout/Modal';
import useAPIRequest from '../../utils/useAPIRequest';
import useDeleteArtist from '../../utils/useDeleteArtist';
import useSettings from '../../utils/useSettings';
import useSorting from '../../utils/useSorting';

const ArtistList = () => {
  const { artists, toggleArtist, deleteArtist } = useContext(LibraryContext);
  const { isShowing, type, toggle, setIsShowing, setType } = useModal();
  const [{ data, isError }, setConfig] = useAPIRequest({});
  const { id, name, setName, setID, setConfirmed } = useDeleteArtist();
  const { assessArr } = useSettings();
  const { sortArr } = useSorting();

  useEffect(() => {
    setIsShowing(false);
  }, [artists, setIsShowing]);

  useEffect(() => {
    if (data && !isError) {
      toggleArtist(data);
    }
  }, [data, isError]);

  const delArtist = (id, name) => {
    toggle();
    setType('delete');
    setID(id);
    setName(name);
  };

  return (
    <div className='wrapper'>
      <p>Collection progress: {assessArr(artists)}</p>
      <Modal isShowing={isShowing} hide={toggle}>
        {type === 'delete' ? (
          <DeleteArtist
            id={id}
            name={name}
            deleteArtist={deleteArtist}
            hide={toggle}
            setConfirmed={setConfirmed}
            setType={setType}
          />
        ) : (
          <SearchModal />
        )}
      </Modal>
      <Accordion openByDef={true} title={'Tracked'} toggle={toggle}>
        {sortArr(artists)
          .filter(artistsE => !artistsE.isArchived && artistsE.isTracked)
          .map(artistsE => {
            return (
              <ArtistItem
                key={artistsE._id}
                artist={artistsE}
                toggleArtistSetConfig={setConfig}
                delArtist={delArtist}
              />
            );
          })}
      </Accordion>
      {artists.some(artistE => !artistE.isTracked && !artistE.isArchived) && (
        <Accordion openByDef={false} title={'Not Tracked'}>
          {sortArr(artists)
            .filter(artistsE => !artistsE.isTracked && !artistsE.isArchived)
            .map(artistsE => {
              return (
                <ArtistItem
                  key={artistsE._id}
                  artist={artistsE}
                  toggleArtistSetConfig={setConfig}
                  delArtist={delArtist}
                />
              );
            })}
        </Accordion>
      )}
      {artists.some(artistE => artistE.isArchived) && (
        <Accordion openByDef={false} title={'Archived'}>
          {sortArr(artists)
            .filter(artistsE => artistsE.isArchived)
            .map(artistsE => {
              return (
                <ArtistItem
                  key={artistsE._id}
                  artist={artistsE}
                  toggleArtistSetConfig={setConfig}
                  delArtist={delArtist}
                />
              );
            })}
        </Accordion>
      )}
    </div>
  );
};

export default ArtistList;
