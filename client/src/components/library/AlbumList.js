import React, { Fragment, useContext, useEffect } from 'react';
import LibraryContext from '../../context/library/libraryContext';
import AlbumItem from './AlbumItem';
import LoadingSpinner from '../layout/LoadingSpinner';
import Accordion from '../layout/Accordion';
import useModal from '../../utils/useModal';
import SearchModal from '../layout/SearchModal';
import Modal from '../layout/Modal';

const AlbumList = () => {
  const libraryContext = useContext(LibraryContext);
  const { loading, currentArtist } = libraryContext;
  const albums = currentArtist.albums;
  const { isShowing, toggle, setIsShowing } = useModal();
  console.log(Object.entries(currentArtist));

  useEffect(() => {
    setIsShowing(false);
  }, [albums]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className='wrapper'>
      {albums && (
        <Fragment>
          <Modal isShowing={isShowing} hide={toggle}>
            <SearchModal searchType={'album'} />
          </Modal>
          <Accordion openByDef={true} title={'Albums'} toggle={toggle}>
            {albums
              .filter(albumsE => albumsE.releaseType === 'album')
              .map(albumsE => {
                return <AlbumItem key={albumsE._id} album={albumsE} />;
              })}
          </Accordion>
          {albums.some(albumsE => albumsE.releaseType === 'single') && (
            <Accordion openByDef={false} title={'Singles'}>
              {albums
                .filter(albumsE => albumsE.releaseType === 'single')
                .map(albumsE => {
                  return <AlbumItem key={albumsE._id} album={albumsE} />;
                })}
            </Accordion>
          )}
          {albums.some(albumsE => albumsE.releaseType === 'compilation') && (
            <Accordion openByDef={false} title={'Compilations'}>
              {albums
                .filter(albumsE => albumsE.releaseType === 'compilation')
                .map(albumsE => {
                  return <AlbumItem key={albumsE._id} album={albumsE} />;
                })}
            </Accordion>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default AlbumList;
