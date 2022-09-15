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
import moment from 'moment';
import Divider from '@material-ui/core/Divider';
import ListItem from '../../../views/Notification/ListItem';
import NoNotification from '../../../views/Notification/NoNotification';
import MatomoHOC from '../../../HOC/MatomoHOC';
import * as notificationActions from '../../../../redux/actions/notification-actions';

import NotificationList from './NotificationList';
import { isEmpty, set, orderBy } from 'lodash';
const RecentActivity = ({ unreadNotifications, setNotifications }) => {
  const allNotifications = useSelector(getAllNotifications);
  const [isDrawerOptions, setIsDrawerOptions] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [notificationList, setNotificationList] = useState([]);
  const mydate = moment();
  console.log('date', mydate.format());
  console.log({ getAllNotifications });

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
    let notifications = allNotifications;
    if (searchKey.trim()) {
      notifications = allNotifications.filter(item =>
        item.body.toLowerCase().includes(searchKey.trim().toLowerCase())
      );
    }
    setNotificationList(allNotifications);
  }, [allNotifications]);

  useEffect(() => {
    if (isEmpty(searchKey.trim())) {
      setNotificationList(allNotifications);
      return () => {};
    }
    console.log(searchKey);

    const notifications = allNotifications.filter(item =>
      item.body.toLowerCase().includes(searchKey.trim().toLowerCase())
    );
    console.log('filtered notification ', notifications);
    setNotificationList(notifications);
  }, [searchKey]);

  /**
   * Sorted Notification
   */
  const sortedAllNotification = useMemo(
    () =>
      orderBy(
        notificationList,
        [item => new Date(item.updated_date)],
        ['desc']
      ),
    [notificationList]
  );

  return (
    <ProfileLayout>
      <Grid
        container
        item
        md={12}
        sm={12}
        xs={12}
        style={{ padding: '0 2em 0 1em', margin: '0' }}
      >
        <Grid item md={12} sm={12} xs={12} className="recent-search-field">
          <Search
            placeholder="Search recent notifications"
            fullwidth
            onChange={e => setSearchKey(e.target.value)}
            className="recent-search-input"
          />
        </Grid>
        <Grid item md={12} sm={12} xs={12} style={{ paddingTop: '0.5em' }}>
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
                      marginLeft: '-1em'
                    }}
                  >
                    <td style={{ textAlign: 'left', paddingLeft: '0.5em' }}>
                      <Typography
                        className="recent-header"
                        variant="h1"
                        gutterBottom
                        style={{
                          fontWeight: 600,
                          lineHeight: '32px',
                          fontSize: '20px'
                        }}
                      >
                        Notifications
                      </Typography>
                    </td>
                  </th>
                  <th
                    style={{
                      flexGrow: '0',
                      marginRight: '1em'
                    }}
                  >
                    <Typography
                      className="recent-header"
                      variant="caption"
                      gutterBottom
                      onClick={toggleIsDrawerOptions}
                      style={{
                        color: '#595959',
                        height: '16px',
                        width: '16px',
                        cursor: 'pointer'
                      }}
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
                {!isEmpty(sortedAllNotification) ? (
                  sortedAllNotification.map(item => {
                    return (
                      <tr
                        style={{
                          // overflowY: 'auto',
                          display: 'block',
                          marginTop: '0.5em',
                          marginLeft: '0.5em'
                        }}
                      >
                        <td
                          style={{
                            display: 'block',
                            textAlign: 'left'
                            // paddingLeft: '1em'
                          }}
                        >
                          <NotificationList
                            key={item.id}
                            id={item.id}
                            url={item.url}
                            oppNo={item.opportunity_no}
                            data={item.body}
                            isSeen={item.read}
                            createdAt={item.updated_date}
                          />
                          <Divider
                            variant="inset"
                            style={{
                              marginLeft: '23px',
                              marginTop: '2em',
                              height: '1px',
                              width: '941px',
                              marginRight: '23px',
                              backgroundColor: '#F6F7FB'
                            }}
                          />
                        </td>
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
