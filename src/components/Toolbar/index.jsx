// @flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import type { NavigationHistory } from 'react-router-dom';
import classnames from 'classnames';
import ToolbarMenu from './ToolbarMenu';
import { DropMenu } from '../svg';
import { DASHBOARD } from '../../routes';

type State = {
  isCollapsed: boolean
};

type Props = {
  selected: string,
  history: NavigationHistory
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

  handleRedirectKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      this.handleRedirect();
    }
  };

  handleRedirect = () => {
    const { selected, history } = this.props;
    if (selected === 'proposal') {
      history.push(DASHBOARD);
    } else if (selected === 'dashboard') {
      const proposalId = localStorage.getItem('proposalId') || '';
      history.push(`/app/proposals/${proposalId}`);
    }
  };

  render() {
    const { isCollapsed } = this.state;
    const { selected } = this.props;
    return (
      <div className="toolbar-wrapper">
        <p className="toolbar-title-one">IQVIA™</p>
        <p className="toolbar-title-two">Unity</p>
        <div className="toolbar-navigation-wrapper">
          <div
            className={
              selected === 'dashboard'
                ? 'toolbar-navigation-title selected'
                : 'toolbar-navigation-title'
            }
            role="button"
            onClick={this.handleRedirect}
            onKeyPress={this.handleRedirectKeyPress}
            tabIndex={-1}
          >
            Dashboard
          </div>
          <div
            className={
              selected === 'proposal'
                ? 'toolbar-navigation-title selected'
                : 'toolbar-navigation-title'
            }
            role="button"
            onClick={this.handleRedirect}
            onKeyPress={this.handleRedirectKeyPress}
            tabIndex={-1}
          >
            Proposal
          </div>
        </div>
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

export default withRouter(Toolbar);
