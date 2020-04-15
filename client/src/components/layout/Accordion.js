import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';

const Accordion = ({ title, children, openByDef, toggle }) => {
  const [isOpen, setOpen] = useState(openByDef ? true : false);
  const [count] = useState(children.length);
  return (
    <Fragment>
      <div
        className={`accordion-title ${isOpen ? 'open' : ''}`}
        onClick={() => setOpen(!isOpen)}
      >
        {title} {count}
      </div>
      <div className={`accordion-item ${!isOpen ? 'collapsed' : ''}`}>
        <Fragment>
          {title === 'Tracked' || title === 'Albums' ? (
            <div className='card' onClick={toggle}>
              Add
            </div>
          ) : null}
        </Fragment>
        {children}
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
