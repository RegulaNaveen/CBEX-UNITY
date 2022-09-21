import React from 'react';
import Bell from 'apollo-react-icons/Bell';

const RecentNoNotification = ({ resetSearch, notificationCount }) => {
  return (
    <div className="no-notification">
      <Bell
        className="no-notification-bell"
        style={{ color: '#595959', fontSize: 'xx-large' }}
      />

      {notificationCount > 0 ? (
        <div>
          {' '}
          <p>No matching notifications</p>
          <br></br>
          <div className="no-notification-viewAll">
            <p
              onClick={() => {
                resetSearch('');
              }}
            >
              View All Notifications
            </p>
          </div>
        </div>
      ) : (
        <p>No notifications</p>
      )}
    </div>
  );
};
export default RecentNoNotification;
