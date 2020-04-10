import React, { Fragment, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Navbar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className='navbar'>
      <ul>
        <Link to='/'>Home</Link>
      </ul>
      <ul>
        <Link to='/settings'>Settings</Link>
      </ul>
      <ul>
        <Link to='/login'>Login</Link>
      </ul>
      <ul>
        <a href='#' onClick={logout}>
          Logout
        </a>
      </ul>
    </div>
  );
};

export default Navbar;
