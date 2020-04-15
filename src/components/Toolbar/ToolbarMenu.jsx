// @flow
import React from 'react';
import { User, Help, Settings } from '../svg';

type Props = {
  name: string,
  email: string
};

const ToolbarMenu = (props: Props) => {
  const { name, email } = props;
  return (
    <div className="toolbar-account-menu">
      <p className="toolbar-account-menu-name">{name}</p>
      <p className="toolbar-account-menu-email">{email}</p>
      <div className="toolbar-account-menu-separator" />
      <div className="toolbar-account-menu-option">
        <User className="toolbar-account-menu-option-icon" />
        <p className="toolbar-account-menu-option-title">Profile</p>
      </div>
      <div className="toolbar-account-menu-option">
        <Settings className="toolbar-account-menu-option-icon" />
        <p className="toolbar-account-menu-option-title">Settings</p>
      </div>
      <div className="toolbar-account-menu-option">
        <Help className="toolbar-account-menu-option-icon" />
        <p className="toolbar-account-menu-option-title">Help</p>
      </div>
      <div className="toolbar-account-menu-button">Log out</div>
    </div>
  );
};

export default ToolbarMenu;
