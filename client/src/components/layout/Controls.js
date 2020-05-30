import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const Controls = ({ children, isShowing, setIsShowing, setIsToggled }) => {
  const toggleControls = e => {
    e.stopPropagation();
    setIsShowing(!isShowing);
    setIsToggled(true);
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

Controls.propTypes = {
  isShowing: PropTypes.bool,
  setIsShowing: PropTypes.func,
  setIsToggled: PropTypes.func,
  children: PropTypes.any
};

export default Controls;
