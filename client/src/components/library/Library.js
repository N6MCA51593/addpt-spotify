import React, { Fragment, useContext, useEffect } from 'react';
import LibraryContext from '../../context/library/libraryContext';

export const Library = () => {
  const libraryContext = useContext(LibraryContext);
  const { artists, loading, loadLibrary } = libraryContext;

  useEffect(() => {
    loadLibrary();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <h1>Library</h1>
    </Fragment>
  );
};

export default Library;
