import React, { useReducer } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAxiosOptions from '../../utils/setAxiosOptions';
import { USER_LOADED, AUTH_FAIL, LOGOUT, CLEAR_ERRORS, LOADED } from '../types';

const AuthState = props => {
  const initialState = {
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const logout = async () => {
    const res = await axios.get('/api/auth/logout');
    dispatch({
      type: LOGOUT
    });
  };

  // Load User
  const loadUser = async () => {
    const cookies = new Cookies();
    const login = cookies.get('login') || null;
    if (login && login === 'error') {
      dispatch({ type: AUTH_FAIL });
      cookies.remove('login');
    } else if (login && login === 'success') {
      setAxiosOptions(logout);
      try {
        const res = await axios.get('/api/auth/load');
        dispatch({
          type: USER_LOADED,
          payload: res.data
        });
      } catch (err) {
        dispatch({ type: AUTH_FAIL });
        cookies.remove('login');
      }
    } else {
      dispatch({
        type: LOADED
      });
    }
  };

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        loadUser,
        clearErrors,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
