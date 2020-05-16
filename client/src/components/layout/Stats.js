import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Stats = ({
  type,
  img,
  artists = 0,
  albums = 0,
  tracks = 0,
  progress = 0,
  status = '--'
}) => {
  return (
    <div className='stats'>
      <h1>Collection tracking stats</h1>
      <div className='stats-data'>
        <div className='data-item'>
          <FontAwesomeIcon icon='user' size='3x' />
          <div className='stat-text'>
            <p>Artists</p> <h3>{artists}</h3>
          </div>
        </div>
        <div className='data-item'>
          <FontAwesomeIcon icon='compact-disc' size='3x' />
          <div className='stat-text'>
            <p>Albums</p> <h3>{albums}</h3>
          </div>
        </div>
        <div className='data-item'>
          <FontAwesomeIcon icon='file-audio' size='3x' />
          <div className='stat-text'>
            <p>Tracks</p> <h3>{tracks}</h3>
          </div>
        </div>
        <div className='data-item'>
          <FontAwesomeIcon icon='ruler-vertical' size='3x' />
          <div className='stat-text'>
            <p>Progress</p> <h3>{progress.toFixed(2) + '%'}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

Stats.propTypes = {};

export default Stats;
