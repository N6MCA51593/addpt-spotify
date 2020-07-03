import axios from 'axios';
import { useState, useEffect, useReducer, useCallback } from 'react';
import PropTypes from 'prop-types';

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
    case 'DATA_RESET':
      return {
        ...state,
        data: null
      };
    default:
      return state;
  }
};

const useAPIRequest = (initialConfig, initialData) => {
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

      dispatch({ type: 'REQUEST_INIT' });

      try {
        const result = await axios(config);
        if (!didCancel) {
          dispatch({
            type: 'REQUEST_SUCCESS',
            payload: result.data
          });
        }
      } catch (err) {
        if (!didCancel) {
          dispatch({ type: 'REQUEST_FAIL' });
        }
      }
    };

    execRequest();

    return () => {
      didCancel = true;
    };
  }, [config]);

  const resetData = useCallback(() => dispatch({ type: 'DATA_RESET' }), []);

  return [state, setConfig, resetData];
};

useAPIRequest.propTypes = {
  initialConfig: PropTypes.object,
  initialData: PropTypes.any
};

export default useAPIRequest;
