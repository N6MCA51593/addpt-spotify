import React, { Fragment, useEffect } from 'react';
import useAPIRequest from '../../utils/useAPIRequest';
import LoadingSpinner from '../layout/LoadingSpinner';
import TrackItem from './TrackItem';

const History = ({ updArtists }) => {
  const [{ data, isLoading }, setConfig] = useAPIRequest(
    {
      url: '/api/history',
      method: 'get'
    },
    []
  );

  useEffect(() => {
    if (updArtists) {
      setConfig({
        url: '/api/history',
        method: 'get'
      });
    }
  }, [updArtists, setConfig]);

  if (isLoading) {
    return (
      <Fragment>
        <LoadingSpinner />
      </Fragment>
    );
  }

  return (
    <Fragment>
      {data.tracks &&
        data.tracks.map(dataE => (
          <Fragment key={dataE.tracks.lastListen}>
            <TrackItem
              track={{
                ...dataE.tracks,
                artistName: dataE.name,
                albumName: dataE.albums.name
              }}
            />
          </Fragment>
        ))}
    </Fragment>
  );
};

export default History;
