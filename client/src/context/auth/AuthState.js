import React, { useReducer } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import { USER_LOADED, AUTH_FAIL, LOGOUT, CLEAR_ERRORS } from '../types';

const cookies = new Cookies();
const token = cookies.get('token');
const AuthState = props => {
  const initialState = {
    token: token || null,
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    setAuthToken(token);
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
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        loadUser,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
