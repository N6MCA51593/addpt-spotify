import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import image from '../../assets/landing_page_image.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      <div className='secondary'>
        <h1>Get the most out of the app</h1>
        <div className='info'>
          <div className='info-item'>
            <div className='icon-container icon-container-steps'>
              <FontAwesomeIcon icon='shoe-prints' size='lg' className='icon' />
            </div>
            <h3>First steps</h3>
            Search for and add the artists that you want to keep tabs on. Doing
            so adds their albums from Spotify to your library as well. The app
            automatically collects up to 60 albums, but you can add the rest and
            the new releases manually.
          </div>
          <div className='info-item'>
            <div className='icon-container icon-container-track'>
              <FontAwesomeIcon icon='eye' size='lg' className='icon' />
            </div>
            <h3>Never lose track</h3>
            The app periodically checks your Spotify listening history and
            updates your collection accordingly. You can trigger an update at
            any time from the navbar menu.
          </div>
          <div className='info-item'>
            <div className='icon-container icon-container-customize'>
              <FontAwesomeIcon icon='cogs' size='lg' className='icon' />
            </div>
            <h3>Highly customizable</h3>
            It's up to you to decide what albums and songs you want to track.
            Moreover, you can tweak progress thresholds for songs, albums, and
            artists in the settings, or alter the listens counter for any song
            if you choose to.
          </div>
          <div className='info-item'>
            <div className='icon-container icon-container-finish'>
              <FontAwesomeIcon
                icon='flag-checkered'
                size='lg'
                className='icon'
              />
            </div>
            <h3>The final destination</h3>
            Once you feel you are done with an artist, you can delete them from
            your collection or archive them. Archived artists are not tracked
            and retain the threshold settings at the time of their archival,
            effectively saving their progress stats, so feel free to use the
            archive as your completionist display shelf!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
