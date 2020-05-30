import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';

const Accordion = ({ title, openByDef, toggle, setType, children }) => {
  const [isOpen, setOpen] = useState(openByDef ? true : false);
  const [count, setCount] = useState(children.length);

  useEffect(() => {
    setCount(children.length);
  }, [children.length]);

  return (
    <Fragment>
      <div
        className={`accordion-title ${isOpen ? 'open' : ''}`}
        onClick={() => setOpen(!isOpen)}
      >
        {title} ({count})
      </div>
      <div className={`accordion-item ${!isOpen ? 'collapsed' : ''}`}>
        {isOpen && children}
        <Fragment>
          {title === 'Tracked' || title === 'Albums' ? (
            <div
              className='card card-add'
              onClick={() => {
                setType(null);
                toggle();
              }}
            >
              +
            </div>
          ) : null}
        </Fragment>
      </div>
    </Fragment>
  );
};

Accordion.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  setType: PropTypes.func
};

export default Accordion;
