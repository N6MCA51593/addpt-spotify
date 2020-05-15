import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';

const Accordion = ({ title, children, openByDef, toggle }) => {
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
        {children}
        <Fragment>
          {title === 'Tracked' || title === 'Albums' ? (
            <div className='card card-add' onClick={toggle}>
              +
            </div>
          ) : null}
        </Fragment>
      </div>
    </Fragment>
  );
};

Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func
};

export default Accordion;
