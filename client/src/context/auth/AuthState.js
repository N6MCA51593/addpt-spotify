import React, { useReducer } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAxiosOptions from '../../utils/setAxiosOptions';
import { USER_LOADED, AUTH_FAIL, LOGOUT, CLEAR_ERRORS } from '../types';

const AuthState = props => {
  const initialState = {
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const logout = () => {
    const cookies = new Cookies();
    cookies.remove('token');
    dispatch({
      type: LOGOUT
    });
  };

  // Load User
  const loadUser = async () => {
    setAxiosOptions(logout);
    try {
      const res = await axios.get('/api/auth/load');
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: AUTH_FAIL });
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
