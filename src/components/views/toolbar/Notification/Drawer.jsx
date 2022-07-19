import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Bell from 'apollo-react-icons/Bell';
import StatusDotSolid from 'apollo-react-icons/StatusDotSolid';
import Email from 'apollo-react-icons/Email';
import Cog from 'apollo-react-icons/Cog';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import classnames from 'classnames';
import EmailRead from 'apollo-react-icons/EmailRead';
import Tooltip from 'apollo-react/components/Tooltip';

import MatomoHOC from '../../../HOC/MatomoHOC';
import { getUnreadNotifications } from '../../../../redux/selectors';
import * as notificationActions from '../../../../redux/actions/notification-actions';
import './style.css';

const Drawer = ({ unreadNotifications }) => {
  const [isDrawer, setIsDrawer] = useState(false);
  const [isDrawerOptions, setIsDrawerOptions] = useState(false);

  const closeDrawer = () => {
    setIsDrawer(false);
  };
  const toggleIsDrawer = () => {
    setIsDrawer(!isDrawer);
  };
  const closeIsDrawerOptions = () => {
    setIsDrawerOptions(false);
  };
  const toggleIsDrawerOptions = () => {
    setIsDrawerOptions(!isDrawerOptions);
  };

  // const wrapperRef = useRef();
  return (
    <>
      <div className='toolbar-account-notification'>
        <div
          className={classnames('notification', isDrawer && 'expanded')}
          style={{ position: 'relative', cursor: 'pointer' }}
          onClick={toggleIsDrawer}
        >
          <div className='iconSection'>
            <div className='toolbar-account-wrapper'>
              <div className='toolbar-account-info' style={{ flex: '0' }}>
                <span className='iconBadge'>{1}</span>
                <Bell style={{ color: 'white', cursor: 'pointer' }} />
              </div>
            </div>
          </div>
        </div>
        {isDrawer && (
          <ClickAwayListener onClickAway={closeDrawer}>
            <div
              style={{
                position: 'absolute',
                width: '410px',
                border: '0.5px solid #8080803d',
                minHeight: '100px',
                overflowY: 'auto',
                top: '57px'
              }}
              tabIndex={-1}
              id='notificationBar'
              className='notificationBar'
            >
              <div style={{ display: 'flex' }}>
                <p
                  style={{
                    fontSize: '14px',
                    textAlign: 'left',
                    width: '93%',
                    padding: '14px'
                  }}
                >
                  <b>Notifications</b>
                </p>
                <Cog
                  style={{
                    color: 'gray',
                    marginLeft: 'auto',
                    alignSelf: 'center',
                    height: '15px',
                    cursor: 'pointer'
                  }}
                  onClick={toggleIsDrawerOptions}
                />
                {/* Drawer Gear Icon options */}
                {isDrawerOptions && (
                  <ClickAwayListener onClickAway={closeIsDrawerOptions}>
                    <div
                      tabIndex={-1}
                      style={{
                        position: 'absolute',
                        width: '150px',
                        border: '0.5px solid #8080803d',
                        minHeight: '100px',
                        overflowY: 'auto',
                        backgroundColor: 'white',
                        right: '0px'
                      }}
                      id='notificationOptions'
                      className='notification-settings'
                    >
                      <div style={{ display: 'grid', paddingTop: '10px' }}>
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
                          >
                            Mark all as read
                          </p>
                        </div>
                      </div>
                    </div>
                  </ClickAwayListener>
                )}
              </div>
              {/* Notification List items */}
              {unreadNotifications.map(item => {
                // TODO
                // Render the actual List item
                console.log({ unreadNotificationItem: item });
              })}
              {/* View All Notifications Button*/}
              <div>
                <p
                  className='viewallnotific'
                  style={{
                    textAlign: 'center',
                    margin: 0,
                    color: '#2b7efd',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  View All Notifications
                </p>
              </div>
            </div>
          </ClickAwayListener>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state: Map) => ({
  unreadNotifications: getUnreadNotifications(state)
});

const mapDispatchToProps = {
  setNotifications: notificationActions.setNotification
};
export default connect(mapStateToProps, mapDispatchToProps)(MatomoHOC(Drawer));
