import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import useAPIRequest from '../../utils/useAPIRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = () => {
  const { logout } = useContext(AuthContext);

  const setConfig = useAPIRequest()[1];

  return (
    <div className='navbar'>
      <ul>
        <li>
          <Link to='/' className='nav-link'>
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
