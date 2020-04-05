import {
  USER_LOADED,
  LOGIN_SUCCESS,
  AUTH_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  LOADED
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case AUTH_FAIL:
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: 'Login failed'
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false
      };
    case LOADED:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
