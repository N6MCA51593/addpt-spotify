import React, { Fragment, useContext, useEffect } from 'react';
import LibraryContext from '../../context/library/libraryContext';
import AlbumItem from './AlbumItem';
import LoadingSpinner from '../layout/LoadingSpinner';
import Accordion from '../layout/Accordion';
import useModal from '../../utils/useModal';
import SearchModal from '../layout/SearchModal';
import Modal from '../layout/Modal';
import placeholder from '../layout/placeholder.png';
import useCurrentArtistUpdate from '../../utils/useCurrentArtistUpdate';

const AlbumList = () => {
  const libraryContext = useContext(LibraryContext);
  const { isShowing, toggle, setIsShowing } = useModal();
  const {
    loading,
    currentArtist,
    clearCurrent,
    setCurrentArtist
  } = libraryContext;
  const [artist, setParams] = useCurrentArtistUpdate();
  const albums = currentArtist.albums;

  useEffect(() => {
    setIsShowing(false);
  }, [albums, setIsShowing]);

  useEffect(() => {
    if (artist) {
      setCurrentArtist(artist);
    }
  }, [artist]);

  const toggleTracking = albumID => {
    setParams({ artistInit: currentArtist, albumID: albumID });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Fragment>
      <div className='container'>
        {currentArtist.name}
        <img
          src={currentArtist.img[2] ? currentArtist.img[2].url : placeholder}
          alt={currentArtist.name}
        />
        <input type='button' value='Back' onClick={clearCurrent} />
      </div>
      <div className='wrapper'>
        <Fragment>
          <Modal isShowing={isShowing} hide={toggle}>
            <SearchModal
              artistName={currentArtist.name}
              artistID={currentArtist._id}
            />
          </Modal>
          <Accordion openByDef={true} title={'Albums'} toggle={toggle}>
            {albums
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
              {albums
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
              {albums
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
        </Fragment>
      </div>
    </Fragment>
  );
};

export default AlbumList;
