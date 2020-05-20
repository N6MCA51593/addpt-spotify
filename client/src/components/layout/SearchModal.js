import React, { Fragment, useState } from 'react';
import SearchAndDisplay from '../library/SearchAndDisplay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchModal = ({ artistName, artistID }) => {
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
    <Fragment>
      <form onSubmit={onSubmit} className='search-form'>
        <input
          type='text'
          name='query'
          id='query'
          value={query}
          onChange={onChange}
          autoComplete='off'
        />
        <button type='submit'>
          <FontAwesomeIcon icon='search-plus' />
        </button>
      </form>
      <SearchAndDisplay
        query={query}
        isSubmitted={isSubmitted}
        toggleSubmitted={toggleSubmitted}
        artistName={artistName}
        artistID={artistID}
      />
    </Fragment>
  );
};

export default SearchModal;
