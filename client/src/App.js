import React from 'react';
import './App.css';
import Login from './components/auth/Login';
import AuthState from './context/auth/AuthState';

const App = () => {
  return (
    <AuthState>
      <div className='container'>Please Log In</div>
      <Login />
    </AuthState>
  );
};

export default App;
