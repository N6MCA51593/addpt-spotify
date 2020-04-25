import React from 'react';
import ReactSlider from 'react-slider';
import useSettings from '../../utils/useSettings';
import useAPIRequest from '../../utils/useAPIRequest';

const SettingsComponent = () => {
  const {
    albumThresholds,
    trackThresholds,
    artistThresholds,
    doNotTrack,
    setDoNotTrack
  } = useSettings();
  const setConfig = useAPIRequest({})[1];
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
  };

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
        value={doNotTrack}
        onChange={() => setDoNotTrack(!doNotTrack)}
      />
      <input type='button' value='Submit' onClick={onSubmit} />
    </div>
  );
};

export default SettingsComponent;
