import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BottomNav = ({ clearCurrent }) => {
  console.log(clearCurrent);
  return (
    <div className='bottom-nav'>
      <div className='button-container'>
        <div className='box box-1' onClick={() => window.scrollTo(0, 0)}>
          <FontAwesomeIcon icon='long-arrow-alt-up' size='2x' />
        </div>
        <div
          className={'box box-2' + (!clearCurrent ? ' box-disabled' : '')}
          onClick={() => clearCurrent && clearCurrent()}
        >
          <FontAwesomeIcon icon='long-arrow-alt-left' size='2x' />
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
