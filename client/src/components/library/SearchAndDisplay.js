import React, { useEffect, Fragment } from 'react';
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
  const [{ isLoading, isError, data }, setConfig] = useAPIRequest();
  useEffect(() => {
    if (searchType === 'artist' && isSubmitted === true) {
      setConfig({
        url: '/api/library/add/search',
        method: 'get',
        params: { query: query }
      });
    }
    toggleSubmitted(false);
  }, [isSubmitted]);
  console.log(data);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className='search-results'>
      {data &&
        data.map(dataE => {
          return <ArtistItem key={dataE._id} artist={dataE} />;
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
