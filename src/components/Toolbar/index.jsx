// @flow
import React, { Component } from 'react';
import classnames from 'classnames';
import { DropMenu, User, Help, Settings } from '../svg';

type State = {
  isCollapsed: boolean
};

type Props = {};

class Toolbar extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      isCollapsed: true
    };
  }

  handleCollapse = () => {
    const { isCollapsed } = this.state;
    this.setState({ isCollapsed: !isCollapsed });
  };

  handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      this.handleCollapse();
    }
  };

  render() {
    const { isCollapsed } = this.state;
    return (
      <div className="toolbar-wrapper">
        <p className="toolbar-title-one">IQVIA™</p>
        <p className="toolbar-title-two">Unity</p>
        <div className="toolbar-navigation-wrapper">
          <p className="toolbar-navigation-title selected">Proposals</p>
        </div>
        <div className="toolbar-account-spacer">
          <div className="toolbar-account-wrapper">
            <div
              className={classnames(
                'toolbar-account-info',
                isCollapsed && 'expanded'
              )}
              role="button"
              onClick={this.handleCollapse}
              onKeyPress={this.handleKeyPress}
              type="button"
              tabIndex={-1}
            >
              <p className="toolbar-account-info-title">Oliver Queen</p>
              <DropMenu className="toolbar-account-info-icon" />
            </div>
            {isCollapsed ? (
              <div className="toolbar-account-menu">
                <p className="toolbar-account-menu-name">Oliver Queen</p>
                <p className="toolbar-account-menu-email">
                  oliver.queen@iqvia.com
                </p>
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
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Toolbar;
