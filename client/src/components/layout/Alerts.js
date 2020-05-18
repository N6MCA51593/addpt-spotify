import React, { useContext, useEffect, useState } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
  const { alerts } = useContext(AlertContext);
  const [animate, setAnimate] = useState(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setAnimate(false);
    setVisible(true);

    setTimeout(() => {
      setAnimate(true);
    }, 200);

    return () => {
      setAnimate(false);
      setVisible(true);
    };
  }, [alerts, setAnimate, setVisible]);

  return (
    alerts.length > 0 &&
    alerts.map(alert => (
      <div
        key={alert.id}
        className={`alert alert-${alert.type} ${
          animate ? 'alert-animate' : ''
        } ${visible ? '' : 'alert-invis'}`}
        onClick={() => setVisible(false)}
      >
        {alert.msg}
        <p>Click to dismiss...</p>
      </div>
    ))
  );
};

export default Alerts;
