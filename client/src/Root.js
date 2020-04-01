import React, { Fragment } from 'react';
import AuthState from './context/auth/AuthState';
import App from './App';

export const Root = () => {
  return (
    <Fragment>
      <AuthState>
        <App />
      </AuthState>
    </Fragment>
  );
};

export default Root;
