import React, { Fragment, useState, useEffect } from 'react';
import useSettings from '../../utils/useSettings';

const TrackItem = ({ track, toggleTracking, albumID }) => {
  const [listens, setListens] = useState(track.listens);
  const { assessTrack } = useSettings();
  const trackID = track._id;

  useEffect(() => {
    if (listens !== track.listens) {
      toggleTracking(albumID, trackID, listens);
    }
  }, [listens]);

  const incListens = () => {
    setListens(listens + 1);
  };
  const decListens = () => {
    setListens(listens === 0 ? listens : listens - 1);
  };

  return (
    <Fragment>
      <p>{'Name: ' + track.name}</p>

      {albumID && (
        <Fragment>
          <p>{'Listens: ' + listens}</p>
          <p>Track progress: {assessTrack(track)}</p>
          <p>{'Tracked: ' + track.isTracked.toString()}</p>
          <input
            type='button'
            value='Toggle'
            onClick={() => toggleTracking(albumID, trackID)}
          />
          <input type='button' value='+' onClick={incListens} />
          <input type='button' value='-' onClick={decListens} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default TrackItem;
