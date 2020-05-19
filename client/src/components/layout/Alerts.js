import React, { useContext, useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
  const { alerts, removeAlert } = useContext(AlertContext);

  return (
    <TransitionGroup className='alert'>
      {alerts.map(alert => (
        <CSSTransition key={alert.id} timeout={500} classNames='alert-item'>
          <div
            key={alert.id}
            className={`alert alert-${alert.type}`}
            onClick={() => removeAlert(alert.id)}
          >
            {alert.msg}
            <p>Click to dismiss...</p>
          </div>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default Alerts;
