import React from 'react';
import SettingsComponent from '../settings/SettingsComponent';

const Settings = props => {
  return (
    <div className='container'>
      <SettingsComponent {...props} />
    </div>
  );
};

export default Settings;
