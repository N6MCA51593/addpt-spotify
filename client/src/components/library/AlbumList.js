import React, { Fragment, useContext, useEffect } from 'react';
import LibraryContext from '../../context/library/libraryContext';
import AlbumItem from './AlbumItem';
import Accordion from '../layout/Accordion';
import useModal from '../../utils/useModal';
import SearchModal from '../layout/SearchModal';
import Modal from '../layout/Modal';
import useSettings from '../../utils/useSettings';
import useSorting from '../../utils/useSorting';
import Stats from '../layout/Stats';

const AlbumList = ({ toggleTracking, setChildUnmounted }) => {
  const libraryContext = useContext(LibraryContext);
  const { isShowing, toggle, setIsShowing } = useModal();
  const { assessArr, assessPresentational } = useSettings();
  const { sortArr } = useSorting();
  const { currentArtist, clearCurrent } = libraryContext;
  const albums = currentArtist.albums;

  useEffect(() => {
    setIsShowing(false);
  }, [albums, setIsShowing]);

  useEffect(() => {
    return () => {
      setChildUnmounted(currentArtist._id);
    };
  }, [setChildUnmounted]);

  const albumStat = albums.length;
  const trackStat =
    albumStat > 0 &&
    albums
      .map(albumE => albumE.tracks)
      .flat()
      .filter(trackE => trackE.isTracked).length;

  const progress = assessArr(albums);
  const { status, classMod } = assessPresentational(progress, 'artist');

  return (
    <Fragment>
      <Stats
        type={currentArtist.name}
        progress={progress}
        albums={albumStat}
        tracks={trackStat}
        status={status}
        classMod={classMod}
      />

      {/* <input type='button' value='Back' onClick={clearCurrent} /> */}

      <div className='accordion-wrapper'>
        <Modal isShowing={isShowing} hide={toggle}>
          <SearchModal
            artistName={currentArtist.name}
            artistID={currentArtist._id}
          />
        </Modal>
        <Accordion openByDef={true} title={'Albums'} toggle={toggle}>
          {sortArr(albums)
            .filter(albumsE => albumsE.releaseType === 'album')
            .map(albumsE => {
              return (
                <AlbumItem
                  key={albumsE._id}
                  album={albumsE}
                  toggleTracking={toggleTracking}
                />
              );
            })}
        </Accordion>
        {albums.some(albumsE => albumsE.releaseType === 'single') && (
          <Accordion openByDef={false} title={'Singles'}>
            {sortArr(albums)
              .filter(albumsE => albumsE.releaseType === 'single')
              .map(albumsE => {
                return (
                  <AlbumItem
                    key={albumsE._id}
                    album={albumsE}
                    toggleTracking={toggleTracking}
                  />
                );
              })}
          </Accordion>
        )}
        {albums.some(albumsE => albumsE.releaseType === 'compilation') && (
          <Accordion openByDef={false} title={'Compilations'}>
            {sortArr(albums)
              .filter(albumsE => albumsE.releaseType === 'compilation')
              .map(albumsE => {
                return (
                  <AlbumItem
                    key={albumsE._id}
                    album={albumsE}
                    toggleTracking={toggleTracking}
                  />
                );
              })}
          </Accordion>
        )}
      </div>
    </Fragment>
  );
};

export default AlbumList;
