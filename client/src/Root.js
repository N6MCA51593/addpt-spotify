import React from 'react';
import AuthState from './context/auth/AuthState';
import App from './App';
import ErrorBoundary from './utils/ErrorBoundary';

export const Root = () => {
  return (
    <ErrorBoundary>
      <AuthState>
        <App />
      </AuthState>
    </ErrorBoundary>
  );
};

export default Root;
