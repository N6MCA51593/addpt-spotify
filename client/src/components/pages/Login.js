import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = props => {
  const { isAuthenticated, error, clearErrors } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'Login failed') {
      setAlert(error, 'danger');
      clearErrors();
    }
  }, [isAuthenticated, props.history, error, setAlert, clearErrors]);
  return (
    <div>
      Please Log In
      <form action='/api/auth' method='post'>
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default Login;
