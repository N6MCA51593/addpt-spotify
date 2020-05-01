import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import useAPIRequest from '../../utils/useAPIRequest';

const Navbar = () => {
  const { logout } = useContext(AuthContext);

  const setConfig = useAPIRequest()[1];

  return (
    <div className='navbar'>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/settings'>Settings</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <p onClick={logout}>Logout</p>
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
            Sync
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
