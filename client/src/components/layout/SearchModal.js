import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchAndDisplay from '../library/SearchAndDisplay';

const SearchModal = ({ searchType }) => {
  const [query, setQuery] = useState('');
  const [isSubmitted, toggleSubmitted] = useState(false);

  const onChange = e => setQuery(e.target.value);
  const onSubmit = e => {
    e.preventDefault();
    if (query.length > 0) {
      toggleSubmitted(true);
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={onSubmit} className='search-form'>
        <input
          type='text'
          name='query'
          id='query'
          value={query}
          onChange={onChange}
        />
        <button type='submit' className='search-button'>
          Search
        </button>
        <SearchAndDisplay
          query={query}
          isSubmitted={isSubmitted}
          toggleSubmitted={toggleSubmitted}
          searchType={searchType}
        />
      </form>
    </React.Fragment>
  );
};

SearchModal.propTypes = {
  searchType: PropTypes.string.isRequired
};

export default SearchModal;
