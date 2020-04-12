import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import useOnClickOutside from '../../utils/useOnClickOutside';
import SearchAndDisplay from '../library/SearchAndDisplay';

const SearchModal = ({ isShowing, hide, searchType }) => {
  const [query, setQuery] = useState('');
  const [isSubmitted, toggleSubmitted] = useState(false);

  const onChange = e => setQuery(e.target.value);
  const onSubmit = e => {
    e.preventDefault();
    if (query.length > 0) {
      toggleSubmitted(true);
    }
  };

  const ref = useRef();
  useOnClickOutside(ref, hide);

  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className='modal-overlay' />
          <div className='modal-wrapper'>
            <div className='modal' ref={ref}>
              <div className='modal-header'>
                <button
                  type='button'
                  className='modal-close-button'
                  onClick={hide}
                >
                  x
                </button>
              </div>
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
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};

SearchModal.propTypes = {
  isShowing: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  searchType: PropTypes.string.isRequired
};

export default SearchModal;
