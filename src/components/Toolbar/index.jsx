// @flow
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import classnames from 'classnames';
import ToolbarMenu from './ToolbarMenu';
import { DropMenu } from '../svg';
import { DASHBOARD, PROPOSAL } from '../../routes';

type State = { isCollapsed: boolean };
type Props = { selected: string };

class Toolbar extends Component<Props, State> {
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
    const proposalId = localStorage.getItem('proposalId') || '';

    const { isCollapsed } = this.state;
    const { selected } = this.props;

    return (
      <div className="toolbar-wrapper">
        <p className="toolbar-title">IQVIA™</p>
        <p className="toolbar-title">Unity</p>
        <div className="toolbar-navigation-wrapper">
          <Link
            to={DASHBOARD}
            className={classnames({ 'is-selected': selected === 'dashboard' })}
          >
            Home
          </Link>

          <Link
            to={`${PROPOSAL}${proposalId}`}
            className={classnames({ 'is-selected': selected === 'proposal' })}
          >
            Proposals
          </Link>
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
