import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import useOnClickOutside from '../../utils/useOnClickOutside';

const Modal = ({ isShowing, hide, children }) => {
  const ref = useRef();
  useOnClickOutside(ref, hide);

  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className='modal-overlay' />
          <div className='modal-wrapper'>
            <div className='modal' ref={ref}>
              <div className='modal-header'>
                <button
                  type='button'
                  className='modal-close-button'
                  onClick={hide}
                >
                  x
                </button>
              </div>
              {children}
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};

Modal.propTypes = {
  isShowing: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired
};

export default Modal;
