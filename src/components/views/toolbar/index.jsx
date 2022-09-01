// @flow
import React, { useState, Component, createRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Avatar } from '@material-ui/core';
import Search from 'apollo-react-icons/Search';
import Bell from 'apollo-react-icons/Bell';
import ToolbarMenu from './ToolbarMenu';
import { DropMenu } from '../../svg';
import { DASHBOARD, UBUILD } from '../../../routes';
import { UBUILD_ENABLED } from '../../../constants/api';
import { isUserUbuildAdmin } from '../../../utils/utils';
import { getUserName, getUserRole } from '../../../SessionHandler';
import { getRolesInfo } from '../../../redux/actions/proposal-actions';
import { onSetUserRole } from '../../../redux/actions/sso-auth-actions';
import { getRoles } from '../../../redux/selectors';
import WelcomeModal from '../modals/WelcomeModal';
import MatomoHOC from '../../HOC/MatomoHOC';
import Notification from '../Notification/index';
import ArrowDown from 'apollo-react-icons/ArrowDown';
import ArrowUp from 'apollo-react-icons/ArrowUp';

type State = { isCollapsed: boolean };
class Toolbar extends Component<{}, State> {
  wrapperRef: { current: any | HTMLDivElement };

  constructor(props: Object) {
    super(props);
    this.wrapperRef = createRef();

    this.state = {
      isCollapsed: false,
      roleName: ''
    };
  }

  componentDidMount() {
    const { rolesList, getRolesInfoF } = this.props;
    window.addEventListener('mousedown', this.handleClickOutside);
    const userRole = getUserRole();
    if (!rolesList) getRolesInfoF();
    if (userRole) this.setState({ roleName: userRole });
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

  onRoleChange = (value: string) => {
    const { changeUserRole } = this.props;
    changeUserRole(value);
    this.setState({ roleName: value });
    this.trackMatomoRoleChange(value);
  };

  isRoleInUbuild = (
    uBuildRoles: Array<string> = [],
    currentUserRole: string
  ): boolean => {
    if (uBuildRoles.length === 0) return true;
    return uBuildRoles.includes(currentUserRole);
  };

  trackMatomoRoleChange = (role: string) => {
    const { userActions, eventCategories, trackEvent } = this.props;
    trackEvent({
      category: eventCategories.tb,
      action: `ToolBar: ${userActions.changed} User Role to ${role}`
    });
  };

  render() {
    const { isCollapsed, roleName } = this.state;
    const { rolesList } = this.props;
    const results = isUserUbuildAdmin();
    const name = getUserName();
    return (
      <div className='toolbar-wrapper'>
        <Link to={DASHBOARD}>
          <p className='toolbar-title'>IQVIA™</p>
          <p className='toolbar-title'>Unity</p>
        </Link>
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
            <Link to={UBUILD}  className='toolbar-space'>
              <p className='ubuild-title'>U-Build</p>
            </Link>
          </div>
        )}
        <Notification />

        <div className='toolbar-account-spacer' style={{ flex: 0 }}>
          <div ref={this.wrapperRef} className='toolbar-account-wrapper'>
            <div
              className={classnames(
                'toolbar-account-info',
                isCollapsed && 'expanded'
              )}
              id='menu-title'
              role='button'
              onClick={this.handleCollapse}
              onKeyPress={this.handleKeyPress}
              type='button'
              tabIndex={-1}
            >
              <Avatar src='' className='tb-profile-avatar'>
                {name.split(' ')[0].charAt(0) + name.split(' ')[1].charAt(0)}
              </Avatar>
              {isCollapsed ? (
                <ArrowUp style={{ color: '#fff', fontSize: 20 }} />
              ) : (
                <ArrowDown style={{ color: '#fff', fontSize: 20 }} />
              )}
              {/* <DropMenu className="toolbar-account-info-icon" /> */}
            </div>
            {isCollapsed ? (
              <ToolbarMenu
                name='Profile'
                handleCollapse={this.handleCollapse}
              />
            ) : null}
          </div>
        </div>
        {(!roleName ||
          roleName === 'undefined' ||
          !this.isRoleInUbuild(rolesList || [], roleName)) && (
          <WelcomeModal
            id='welcomemodal'
            roles={rolesList || []}
            onRoleChange={e => this.onRoleChange(e)}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: Map) => ({
  rolesList: getRoles(state)
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    getRolesInfoF: getRolesInfo,
    changeUserRole: onSetUserRole
  })
)(MatomoHOC(Toolbar));
