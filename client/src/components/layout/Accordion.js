import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';

const Accordion = ({ title, children, openByDef }) => {
  const [isOpen, setOpen] = useState(openByDef ? true : false);
  return (
    <Fragment>
      <div
        className={`accordion-title ${isOpen ? 'open' : ''}`}
        onClick={() => setOpen(!isOpen)}
      >
        {title}
      </div>
      <div className={`accordion-item ${!isOpen ? 'collapsed' : ''}`}>
        {children}
      </div>
    </Fragment>
  );
};

Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool
};

export default Accordion;
