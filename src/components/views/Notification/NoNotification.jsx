import React from 'react';
import Bell from 'apollo-react-icons/Bell';

const NoNotification = () => {
  return (
    <div className='no-notification'>
      <Bell
        className='no-notification-bell'
        style={{ color: '#595959', fontSize: 'xx-large' }}
      />
      <p>No new notifications</p>
    </div>
  );
};
export default NoNotification;
