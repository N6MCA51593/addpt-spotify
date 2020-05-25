import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Stats = ({
  type,
  artists = 0,
  albums = 0,
  tracks = 0,
  progress = 0,
  status = '--',
  classMod = ''
}) => {
  return (
    <div className='stats'>
      <h1>{type} tracking stats</h1>
      <div className='stats-data'>
        {type === 'Collection' && (
          <div className='data-item'>
            <FontAwesomeIcon icon='user' size='3x' fixedWidth={true} />
            <div className='stat-text'>
              <p>Artists</p> <h3>{artists}</h3>
            </div>
          </div>
        )}
        <div className='data-item'>
          <FontAwesomeIcon icon='compact-disc' size='3x' fixedWidth={true} />
          <div className='stat-text'>
            <p>Albums</p> <h3>{albums}</h3>
          </div>
        </div>
        <div className='data-item'>
          <FontAwesomeIcon icon='file-audio' size='3x' fixedWidth={true} />
          <div className='stat-text'>
            <p>Tracks</p> <h3>{tracks}</h3>
          </div>
        </div>
        <div className='data-item'>
          <FontAwesomeIcon icon='ruler-vertical' size='3x' fixedWidth={true} />
          <div className='stat-text'>
            <p>Progress</p>{' '}
            <h3>{!isNaN(progress) ? progress.toFixed(2) + '%' : '--'}</h3>
          </div>
        </div>
        {type !== 'Collection' && (
          <div className='data-item'>
            <FontAwesomeIcon icon='info' size='3x' fixedWidth={true} />
            <div className='stat-text'>
              <p>Status</p> <h3 className={'header-' + classMod}>{status}</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Stats.propTypes = {
  type: PropTypes.string,
  artists: PropTypes.number,
  albums: PropTypes.number,
  tracks: PropTypes.number,
  progress: PropTypes.number,
  status: PropTypes.string,
  classMod: PropTypes.number
};

export default memo(Stats);
