import React, { Fragment } from 'react';

const TrackItem = ({ track }) => {
  return (
    <Fragment>
      <p>{track.name}</p>
      <p>{track.isTracked.toString()}</p>
    </Fragment>
  );
};

export default TrackItem;
