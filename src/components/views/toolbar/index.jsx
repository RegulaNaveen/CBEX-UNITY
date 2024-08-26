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
import { DASHBOARD, OPPORTUNITYS, UBUILD, UBUILD_V2 } from '../../../routes';
import { isUserUbuildAdmin } from '../../../utils/utils';
import {
  getUserName,
  getUserRole,
  getUserAcknowledged
} from '../../../SessionHandler';
import { getRolesInfo } from '../../../redux/actions/proposal-actions';
import {
  onSetUserRole,
  onSetUserAcknowledge
} from '../../../redux/actions/sso-auth-actions';
import { getRoles } from '../../../redux/selectors';
import WelcomeModal from '../modals/WelcomeModal';
import AnalyticsHOC from '../../HOC/AnalyticsHOC';
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
      roleName: '',
      acknowledged: undefined
    };
  }

  componentDidMount() {
    const { rolesList, getRolesInfoF } = this.props;
    window.addEventListener('mousedown', this.handleClickOutside);
    const userRole = getUserRole();
    const userAcknowledged = getUserAcknowledged();
    if (!rolesList) getRolesInfoF();
    if (userRole) this.setState({ roleName: userRole });
    if (userAcknowledged) this.setState({ acknowledged: userAcknowledged });
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
    this.trackRoleChange(value);
  };

  onUserAcknowledged = () => {
    const { acknowledgeUser } = this.props;
    acknowledgeUser();
    this.setState({ acknowledged: true });
  };

  isRoleInUbuild = (
    uBuildRoles: Array<string> = [],
    currentUserRole: string
  ): boolean => {
    if (uBuildRoles.length === 0) return true;
    return uBuildRoles.includes(currentUserRole);
  };

  trackRoleChange = (role: string) => {
    const { userActions, eventCategories, trackEvent } = this.props;
    trackEvent({
      category: eventCategories.tb,
      action: `ToolBar: ${userActions.changed} User Role to ${role}`
    });
  };

  render() {
    const { isCollapsed, roleName, acknowledged } = this.state;
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
            <Link to={DASHBOARD}>
              <p className="toolbar-title">IQVIA™</p>
              <p className="toolbar-title">Unity</p>
            </Link>
            {results && (
              <>
                <div
                  onClick={() => window.location.replace('/ubuild/v2')}
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
                {/* <div
                  onClick={() => window.location.replace('/ubuild/v2')}
                  aria-hidden="true"
                  style={{ cursor: 'pointer' }}
                  className={
                    (this.props && location && location?.pathname).startsWith(
                      UBUILD_V2
                    )
                      ? 'ubuild-linkactive'
                      : 'ubuild-link'
                  }
                > */}
                {/* <div className="toolbar-space">
                    <p className="ubuild-title">U-Build v2</p>
                  </div> */}
                {/* <Link to={UBUILD} replace  className='toolbar-space'>
                    <p className='ubuild-title'>U-Build</p>
                  </Link> */}
                {/* </div> */}
              </>
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
          !this.isRoleInUbuild(rolesList || [], roleName) ||
          !acknowledged ||
          acknowledged === 'undefined') && (
          <WelcomeModal
            id="welcomemodal"
            roles={rolesList || []}
            roleName={roleName || ''}
            onRoleChange={e => this.onRoleChange(e)}
            onUserAcknowledged={this.onUserAcknowledged}
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
    changeUserRole: onSetUserRole,
    acknowledgeUser: onSetUserAcknowledge
  })
)(AnalyticsHOC(Toolbar));
