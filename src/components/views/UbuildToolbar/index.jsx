// @flow
import React, { Component, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import ToolbarMenu from './ToolbarMenu';
import { DropMenu } from '../../svg';
import { DASHBOARD, UBUILD } from '../../../routes';
import { isUserUbuildAdmin } from '../../../utils/utils';

type State = { isCollapsed: boolean };

class Toolbar extends Component<{}, State> {
  wrapperRef: { current: any | HTMLDivElement };

  constructor(props: Object) {
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

  handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') this.handleCollapse();
  };

  handleCollapse = () => {
    const { isCollapsed } = this.state;
    this.setState({ isCollapsed: !isCollapsed });
  };

  handleClickOutside = (event: any) => {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target))
      this.setState({ isCollapsed: false });
  };

  render() {
    const { isCollapsed } = this.state;
    const results = isUserUbuildAdmin();
    return (
      <div className="toolbar-wrapper">
        <a href={DASHBOARD}>
          <p className="toolbar-title">IQVIA™</p>
          <p className="toolbar-title">Unity</p>
        </a>
        {results && (
          <div
            className={
              (this.props &&
                this.props?.location &&
                this.props.location?.pathname) == UBUILD
                ? 'ubuild-linkactive'
                : 'ubuild-link'
            }
          >
            <a className="toolbar-space" href={UBUILD}>
              <p className="ubuild-title">U-Build</p>
            </a>
          </div>
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
              <p className="toolbar-account-info-title">Profile</p>
              <DropMenu className="toolbar-account-info-icon" />
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
