import React, { Fragment, useEffect, useState } from 'react';
import useAPIRequest from '../../utils/useAPIRequest';
import LoadingSpinner from '../layout/LoadingSpinner';

const History = () => {
  const [{ data, isError, isLoading }, setConfig] = useAPIRequest(
    {
      url: '/api/history',
      method: 'get'
    },
    []
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className='history'>
      {data.tracks &&
        data.tracks.map(dataE => (
          <p key={dataE.tracks.lastListen}>{dataE.tracks.name}</p>
        ))}
    </div>
  );
};

export default History;
