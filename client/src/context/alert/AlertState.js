import React, { useReducer, useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = props => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  const removeAlert = id => {
    dispatch({ type: REMOVE_ALERT, payload: id });
  };

  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuid();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id }
    });
    setTimeout(() => removeAlert(id), timeout);
  };

  const setAlertMemoized = useCallback(setAlert, []);

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert: setAlertMemoized,
        removeAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
