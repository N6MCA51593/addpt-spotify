import React from 'react';
import logo_sp from '../../assets/logo_sp.png';
import logo_gh from '../../assets/logo_gh.png';
import icon_gh from '../../assets/icon_gh.png';

const Footer = () => {
  return (
    <div className='footer'>
      <h3>Konstantin Chesnokov &copy; 2020</h3>
      <div className='links'>
        <div>
          {' '}
          Metadata provided by
          <a
            href='https://spotify.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img src={logo_sp} alt='Spotify' />
          </a>
        </div>
        <div>
          Check out the project code on
          <a
            href='https://github.com/N6MCA51593/spotify-addpt'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img src={icon_gh} alt='Icon' className='icon' />
            <img src={logo_gh} alt='Github' />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
