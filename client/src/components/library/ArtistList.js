import React, { useContext, useEffect, Fragment } from 'react';
import LibraryContext from '../../context/library/libraryContext';
import ArtistItem from './ArtistItem';
import DeleteArtist from './DeleteArtist';
import Accordion from '../layout/Accordion';
import useModal from '../../utils/useModal';
import SearchModal from '../layout/SearchModal';
import Modal from '../layout/Modal';
import Stats from '../layout/Stats';
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
  }, [data, isError, toggleArtist]);

  const delArtist = (id, name, e) => {
    e.stopPropagation();
    toggle();
    setType('delete');
    setID(id);
    setName(name);
  };

  const artistStat = artists
    .filter(artistE => artistE.isTracked && !artistE.isArchived)
    .map(artistE => artistE.albums);
  const albumStat =
    artistStat.length > 0 &&
    artistStat
      .flat()
      .filter(albumE => albumE.isTracked)
      .map(albumE => albumE.tracks);
  const trackStat =
    albumStat.length > 0 && albumStat.flat().filter(trackE => trackE.isTracked);

  return (
    <Fragment>
      <Stats
        type='Collection'
        progress={assessArr(artists)}
        artists={artistStat.length}
        albums={albumStat.length}
        tracks={trackStat.length}
      />
      <div className='accordion-wrapper'>
        <Modal
          isShowing={isShowing}
          hide={toggle}
          type={type === 'delete' ? type : 'add'}
        >
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
        <Accordion
          openByDef={true}
          title={'Tracked'}
          toggle={toggle}
          setType={setType}
        >
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
    </Fragment>
  );
};

export default ArtistList;
