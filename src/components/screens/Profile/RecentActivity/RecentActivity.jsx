import Grid from 'apollo-react/components/Grid';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Typography from 'apollo-react/components/Typography';
import { connect, useSelector } from 'react-redux';
import Search from 'apollo-react/components/Search';
import Cog from 'apollo-react-icons/Cog';
import Card from 'apollo-react/components/Card';
import ProfileLayout from '../ProfileLayout';
import DrawerOptions from '../../../views/Notification/DrawerOptions';
import {
  getAllNotifications,
  getUnreadNotifications
} from '../../../../redux/selectors';
import ListItem from '../../../views/Notification/ListItem';
import NoNotification from '../../../views/Notification/NoNotification';
import MatomoHOC from '../../../HOC/MatomoHOC';
import * as notificationActions from '../../../../redux/actions/notification-actions';

import NotificationList from './NotificationList';
import { isEmpty, set } from 'lodash';
const RecentActivity = ({ unreadNotifications, setNotifications, oppNo }) => {
  const [isDrawer, setIsDrawer] = useState(false);
  const [isDrawerOptions, setIsDrawerOptions] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const allNotifications = useSelector(getAllNotifications);
  const [notificationList, setNotificationList] = useState([]);
  const closeIsDrawerOptions = () => {
    setIsDrawerOptions(false);
  };
  const toggleIsDrawerOptions = () => {
    setIsDrawerOptions(!isDrawerOptions);
  };
  useEffect(() => {
    setNotifications();
  }, []);

  useEffect(() => {
    setNotificationList(allNotifications);
  }, [allNotifications]);

  useEffect(() => {
    if (isEmpty(searchKey)) setNotificationList(allNotifications);
    console.log(searchKey);

    const notifications = allNotifications.filter(item =>
      item.body.toLowerCase().includes(searchKey.trim().toLowerCase())
    );
    console.log('filtered notification ', notifications);
    setNotificationList(notifications);
  }, [searchKey]);

  const notificationCount = useMemo(
    () => (unreadNotifications ? unreadNotifications.length : 0),
    [unreadNotifications]
  );
  console.log('all notification ', allNotifications);

  const handleSearch = e => {
    setSearchKey(e.target.value);
  };
  return (
    <ProfileLayout>
      <Grid
        container
        item
        md={12}
        sm={12}
        xs={12}
        style={{ padding: '0 1em 0 1em', margin: '0' }}
      >
        <Grid item md={12} sm={12} xs={12} className="recent-search-field">
          <Search
            placeholder="Search recent notifications"
            fullwidth
            onChange={handleSearch}
            className="recent-search-input"
          />
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <Card interactive className="recent-card">
            <table style={{ display: 'flex', flexDirection: 'column' }}>
              <thead>
                <tr
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '1em',
                    paddingLeft: '36px'
                  }}
                >
                  <th
                    style={{
                      alignSelf: 'flex-start',

                      fontWeight: 'bold'
                    }}
                  >
                    <Typography
                      className="card-label"
                      variant="title1"
                      gutterBottom
                    >
                      Notification
                    </Typography>
                  </th>
                  <th
                    style={{
                      flexGrow: '0',
                      marginRight: '1em'
                    }}
                  >
                    <Typography
                      className="card-label"
                      variant="caption"
                      gutterBottom
                      onClick={toggleIsDrawerOptions}
                    >
                      <Cog />
                      <DrawerOptions
                        isShow={isDrawerOptions}
                        closeIsDrawerOptions={closeIsDrawerOptions}
                      />
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody className="recent-activity-tab">
                {notificationCount > 0 ? (
                  notificationList.map(item => {
                    return (
                      <tr
                        style={{
                          // overflowY: 'auto',
                          display: 'block',
                          marginTop: '0.5em',
                          marginLeft: '0.5em'
                        }}
                      >
                        <NotificationList
                          key={item.id}
                          id={item.id}
                          url={item.url}
                          oppNo={item.opportunity_no}
                          data={item.body}
                          isSeen={item.read}
                          createdAt={item.created_date}
                        />
                      </tr>
                    );
                  })
                ) : (
                  <div className="recent-no-notification">
                    <NoNotification />
                  </div>
                )}
                {/* </tr> */}
              </tbody>
            </table>
          </Card>
        </Grid>
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
