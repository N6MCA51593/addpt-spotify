import React, { useEffect, useContext } from 'react';
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
    setDoNotTrack
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
    minDistance: 1
  };

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
        trackThresholds: trackThresholds,
        albumThresholds: albumThresholds,
        artistThresholds: artistThresholds,
        doNotTrack: doNotTrack
      }
    });
    localStorage.setItem('artistThresholds', JSON.stringify(artistThresholds));
    localStorage.setItem('albumThresholds', JSON.stringify(albumThresholds));
    localStorage.setItem('trackThresholds', JSON.stringify(trackThresholds));
    localStorage.setItem('doNotTrack', doNotTrack);
  };

  if (albumThresholds && artistThresholds && trackThresholds) {
    return (
      <div className='settings'>
        <div className='settings-item'>
          <p>Track progress thresholds, listens (used for calculations)</p>
          <ReactSlider {...sliderProps} value={trackThresholds} />
        </div>
        <div className='settings-item'>
          <p>Album progress thresholds, %</p>
          <ReactSlider {...sliderProps} value={albumThresholds} />
        </div>
        <div className='settings-item'>
          <p>Artist progress thresholds, %</p>
          <ReactSlider {...sliderProps} value={artistThresholds} />
        </div>
        <div className='settings-item'>
          <label htmlFor='tracking'>
            <p>Automatic tracking of listening history</p>
          </label>
          <input
            type='checkbox'
            name='tracking'
            id='tracking'
            checked={!doNotTrack}
            onChange={() => setDoNotTrack(!doNotTrack)}
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
