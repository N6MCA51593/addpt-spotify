import React from 'react';
import AuthState from './context/auth/AuthState';
import './App.css';

const App = () => {
  return (
    <AuthState>
      <div className='App'>My app</div>
    </AuthState>
  );
};

export default App;
