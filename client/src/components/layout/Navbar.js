import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Navbar = () => {
  const { logout } = useContext(AuthContext);

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
      </ul>
    </div>
  );
};

export default Navbar;
