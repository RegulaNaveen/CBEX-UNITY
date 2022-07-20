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
        id='notificationOptions'
        className='notification-settings'
      >
        <div
          style={{
            display: 'grid',
            paddingTop: '6px',
            paddingBottom: '6px'
          }}
        >
          <div
            className='notificationsettingtext'
            style={{ height: '30px', cursor: 'pointer' }}
          >
            <p
              style={{
                fontSize: '14px',
                textAlign: 'left',
                width: '93%',
                paddingLeft: '20px',
                position: 'relative',
                top: '50%',
                transform: 'translateY(-50%)',
                role: 'button',
                type: 'button'
              }}
            >
              View all
            </p>
          </div>
          <div
            className='notificationsettingtext'
            style={{ height: '30px', cursor: 'pointer' }}
          >
            {/* TODO: pass user email for onClick seen update parameter  */}
            <p
              style={{
                textAlign: 'left',
                margin: 0,
                fontSize: '14px',
                paddingLeft: '20px',
                position: 'relative',
                top: '50%',
                transform: 'translateY(-50%)',
                role: 'button',
                type: 'button'
              }}
              onClick={() => setSeenBatch(['01'])}
            >
              Mark all as read
            </p>
          </div>
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
