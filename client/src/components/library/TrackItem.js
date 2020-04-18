import React, { Fragment } from 'react';

const TrackItem = ({ track }) => {
  return (
    <Fragment>
      <p>{track.name}</p>
    </Fragment>
  );
};

export default TrackItem;
