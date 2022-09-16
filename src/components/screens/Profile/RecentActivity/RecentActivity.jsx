import Grid from 'apollo-react/components/Grid';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Typography from 'apollo-react/components/Typography';
import { connect, useSelector } from 'react-redux';
import Search from 'apollo-react/components/Search';
import Cog from 'apollo-react-icons/Cog';
import Card from 'apollo-react/components/Card';
import { Divider } from '@material-ui/core/Divider';
import ProfileLayout from '../ProfileLayout';
import DrawerOptions from '../../../views/Notification/DrawerOptions';
import {
  getAllNotifications,
  getUnreadNotifications
} from '../../../../redux/selectors';
import moment from 'moment';
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
      <Grid container item md={12} sm={12} xs={12} className="recent-grid">
        <Grid item md={12} sm={12} xs={12} className="recent-search-field">
          <Search
            placeholder="Search recent notifications"
            fullwidth
            onChange={e => setSearchKey(e.target.value)}
            className="recent-search-input"
          />
        </Grid>
        <Grid item md={12} sm={12} xs={12} className="recent-grid-item">
          <Card interactive className="recent-card">
            <table className="table-body">
              <thead>
                <tr className="table-row">
                  <th className="table-head">
                    <td className="table-data">
                      <Typography
                        className="recent-header"
                        variant="h1"
                        gutterBottom
                      >
                        Notifications
                      </Typography>
                    </td>
                  </th>
                  <th className="recent-table-head">
                    <Typography
                      className="recent-cog"
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
                {!isEmpty(sortedAllNotification) ? (
                  sortedAllNotification.map(item => {
                    return (
                      <tr className="recent-table-row">
                        <td className="recent-table-data">
                          <NotificationList
                            key={item.id}
                            id={item.id}
                            url={item.url}
                            oppNo={item.opportunity_no}
                            data={item.body}
                            isSeen={item.read}
                            createdAt={item.updated_date}
                          />
                          <Divider variant="inset" className="recent-divider" />
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
