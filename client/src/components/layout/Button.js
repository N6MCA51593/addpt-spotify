import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = ({ type, icon, ...rest }) => {
  return (
    <div className={`button button-${type}`} {...rest}>
      {useMemo(
        () => (
          <FontAwesomeIcon icon={icon} />
        ),
        [icon]
      )}
    </div>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  icon: PropTypes.string.isRequired
};

export default Button;
