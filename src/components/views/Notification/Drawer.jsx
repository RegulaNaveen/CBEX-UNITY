import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { RECENT_ACTIVITY } from '../../../routes';
import { connect } from 'react-redux';
import Bell from 'apollo-react-icons/Bell';
import Cog from 'apollo-react-icons/Cog';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Typography from 'apollo-react/components/Typography';
import classnames from 'classnames';
import MatomoHOC from '../../HOC/MatomoHOC';
import { getUnreadNotifications } from '../../../redux/selectors';
import * as notificationActions from '../../../redux/actions/notification-actions';
import ListItem from './ListItem';
import DrawerOptions from './DrawerOptions';
import NoNotification from './NoNotification';

const Drawer = ({ unreadNotifications, setNotifications }) => {
  const [isDrawer, setIsDrawer] = useState(false);
  const [isDrawerOptions, setIsDrawerOptions] = useState(false);

  const closeDrawer = () => {
    setIsDrawer(false);
    setIsDrawerOptions(false);
  };
  const toggleIsDrawer = () => {
    setIsDrawer(!isDrawer);
    if (isDrawerOptions) {
      setIsDrawerOptions(false);
    }
  };
  const closeIsDrawerOptions = () => {
    setIsDrawerOptions(false);
  };
  const toggleIsDrawerOptions = () => {
    setIsDrawerOptions(!isDrawerOptions);
  };

  useEffect(() => {
    setNotifications();
  }, []);

  const notificationCount = useMemo(
    () => (unreadNotifications ? unreadNotifications.length : 0),
    [unreadNotifications]
  );

  const history = useHistory();
  const redirectAllNotifications = () => {
    history.push(RECENT_ACTIVITY);
  };

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
              <div
                className='toolbar-account-info'
                style={{
                  display: 'flex',
                  justifyContent: notificationCount ? 'start' : 'center'
                }}
              >
                {notificationCount != 0 && (
                  <span className='iconBadge'>{notificationCount}</span>
                )}
                <Bell style={{ color: 'white', cursor: 'pointer' }} />
              </div>
            </div>
          </div>
        </div>
        {isDrawer && (
          <ClickAwayListener onClickAway={closeDrawer}>
            <div tabIndex={-1} id='notificationBar' className='notificationBar'>
              <div className='drawer-header'>
                <Typography variant='h3' gutterBottom>
                  Notifications
                </Typography>
                <div>
                  <Cog
                    className='notification-gear-icon'
                    onClick={toggleIsDrawerOptions}
                  />
                  {/* Drawer Gear Icon options */}
                  <DrawerOptions
                    isShow={isDrawerOptions}
                    closeIsDrawerOptions={closeIsDrawerOptions}
                  />
                </div>
              </div>
              {/* Notification List items */}
              <div className='notification-scrollbar' >
                {notificationCount > 0 ? (
                  unreadNotifications.map(item => {
                    return (
                      <ListItem
                        key={item.id}
                        id={item.id}
                        url={item.url}
                        oppNo={item.opportunity_no}
                        data={item.body}
                        isSeen={item.read}
                        createdAt={item.created_date}
                      />
                    );
                  })
                ) : (
                  <NoNotification />
                )}
                {/* View All Notifications Button*/}
                {/* <div>
                <Typography variant='body2' className='view-all-notifications'>
                  View All Notifications
                </Typography>
              </div> */}
              {notificationCount > 0 && (
                <p className='view-All-notifications'
                  onClick={() => {redirectAllNotifications()}}>View All Notifications</p>
              )}
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
