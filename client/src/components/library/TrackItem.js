import React, { Fragment, useState, useEffect } from 'react';
import useSettings from '../../utils/useSettings';

const TrackItem = ({ track, toggleTracking, albumID }) => {
  const [listens, setListens] = useState(track.listens);
  const [listensChanged, setListensChanged] = useState(false);
  const [tracking, setTracking] = useState(track.isTracked);
  const [trackingToggleBool, setTrackingToggleBool] = useState(true);
  const { assessTrack } = useSettings();
  const trackID = track._id;

  useEffect(() => {
    if (listensChanged && !trackingToggleBool) {
      toggleTracking(albumID, trackID, listens);
      setTrackingToggleBool(true);
    }
  }, [listens, trackingToggleBool, listensChanged]);

  useEffect(() => {
    setListens(track.listens);
    setTracking(track.isTracked);
    setListensChanged(false);
  }, [track]);

  const incListens = () => {
    setTrackingToggleBool(false);
    setListensChanged(true);
    setListens(listens + 1);
  };

  const decListens = () => {
    setTrackingToggleBool(false);
    setListensChanged(true);
    setListens(listens === 0 ? listens : listens - 1);
  };

  const toggleState = () => {
    setTracking(!tracking);
  };

  return (
    <Fragment>
      <p>{'Name: ' + track.name}</p>

      {albumID && (
        <Fragment>
          <p>{'Listens: ' + listens}</p>
          <p>Track progress: {assessTrack({ ...track, listens: listens })}</p>
          <p>{'Tracked: ' + tracking.toString()}</p>
          <input
            type='button'
            value='Toggle'
            onClick={() => {
              toggleTracking(albumID, trackID);
              toggleState();
            }}
          />
          <input type='button' value='+' onClick={incListens} />
          <input type='button' value='-' onClick={decListens} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default TrackItem;
