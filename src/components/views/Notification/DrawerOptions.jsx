import React from 'react';
import { connect } from 'react-redux';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { useHistory } from 'react-router-dom';
import { RECENT_ACTIVITY } from '../../../routes';
import * as notificationActions from '../../../redux/actions/notification-actions';

const DrawerOptions = ({ isShow, closeIsDrawerOptions, setSeenBatch }) => {
  const history = useHistory();
  const redirectRecent = () => {
  history.push(RECENT_ACTIVITY);
  };
  
  return isShow ? (
    <div>
      <ClickAwayListener onClickAway={closeIsDrawerOptions}>
        <div tabIndex={-1} className='notification-drawer-option-container'>
          {/* <div className='notification-option-item'>
            <p>View all</p>
          </div> */}
           <div className='notification-option-item'>
            <p onClick={() => {redirectRecent()}}>View all</p>
          </div>
          <div className='notification-option-item'>
            {/* TODO: pass user email for onClick seen update parameter  */}
            <p onClick={() => setSeenBatch(['01'])}>Mark all as read</p>
          </div>
        </div>
      </ClickAwayListener>
    </div>
  ) : null;
};

const mapStateToProps = (state: Map) => ({});

const mapDispatchToProps = {
  setSeenBatch: notificationActions.setSeenBatch
};
export default connect(mapStateToProps, mapDispatchToProps)(DrawerOptions);
