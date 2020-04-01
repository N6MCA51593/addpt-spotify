import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

export const Login = props => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    // eslint-disable-next-line
  }, [isAuthenticated, props.history]);
  return (
    <div>
      Please Log In
      <form action='/api/auth' method='post'>
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default Login;
