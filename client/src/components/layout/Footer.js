import React from 'react';
import logoSp from '../../assets/logo_sp.png';
import logoGh from '../../assets/logo_gh.png';
import iconGh from '../../assets/icon_gh.png';

const Footer = () => {
  return (
    <div className='footer'>
      <h3>K. C. &copy; 2020</h3>
      <div className='links'>
        <div>
          {' '}
          Metadata provided by
          <a
            href='https://spotify.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img src={logoSp} alt='Spotify' />
          </a>
        </div>
        <div>
          Check out the project code on
          <a
            href='https://github.com/N6MCA51593/spotify-addpt'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img src={iconGh} alt='Icon' className='icon' />
            <img src={logoGh} alt='Github' />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
