import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import useOnClickOutside from '../../utils/useOnClickOutside';
import { CSSTransition } from 'react-transition-group';

const Modal = ({ isShowing, hide, type, children }) => {
  const headers = {
    delete: 'Delete an artist',
    add: 'Add an artist to the collection',
    addAlbum: 'Add an album to the artist'
  };

  const [animate, setAnimate] = useState(false);
  const [exitFinish, setExitFinish] = useState(true);

  useEffect(() => {
    setAnimate(isShowing);

    if (isShowing) {
      setExitFinish(false);
    }
  }, [isShowing, setAnimate]);

  const ref = useRef();
  useOnClickOutside(ref, hide);

  const header = headers[type];

  return isShowing || !exitFinish
    ? ReactDOM.createPortal(
        <CSSTransition in={animate} timeout={400} classNames='wrapper-anim'>
          <div className='modal-wrapper'>
            <CSSTransition
              in={animate}
              timeout={400}
              onExited={() => setExitFinish(true)}
              classNames='modal-anim'
            >
              <div
                className={`modal ${type === 'delete' ? ' modal-small' : ''}`}
                ref={ref}
              >
                <div className='modal-header'>
                  <h2>{header}</h2>
                  <button type='button' onClick={hide}>
                    x
                  </button>
                </div>
                {children}
              </div>
            </CSSTransition>
          </div>
        </CSSTransition>,
        document.body
      )
    : null;
};

Modal.propTypes = {
  isShowing: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  type: PropTypes.string
};

export default Modal;
