import { useEffect } from 'react';
import PropTypes from 'prop-types';

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

useOnClickOutside.propTypes = {
  handler: PropTypes.func.isRequired,
  ref: PropTypes.any.isRequired
};

export default useOnClickOutside;
