import Grid from 'apollo-react/components/Grid';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import ProfileLayout from '../ProfileLayout';
import Search from 'apollo-react/components/Search';
import { connect } from 'react-redux';
import Typography from 'apollo-react/components/Typography';
import DrawerOptions from '../../../views/Notification/DrawerOptions';
import Cog from 'apollo-react-icons/Cog';
import { getUnreadNotifications } from '../../../../redux/selectors';
import ListItem from '../../../views/Notification/ListItem';
import NoNotification from '../../../views/Notification/NoNotification';
import { Card } from '@material-ui/core';
import MatomoHOC from '../../../HOC/MatomoHOC';
import * as notificationActions from '../../../../redux/actions/notification-actions';
import './Recent.css';

const RecentActivity = ({ unreadNotifications, setNotifications, oppNo }) => {
  const [isDrawer, setIsDrawer] = useState(false);
  const [isDrawerOptions, setIsDrawerOptions] = useState(false);

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
  return (
    <ProfileLayout>
      <Grid
        container
        item
        // md={12}
        // sm={12}
        // xs={12}
        // style={{ paddingTop: '1.2em', margin: '0', position: 'fixed' }}
        spacing={2}
      >
        <div className="recent-search-field">
          <Search placeholder="Search recent notifications" fullWidth />
        </div>
        <Card
          interactive
          className="recent-card"
          style={{ overflowY: 'scroll' }}
        >
          <Grid
            item
            xs={6}
            style={{ marginTop: '15px' }}
            className="recent-header"
          >
            Notifications
          </Grid>
          <Grid
            item
            xs={6}
            className="recent-cog-header"
            onClick={toggleIsDrawerOptions}
            style={{ marginTop: '12px' }}
          >
            <Cog />
            <DrawerOptions
              isShow={isDrawerOptions}
              closeIsDrawerOptions={closeIsDrawerOptions}
            />
          </Grid>
          <div className="recent-content">
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
              <div className="recent-no-notification">
                <NoNotification />
              </div>
            )}
          </div>
        </Card>
      </Grid>
    </ProfileLayout>
  );
};
const mapStateToProps = (state: Map) => ({
  unreadNotifications: getUnreadNotifications(state)
});

const mapDispatchToProps = {
  setNotifications: notificationActions.setNotification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatomoHOC(RecentActivity));
