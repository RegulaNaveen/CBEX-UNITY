// @flow
import React, { Component, createRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Avatar } from '@mui/material';
import ArrowDown from 'apollo-react-icons/ArrowDown';
import ArrowUp from 'apollo-react-icons/ArrowUp';

import ToolbarMenu from './ToolbarMenu';
import { DASHBOARD, OPPORTUNITYS, UBUILD } from '../../../routes';
import { isUserUbuildAdmin } from '../../../utils/utils';
import { getUserName, getUserRole } from '../../../SessionHandler';
import { getRolesInfo } from '../../../redux/actions/proposal-actions';
import { onSetUserRole } from '../../../redux/actions/sso-auth-actions';
import { getRoles } from '../../../redux/selectors';
import WelcomeModal from '../modals/WelcomeModal';
import MatomoHOC from '../../HOC/MatomoHOC';
import Notification from '../Notification/index';
import Search from '../Search';
import PrivateRoute from '../../../PrivateRoute';

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
    const { rolesList, location, withinErrorBoundary } = this.props;

    const results = isUserUbuildAdmin();
    const name = getUserName();
    return (
      <div className="toolbar-wrapper">
        {withinErrorBoundary ? (
          <div
            onClick={() => window.location.replace('/dashboard')}
            style={{ cursor: 'pointer', display: 'flex' }}
          >
            <p className="toolbar-title">IQVIA™</p>
            <p className="toolbar-title">Unity</p>
          </div>
        ) : (
          <>
            <div
              onClick={() => window.location.replace('/dashboard')}
              style={{ cursor: 'pointer', display: 'flex' }}
            >
              <p className="toolbar-title">IQVIA™</p>
              <p className="toolbar-title">Unity</p>
            </div>
            {results && (
              <div
                onClick={() => window.location.replace('/ubuild')}
                aria-hidden="true"
                style={{ cursor: 'pointer' }}
                className={
                  (this.props && location && location?.pathname) === UBUILD
                    ? 'ubuild-linkactive'
                    : 'ubuild-link'
                }
              >
                <div className="toolbar-space">
                  <p className="ubuild-title">U-Build</p>
                </div>
                {/* <Link to={UBUILD} replace  className='toolbar-space'>
                  <p className='ubuild-title'>U-Build</p>
                </Link> */}
              </div>
            )}
            <div style={{ flexGrow: 1 }}>
              <PrivateRoute path={OPPORTUNITYS} component={Search} />
            </div>
            <div className="toolbar-account-spacer" style={{ flex: 0 }}>
              <Notification />
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
                    {name &&
                      name.split(' ')[0].charAt(0) +
                        name.split(' ')[1].charAt(0)}
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
                    name="Profile"
                    handleCollapse={this.handleCollapse}
                  />
                ) : null}
              </div>
            </div>
          </>
        )}
        {(!roleName ||
          roleName === 'undefined' ||
          !this.isRoleInUbuild(rolesList || [], roleName)) && (
          <WelcomeModal
            id="welcomemodal"
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
