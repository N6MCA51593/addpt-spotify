import React, { useEffect, useContext, useState } from 'react';
import ReactSlider from 'react-slider';
import useSettings from '../../utils/useSettings';
import useAPIRequest from '../../utils/useAPIRequest';
import AlertContext from '../../context/alert/alertContext';

const SettingsComponent = props => {
  const {
    albumThresholds,
    trackThresholds,
    artistThresholds,
    doNotTrack,
    dispatch,
    areLoaded
  } = useSettings();
  const [{ data, isLoading, isError }, setConfig] = useAPIRequest({});
  const { setAlert } = useContext(AlertContext);
  const sliderProps = {
    min: 1,
    max: 100,
    className: 'horizontal-slider',
    thumbClassName: 'example-thumb',
    trackClassName: 'example-track',
    renderThumb: (props, state) => <div {...props}>{state.valueNow}</div>,
    pearling: true,
    minDistance: 0
  };
  const [trackState, setTrackState] = useState(null);
  const [albumState, setAlbumState] = useState(null);
  const [artistState, setArtistState] = useState(null);
  const [trackingState, setTrackingState] = useState(null);

  console.log(trackState);
  useEffect(() => {
    if (areLoaded) {
      setTrackState(trackThresholds);
      setAlbumState(albumThresholds);
      setArtistState(artistThresholds);
      setTrackingState(doNotTrack);
    }
  }, [
    albumThresholds,
    trackThresholds,
    artistThresholds,
    doNotTrack,
    areLoaded
  ]);

  useEffect(() => {
    if (data && data.msg === 'Updated' && !isError && !isLoading) {
      props.history.push('/');
      setAlert('Your settings have been updated', 'success');
    } else if (isError && !isLoading) {
      setAlert('Error updating settings', 'danger');
    }
  }, [data, isLoading, isError, props.history, setAlert]);

  const onSubmit = () => {
    setConfig({
      url: 'api/settings',
      method: 'put',
      data: {
        trackThresholds: trackState,
        albumThresholds: albumState,
        artistThresholds: artistState,
        doNotTrack: trackingState
      }
    });

    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: {
        trackThresholds: trackState,
        albumThresholds: albumState,
        artistThresholds: artistState,
        doNotTrack: trackingState
      }
    });
  };

  if (areLoaded) {
    return (
      <div className='settings'>
        <div className='settings-item'>
          <p>Track progress thresholds, listens (used for calculations)</p>
          <ReactSlider
            {...sliderProps}
            value={trackState}
            onChange={value => setTrackState(value)}
          />
        </div>
        <div className='settings-item'>
          <p>Album progress thresholds, %</p>
          <ReactSlider
            {...sliderProps}
            value={albumState}
            onChange={value => setAlbumState(value)}
          />
        </div>
        <div className='settings-item'>
          <p>Artist progress thresholds, %</p>
          <ReactSlider
            {...sliderProps}
            value={artistState}
            onChange={value => setArtistState(value)}
          />
        </div>
        <div className='settings-item'>
          <label htmlFor='tracking'>
            <p>Automatic tracking of listening history</p>
          </label>
          <input
            type='checkbox'
            name='tracking'
            id='tracking'
            checked={!trackingState}
            onChange={() => setTrackingState(!trackingState)}
          />
        </div>
        <input type='button' value='Submit' onClick={onSubmit} />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default SettingsComponent;
