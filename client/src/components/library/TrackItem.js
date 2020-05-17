import React, { useState, useEffect } from 'react';
import useSettings from '../../utils/useSettings';
import Button from '../layout/Button';
import Controls from '../layout/Controls';

const TrackItem = ({ track, toggleTracking, albumID }) => {
  const [listens, setListens] = useState(track.listens);
  const [listensChanged, setListensChanged] = useState(false);
  const [tracking, setTracking] = useState(track.isTracked);
  const [trackingToggleBool, setTrackingToggleBool] = useState(true);
  const { assessPresentational } = useSettings();
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

  const { classMod } = assessPresentational(listens, 'track');

  return (
    <div
      className={`track track-${
        tracking === (undefined || true) ? classMod : '5'
      }`}
    >
      <div className={`listens ${listens > 99 ? 'listens-big' : ''}`}>
        {listens > 99 ? '99' : listens}
      </div>
      <div className='track-text ell'>
        <p className='track-name ell'>{track.name}</p>
        <p className='track-info ell'>
          {!albumID && track.artistName + ' - ' + track.albumName}
        </p>
      </div>

      {albumID && (
        <Controls>
          <Button type='inc' icon='caret-up' onClick={incListens} />
          <Button
            type={tracking ? 'track-on' : 'track-off'}
            icon={tracking ? 'eye' : 'eye-slash'}
            onClick={() => {
              toggleTracking(albumID, trackID);
              toggleState();
            }}
          />
          <Button type='dec' icon='caret-down' onClick={decListens} />
        </Controls>
      )}
    </div>
  );
};

export default TrackItem;
