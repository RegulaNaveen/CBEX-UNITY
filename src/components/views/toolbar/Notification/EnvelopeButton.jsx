import React from 'react';
import EmailRead from 'apollo-react-icons/EmailRead';
import Email from 'apollo-react-icons/Email';
import Tooltip from 'apollo-react/components/Tooltip';
import './style.css';

const EnvelopeButton = ({ isSeen, onClick }) => {
  const read = <EmailRead className='envelope-icon' />;
  const unread = (
    <Tooltip variant='light' title='Mark as read' placement='top'>
      <Email className='envelope-icon' onClick={() => onClick()} />
    </Tooltip>
  );
  return isSeen ? read : unread;
};

export default EnvelopeButton;
