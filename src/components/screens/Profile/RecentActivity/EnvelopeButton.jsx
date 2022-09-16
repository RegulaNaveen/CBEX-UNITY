import React from 'react';
import EmailRead from 'apollo-react-icons/EmailRead';
import Email from 'apollo-react-icons/Email';
import Tooltip from 'apollo-react/components/Tooltip';

const EnvelopeButton = ({ isSeen, onClick }) => {
  const read = (
    <Tooltip variant="light" title="read" placement="top">
      <EmailRead className="envelope-icon" onClick={() => onClick()} />
    </Tooltip>
  );
  const unread = (
    <Tooltip variant="light" title="Mark as read" placement="top">
      <Email className="envelope-icon" onClick={() => onClick()} />
    </Tooltip>
  );
  return isSeen ? read : unread;
};

export default EnvelopeButton;
