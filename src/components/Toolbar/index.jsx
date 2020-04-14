// @flow
import React, { Component } from 'react';
import { Search, Bell, DropMenu } from '../svg';

type State = {
  isCollapsed: boolean
};

class Toolbar extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      isCollapsed: false
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
          <p className="toolbar-navigation-title">Home</p>
          <p className="toolbar-navigation-title proposals">Proposals</p>
          <p className="toolbar-navigation-title">Q & A</p>
        </div>
        <div className="toolbar-profile-spacer">
          <div className="toolbar-profile-wrapper">
            <Search className="toolbar-profile-search" />
            <Bell className="toolbar-profile-notifications" />
            <div
              className="toolbar-profile-info"
              role="button"
              onClick={this.handleCollapse}
              onKeyPress={this.handleKeyPress}
              type="button"
              tabIndex={-1}
            >
              <p className="toolbar-profile-info-title">Oliver Queen</p>
              <DropMenu className="toolbar-profile-info-icon" />
            </div>
            {isCollapsed ? (
              <div className="toolbar-profile-menu">This is the menu</div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Toolbar;
