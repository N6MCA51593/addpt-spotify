import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = ({ type, icon, ...rest }) => {
  return (
    <div className={`button button-${type}`} {...rest}>
      <FontAwesomeIcon icon={icon} />
    </div>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  icon: PropTypes.string.isRequired
};

export default Button;
