import React from 'react';
import Bell from 'apollo-react-icons/Bell';
import { useHistory } from 'react-router-dom';
import { RECENT_ACTIVITY } from '../../../routes';

const NoNotification = () => {
  const history = useHistory();
  const redirectViewAll = () => {
    history.push(RECENT_ACTIVITY);
  };
  return (
    <div className="no-notification">
      <Bell
        className="no-notification-bell"
        style={{ color: '#595959', fontSize: 'xx-large' }}
      />
      <p>No new notifications</p>
      <br />
      <div className="no-notification-viewAll">
        <p
          onClick={() => {
            redirectViewAll();
          }}
        >
          View All Notifications
        </p>
      </div>
    </div>
  );
};
export default NoNotification;
