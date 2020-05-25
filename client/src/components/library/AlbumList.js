import React, { Fragment, useContext, useEffect, memo } from 'react';
import LibraryContext from '../../context/library/libraryContext';
import AlbumItem from './AlbumItem';
import Accordion from '../layout/Accordion';
import useModal from '../../utils/useModal';
import SearchModal from '../layout/SearchModal';
import Modal from '../layout/Modal';
import useSettings from '../../utils/useSettings';
import useSorting from '../../utils/useSorting';
import Stats from '../layout/Stats';
import PropTypes from 'prop-types';

const AlbumList = ({ toggleTracking, setChildUnmounted }) => {
  const { currentArtist } = useContext(LibraryContext);
  const { isShowing, toggle, setIsShowing, setType } = useModal();
  const { assessArr, assessPresentational } = useSettings();
  const { sortArr } = useSorting();
  const albums = currentArtist.albums;

  useEffect(() => {
    setIsShowing(false);
  }, [albums, setIsShowing]);

  useEffect(() => {
    return () => {
      setChildUnmounted(currentArtist._id);
    };
  }, [setChildUnmounted, currentArtist._id]);

  const albumStat = albums.filter(albumE => albumE.isTracked);
  const trackStat =
    albumStat.length > 0 &&
    albumStat
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
        albums={albumStat.length}
        tracks={trackStat}
        status={status}
        classMod={classMod}
      />

      <div className='accordion-wrapper'>
        <Modal isShowing={isShowing} hide={toggle} type='addAlbum'>
          <SearchModal
            artistName={currentArtist.name}
            artistID={currentArtist._id}
          />
        </Modal>
        <Accordion
          openByDef={true}
          title={'Albums'}
          toggle={toggle}
          setType={setType}
        >
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

AlbumList.propTypes = {
  setChildUnmounted: PropTypes.func.isRequired,
  toggleTracking: PropTypes.func.isRequired
};

export default memo(AlbumList);
