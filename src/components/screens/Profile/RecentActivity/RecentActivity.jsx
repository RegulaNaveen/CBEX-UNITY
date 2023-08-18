import Grid from 'apollo-react/components/Grid';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import Typography from 'apollo-react/components/Typography';
import { connect, useSelector } from 'react-redux';
import Search from 'apollo-react/components/Search';
import Cog from 'apollo-react-icons/Cog';
import Card from 'apollo-react/components/Card';
// eslint-disable-next-line import/no-extraneous-dependencies
import Divider from '@mui/material/Divider';
import { isEmpty, orderBy } from 'lodash';
import PropTypes from 'prop-types';
import ProfileLayout from '../ProfileLayout';

import RecentDrawerOptions from './RecentDrawerOptions';
import Loader from 'apollo-react/components/Loader';
import {
  getAllNotifications,
  getUnreadNotifications
} from '../../../../redux/selectors';
import RecentNoNotification from './RecentNoNotification';
import MatomoHOC from '../../../HOC/MatomoHOC';
import * as notificationActions from '../../../../redux/actions/notification-actions';
import ListItem from '../../../views/Notification/ListItem';

const RecentActivity = ({ setNotifications }) => {
  const allNotifications = useSelector(getAllNotifications);
  const [isDrawerOptions, setIsDrawerOptions] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [notificationList, setNotificationList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [navHeight, setHeight] = useState(window.innerHeight);
  let cardHeight;
  const updateDimensions = () => {
    setHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  const fiftyPerc = navHeight > 1217 && navHeight < 1828;
  const sixtySevPerc = navHeight > 913 && navHeight < 1218;
  const seventyFivePerc = navHeight > 811 && navHeight < 914;
  const eightyPerc = navHeight > 761 && navHeight < 812;
  const ninetyPerc = navHeight > 676 && navHeight < 762;
  const hundredPerc = navHeight > 608 && navHeight < 677;
  if (fiftyPerc) {
    cardHeight = navHeight - (navHeight / 100) * 18;
  } else if (sixtySevPerc) {
    cardHeight = navHeight - (navHeight / 100) * 21;
  } else if (seventyFivePerc) {
    cardHeight = navHeight - (navHeight / 100) * 23;
  } else if (eightyPerc) {
    cardHeight = navHeight - (navHeight / 100) * 25;
  } else if (ninetyPerc) {
    cardHeight = navHeight - (navHeight / 100) * 28;
  } else if (hundredPerc) {
    cardHeight = navHeight - (navHeight / 100) * 30;
  }
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
    if (searchKey.trim()) {
      allNotifications.filter(item =>
        item.body.toLowerCase().includes(searchKey.trim().toLowerCase())
      );
    }
    setNotificationList(allNotifications);
  }, [allNotifications]);

  useEffect(() => {
    if (isEmpty(searchKey.trim())) {
      setNotificationList(allNotifications);
    }

    const notifications = allNotifications.filter(item =>
      item.body.toLowerCase().includes(searchKey.trim().toLowerCase())
    );
    setNotificationList(notifications);
  }, [searchKey]);

  /**
   * Sorted Notification
   */
  const sortedAllNotification = useMemo(
    () =>
      orderBy(
        notificationList,
        [item => new Date(item.created_date)],
        ['desc']
      ),
    [notificationList]
  );

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

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
            value={searchKey}
            onChange={e => setSearchKey(e.target.value)}
            className="recent-search-input"
          />
        </Grid>
        <Grid item md={12} sm={12} xs={12} className="notification-grid-wrp">
          <Card
            interactive
            className="recent-card"
            style={{ height: cardHeight }}
          >
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
                      <RecentDrawerOptions
                        isShow={isDrawerOptions}
                        closeIsDrawerOptions={closeIsDrawerOptions}
                      />
                    </Typography>
                  </th>
                </tr>
              </thead>
              {loading ? <Loader isInner /> : null}
              <tbody
                className="recent-activity-tab"
                style={{ height: cardHeight - 100 }}
              >
                {!isEmpty(sortedAllNotification) ? (
                  sortedAllNotification.map(item => {
                    return (
                      <tr className="notification-tr">
                        <td className="notification-td">
                          <ListItem
                            key={item.id}
                            id={item.id}
                            url={item.url}
                            oppNo={item.opportunity_no}
                            data={item.body}
                            isSeen={item.read}
                            createdAt={item.created_date}
                            jsonBody={item.bodyJson}
                          />
                          <Divider variant="inset" className="divider-wrp" />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <div className="recent-no-notification">
                    <RecentNoNotification
                      resetSearch={setSearchKey}
                      notificationCount={allNotifications.length}
                    />
                  </div>
                )}
              </tbody>
            </table>
          </Card>
        </Grid>
      </Grid>
    </ProfileLayout>
  );
};

RecentActivity.defaultProps = {
  setNotifications: () => {}
};

RecentActivity.propTypes = {
  setNotifications: PropTypes.func
};

const mapStateToProps = state => ({
  unreadNotifications: getUnreadNotifications(state)
});
const mapDispatchToProps = {
  setNotifications: notificationActions.setNotification
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatomoHOC(RecentActivity));
