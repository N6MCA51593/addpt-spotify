import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Controls = ({ children }) => {
  const [isShowing, setIsShowing] = useState(false);

  const toggleControls = e => {
    e.stopPropagation();
    setIsShowing(!isShowing);
  };
  return (
    <div className={`controls${isShowing ? ' controls-showing nohover' : ''}`}>
      <div className='controls-toggle' onClick={e => toggleControls(e)}>
        {isShowing ? 'X' : <FontAwesomeIcon icon='ellipsis-v' />}
      </div>
      {children}
    </div>
  );
};

export default Controls;
