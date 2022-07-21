import React from 'react';
import { connect } from 'react-redux';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import * as notificationActions from '../../../../redux/actions/notification-actions';

import './style.css';

const DrawerOptions = ({ closeIsDrawerOptions, setSeenBatch }) => {
  return (
    <ClickAwayListener onClickAway={closeIsDrawerOptions}>
      <div
        tabIndex={-1}
        style={{
          position: 'absolute',
          width: '150px',
          border: '0.5px solid #8080803d',
          maxHeight: '100px',
          overflowY: 'auto',
          backgroundColor: 'white',
          right: '0px'
        }}
      >
        <div className='notification-option-item'>
          <p>View all</p>
        </div>
        <div className='notification-option-item'>
          {/* TODO: pass user email for onClick seen update parameter  */}
          <p onClick={() => setSeenBatch(['01'])}>Mark all as read</p>
        </div>
      </div>
    </ClickAwayListener>
  );
};

const mapStateToProps = (state: Map) => ({});

const mapDispatchToProps = {
  setSeenBatch: notificationActions.setSeenBatch
};
export default connect(mapStateToProps, mapDispatchToProps)(DrawerOptions);
