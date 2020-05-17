import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import LibraryContext from '../../context/library/libraryContext';
import useAPIRequest from '../../utils/useAPIRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const { clearCurrent } = useContext(LibraryContext);

  const loc = useLocation();

  const setConfig = useAPIRequest()[1];

  return (
    <div className='navbar'>
      <ul>
        <li>
          <Link
            to='/'
            className='nav-link'
            onClick={() => {
              window.scrollTo(0, 0);
              loc.pathname === '/' && clearCurrent();
            }}
          >
            <FontAwesomeIcon icon='home' size='lg' />
          </Link>
        </li>
        <li>
          <Link to='/settings' className='nav-link'>
            <FontAwesomeIcon icon='cog' size='lg' />
          </Link>
        </li>
        <li>
          <p
            onClick={() =>
              setConfig({
                url: '/api/sync',
                method: 'post'
              })
            }
          >
            <FontAwesomeIcon icon='sync-alt' size='lg' />
          </p>
        </li>
        <li>
          <p onClick={logout}>
            <FontAwesomeIcon icon='door-open' size='lg' />
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
