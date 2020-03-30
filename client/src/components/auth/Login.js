import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

export const Login = props => {
  const authContext = useContext(AuthContext);
  const { login, error, isAuthenticated } = authContext;
  const onSubmit = e => {
    e.preventDefault();
    login();
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type='submit' value='Login' />
      </form>
      <form action='/api/auth' method='post'>
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default Login;
