import React from 'react';
import Trash from 'apollo-react-icons/Trash';
import EmailClick from 'apollo-react-icons/EmailClick';
import Button from 'apollo-react/components/Button';

const ActionButtons = () => {
  return (
    <>
      <Button
        variant="text"
        size="small"
        icon={<Trash fontSize="extraSmall" />}
        style={{ marginRight: 10 }}
        className="delete-btn"
      >
        Delete
      </Button>
      <Button
        variant="secondary"
        style={{ marginRight: 10 }}
        className="duplicate-btn"
      >
        Duplicate
      </Button>
      <Button
        variant="primary"
        icon={<EmailClick fontSize="extraSmall" />}
        style={{ marginRight: 10 }}
        className="email-btn"
      >
        Email
      </Button>
    </>
  );
};

export default ActionButtons;
