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
    minDistance: 5
  };

  useEffect(() => {
    if (data && data.msg === 'Updated' && !isError && !isLoading) {
      props.history.push('/');
      setAlert('Your settings have been updated', 'success');
    } else if (isError && !isLoading) {
      setAlert('Error updating settings', 'danger');
    }
  }, [data, isLoading, isError]);

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
      <div>
        <ReactSlider {...sliderProps} value={trackThresholds} />
        <ReactSlider {...sliderProps} value={albumThresholds} />
        <ReactSlider {...sliderProps} value={artistThresholds} />
        <label htmlFor='tracking'>Enable automatic tracking</label>
        <input
          type='checkbox'
          name='tracking'
          id='tracking'
          checked={doNotTrack}
          onChange={() => setDoNotTrack(!doNotTrack)}
        />
        <input type='button' value='Submit' onClick={onSubmit} />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default SettingsComponent;
