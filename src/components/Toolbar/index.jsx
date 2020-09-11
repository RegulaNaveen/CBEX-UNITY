// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import ToolbarMenu from './ToolbarMenu';
import { DropMenu } from '../svg';
import { DASHBOARD } from '../../routes';

type State = { isCollapsed: boolean };

class Toolbar extends Component<{}, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      isCollapsed: false
    };
  }

  handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') this.handleCollapse();
  };

  handleCollapse = () => {
    const { isCollapsed } = this.state;
    this.setState({ isCollapsed: !isCollapsed });
  };

  render() {
    const { isCollapsed } = this.state;

    return (
      <div className="toolbar-wrapper">
        <Link to={DASHBOARD}>
          <p className="toolbar-title">IQVIA™</p>
          <p className="toolbar-title">Unity</p>
        </Link>
        <div className="toolbar-account-spacer">
          <div className="toolbar-account-wrapper">
            <div
              className={classnames(
                'toolbar-account-info',
                isCollapsed && 'expanded'
              )}
              id="menu-title"
              role="button"
              onClick={this.handleCollapse}
              onKeyPress={this.handleKeyPress}
              type="button"
              tabIndex={-1}
            >
              <p className="toolbar-account-info-title">Profile</p>
              <DropMenu className="toolbar-account-info-icon" />
            </div>
            {isCollapsed ? <ToolbarMenu name="Profile" /> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Toolbar;
