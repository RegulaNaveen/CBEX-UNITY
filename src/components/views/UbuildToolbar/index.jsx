/* eslint-disable react/prop-types */
// @flow
import React, { Component, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import Avatar from 'apollo-react/components/Avatar';
import ArrowUp from 'apollo-react-icons/ArrowUp';
import ArrowDown from 'apollo-react-icons/ArrowDown';
import ToolbarMenu from './ToolbarMenu';
import { DASHBOARD, UBUILD, UBUILD_V2 } from '../../../routes';
import { isUserUbuildAdmin } from '../../../utils/utils';
import { getUserName } from '../../../SessionHandler';

type State = { isCollapsed: boolean };

class Toolbar extends Component<{}, State> {
  wrapperRef: { current: any | HTMLDivElement };

  constructor(props) {
    super(props);
    this.wrapperRef = createRef();

    this.state = {
      isCollapsed: false
    };
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleKeyPress = event => {
    if (event.key === 'Enter') this.handleCollapse();
  };

  handleCollapse = () => {
    const { isCollapsed } = this.state;
    this.setState({ isCollapsed: !isCollapsed });
  };

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target))
      this.setState({ isCollapsed: false });
  };

  render() {
    const { isCollapsed } = this.state;
    const { location } = this.props;
    const results = isUserUbuildAdmin();
    const name = getUserName();
    return (
      <div className="toolbar-wrapper">
        <a href={DASHBOARD}>
          <p className="toolbar-title">IQVIA™</p>
          <p className="toolbar-title">Unity</p>
        </a>
        {results && (
          <>
            <div
              className={
                (this.props && location && location?.pathname) === UBUILD
                  ? 'ubuild-linkactive'
                  : 'ubuild-link'
              }
            >
              <a className="toolbar-space" href={UBUILD}>
                <p className="ubuild-title">U-Build</p>
              </a>
            </div>
            <div
              className={
                (this.props && location && location?.pathname) === UBUILD_V2
                  ? 'ubuild-linkactive'
                  : 'ubuild-link'
              }
            >
              <a className="toolbar-space" href={UBUILD_V2}>
                <p className="ubuild-title">U-Build V2</p>
              </a>
            </div>
          </>
        )}
        <div className="toolbar-account-spacer">
          <div ref={this.wrapperRef} className="toolbar-account-wrapper">
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
              <Avatar src="" className="tb-profile-avatar">
                {name.split(' ')[0].charAt(0) + name.split(' ')[1].charAt(0)}
              </Avatar>
              {isCollapsed ? (
                <ArrowUp style={{ color: '#fff', fontSize: 20 }} />
              ) : (
                <ArrowDown style={{ color: '#fff', fontSize: 20 }} />
              )}
            </div>
            {isCollapsed ? (
              <ToolbarMenu
                name="Profile"
                handleCollapse={this.handleCollapse}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Toolbar);
