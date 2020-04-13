import React, { useEffect, Fragment, useContext } from 'react';
import useAPIRequest from '../../utils/useAPIRequest';
import PropTypes from 'prop-types';
import LoadingSpinner from '../layout/LoadingSpinner';
import ArtistItem from './ArtistItem';

const SearchAndDisplay = ({
  query,
  isSubmitted,
  toggleSubmitted,
  searchType
}) => {
  const [{ isLoading, data }, setConfig] = useAPIRequest();

  useEffect(() => {
    if (searchType === 'artist' && isSubmitted === true) {
      setConfig({
        url: '/api/library/add/search',
        method: 'get',
        params: { query: query }
      });
    }

    toggleSubmitted(false);
    // eslint-disable-next-line
  }, [isSubmitted]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (data && data.msg) {
    return (
      <Fragment>
        <p>{data.msg}</p>
      </Fragment>
    );
  }

  return (
    <div className='search-results'>
      {data &&
        data.map(dataE => {
          return <ArtistItem key={dataE.spID} artist={dataE} />;
        })}
    </div>
  );
};

SearchAndDisplay.propTypes = {
  searchType: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  isSubmitted: PropTypes.bool.isRequired,
  toggleSubmitted: PropTypes.func.isRequired
};

export default SearchAndDisplay;
