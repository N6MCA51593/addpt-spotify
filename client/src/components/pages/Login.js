import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import image from '../../assets/landing_page_image.png';

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
    <div className='landing'>
      <div className='main'>
        <div className='text'>
          <h1>
            Every artist you meet on your musical journey presents a voyage of
            their own, so it helps to have a <span>MAP</span>
          </h1>
          <h3>Artist Discography Discovery Progress Tracker for Spotify </h3>
          <form action='/api/auth' method='post'>
            <button type='submit'>Sign in with Spotify</button>
          </form>
        </div>
        <div className='image-container'>
          <div>
            <img src={image} alt='App' />
          </div>
        </div>
      </div>
      <div className='secondary'></div>
    </div>
  );
};

export default Login;
