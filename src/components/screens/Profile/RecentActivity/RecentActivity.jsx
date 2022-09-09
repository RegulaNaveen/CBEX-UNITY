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
import Card from 'apollo-react/components/Card';
import MatomoHOC from '../../../HOC/MatomoHOC';
import * as notificationActions from '../../../../redux/actions/notification-actions';
import './recentactivity.css';
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
      <div>
        <div className="recent-search-field">
          <Search placeholder="Search recent notifications" fullwidth />
        </div>
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
                unreadNotifications.map(item => {
                  return (
                    <tr
                      style={{
                        // overflowY: 'auto',
                        display: 'block',
                        marginTop: '0.5em',
                        marginLeft: '0.5em'
                      }}
                    >
                      <ListItem
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
      </div>
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
