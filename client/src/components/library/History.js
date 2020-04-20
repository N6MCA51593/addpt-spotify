import React, { Fragment } from 'react';
import useAPIRequest from '../../utils/useAPIRequest';
import LoadingSpinner from '../layout/LoadingSpinner';
import TrackItem from './TrackItem';

const History = () => {
  const [{ data, isLoading }] = useAPIRequest(
    {
      url: '/api/history',
      method: 'get'
    },
    []
  );

  if (isLoading) {
    return (
      <div className='history'>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Fragment>
      {data.tracks &&
        data.tracks.map(dataE => (
          <div key={dataE.tracks.lastListen}>
            <TrackItem track={dataE.tracks} />
          </div>
        ))}
    </Fragment>
  );
};

export default History;
