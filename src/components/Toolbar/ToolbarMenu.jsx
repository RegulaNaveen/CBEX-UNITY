// @flow
import React from 'react';
import type { NavigationHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { LOGIN } from '../../routes';
import { User, Help, Settings } from '../svg';

type Props = {
  name: string,
  email: string,
  history: NavigationHistory
};

export const ToolbarMenuComponent = (props: Props) => {
  const { name, email } = props;

  function handleLogout() {
    // TODO: Remove navigation test code
    const { history } = props;
    history.push(LOGIN);
  }

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      handleLogout();
    }
  }

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
      <div
        id="logout-button"
        className="toolbar-account-menu-button"
        onClick={handleLogout}
        onKeyPress={handleKeyPress}
        role="button"
        tabIndex={-1}
      >
        Log out
      </div>
    </div>
  );
};

export default withRouter(ToolbarMenuComponent);
