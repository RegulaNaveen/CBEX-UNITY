import Grid from 'apollo-react/components/Grid';
import React, { useState, useEffect, useMemo } from 'react';
import Typography from 'apollo-react/components/Typography';
import { connect, useSelector } from 'react-redux';
import Search from 'apollo-react/components/Search';
import Cog from 'apollo-react-icons/Cog';
import Card from 'apollo-react/components/Card';
import moment from 'moment';
// eslint-disable-next-line import/no-extraneous-dependencies
import Divider from '@material-ui/core/Divider';
import { isEmpty, orderBy } from 'lodash';
import ProfileLayout from '../ProfileLayout';
import DrawerOptions from '../../../views/Notification/DrawerOptions';
import {
  getAllNotifications,
  getUnreadNotifications
} from '../../../../redux/selectors';

import NoNotification from '../../../views/Notification/NoNotification';
import MatomoHOC from '../../../HOC/MatomoHOC';
import * as notificationActions from '../../../../redux/actions/notification-actions';

import NotificationList from './NotificationList';

const RecentActivity = ({ setNotifications }) => {
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
        className="notification-container-wrp recent-activity-wrapper"
      >
        <Grid item md={12} sm={12} xs={12} className="recent-search-field">
          <Search
            placeholder="Search recent notifications"
            fullwidth
            onChange={e => setSearchKey(e.target.value)}
            className="recent-search-input"
          />
        </Grid>
        <Grid item md={12} sm={12} xs={12} className="notification-grid-wrp">
          <Card interactive className="recent-card">
            <table className="notification-table-wrp">
              <thead>
                <tr className="notification-header-tr">
                  <th className="notification-th-one">
                    <td className="notification-label-td">
                      <Typography
                        className="recent-header notification-label"
                        variant="h1"
                        gutterBottom
                      >
                        Notifications
                      </Typography>
                    </td>
                  </th>
                  <th className="notification-th-two">
                    <Typography
                      className="recent-header setting-icon"
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
                      <tr className="notification-tr">
                        <td className="notification-td">
                          <NotificationList
                            key={item.id}
                            id={item.id}
                            url={item.url}
                            oppNo={item.opportunity_no}
                            data={item.body}
                            isSeen={item.read}
                            createdAt={item.updated_date}
                          />
                          <Divider variant="inset" className="divider-wrp" />
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
