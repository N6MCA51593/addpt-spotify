import axios from 'axios';
import { useState, useEffect, useReducer } from 'react';

const types = {
  REQUEST_INIT: 'REQUEST_INIT',
  REQUEST_SUCCESS: 'REQUEST_SUCCESS',
  REQUEST_FAIL: 'REQUEST_FAILURE'
};

const hookStateReducer = (state, action) => {
  switch (action.type) {
    case 'REQUEST_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case 'REQUEST_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case 'REQUEST_FAIL':
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
};

const useAPIRequest = (initialConfig, initialData) => {
  const { REQUEST_FAIL, REQUEST_INIT, REQUEST_SUCCESS } = types;

  const [config, setConfig] = useState(initialConfig);

  const [state, dispatch] = useReducer(hookStateReducer, {
    isLoading: false,
    isError: false,
    data: initialData
  });

  useEffect(() => {
    let didCancel = false;
    const execRequest = async () => {
      if (!config || !config.url) {
        return;
      }

      dispatch({ type: REQUEST_INIT });

      try {
        const result = await axios(config);
        console.log(config);
        if (!didCancel) {
          dispatch({
            type: REQUEST_SUCCESS,
            payload: result.data
          });
        }
      } catch (err) {
        if (!didCancel) {
          dispatch({ type: REQUEST_FAIL });
        }
      }
    };

    execRequest();

    return () => {
      didCancel = true;
    };
    // eslint-disable-next-line
  }, [config]);

  return [state, setConfig];
};

export default useAPIRequest;
