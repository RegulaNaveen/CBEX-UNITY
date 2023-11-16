// @flow
import React, { PureComponent } from 'react';
import type { NavigationHistory } from 'react-router-dom';
import Button from 'apollo-react/components/Button';
import User from 'apollo-react-icons/User';
import Grid from 'apollo-react/components/Grid';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Map } from 'immutable'; // NOSONAR
import { LOGIN, PROFILE } from '../../../routes';
import { getRoles, isRolesInfoLoading } from '../../../redux/selectors';
import { getRolesInfo } from '../../../redux/actions/proposal-actions';
import { logout } from '../../../redux/actions/auth-actions';
import { onSetUserRole } from '../../../redux/actions/sso-auth-actions';
import {
  getUserEmail,
  getUserName,
  getUserRole
} from '../../../SessionHandler';
import { Pencil, Globe, ReportIssue } from '../../svg';
import AnalyticsHOC from '../../HOC/AnalyticsHOC';

type Props = {
  rolesList: Array<string>,
  getRolesInfoF: Function,
  changeUserRole: Function,
  isRolesLoading: boolean,
  history: NavigationHistory,
  logoutUser: Function,
  eventCategories: any,
  userActions: any,
  trackEvent: any
};

type State = {
  roleName: string
};

export class ToolbarMenuComponent extends PureComponent<Props, State> {
  constructor(props: Object) {
    super(props);
    this.state = {
      roleName: ''
    };
  }

  componentDidMount() {
    const { getRolesInfoF, rolesList } = this.props;
    const userRole = getUserRole();
    if (!rolesList) getRolesInfoF();
    if (userRole) this.setState({ roleName: userRole });
  }

  handleLogout = () => {
    const { history, logoutUser } = this.props;
    logoutUser();

    history.push(LOGIN);
  };

  handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') this.handleLogout();
  };

  onRoleChange = (value: string) => {
    const { changeUserRole } = this.props;
    changeUserRole(value);

    this.setState({ roleName: value });
    this.trackRoleChange(value);
  };

  trackLinkClicks = (link: string) => {
    const { userActions, eventCategories, trackEvent } = this.props;
    trackEvent({
      category: eventCategories.tb,
      action: `ToolBar: ${userActions.click} On ${link} Link`
    });
  };

  trackRoleChange = (role: string) => {
    const { userActions, eventCategories, trackEvent } = this.props;
    trackEvent({
      category: eventCategories.tb,
      action: `ToolBar: ${userActions.changed} User Role to ${role}`
    });
  };

  render() {
    const { roleName } = this.state;
    const { rolesList, isRolesLoading } = this.props;
    const name = getUserName();
    const email = getUserEmail();

    return (
      <div className="toolbar-account-menu">
        <Grid container style={{ padding: '10px' }}>
          {/* <Grid item>
            <Avatar alt="avatar" src="">
              {name.split(' ')[0].charAt(0) + name.split(' ')[1].charAt(0)}
            </Avatar>
          </Grid> */}
          <Grid item>
            <p
              className="toolbar-account-menu-name"
              style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {name}
            </p>
            <p
              className="toolbar-account-menu-email"
              style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {email}
            </p>
          </Grid>
        </Grid>

        <div className="toolbar-account-menu-separator" />
        {/* <div className="toolbar-account-menu-option">
          {isRolesLoading ? (
            <div className="toolbar-account-menu-option-loader">
              <Loader type="TailSpin" color="#297DFD" height={35} width={35} />
            </div>
          ) : (
            <Dropdown
              id="dd-team-member"
              title="User Role"
              placeholder="Select"
              items={rolesList ? rolesList.sort() : []}
              onClick={this.onRoleChange}
              value={roleName}
            />
          )}
        </div> */}
        <div className="menu-links">
          <Button
            // target='_blank'
            variant="text"
            icon={<User />}
            className="menu-link-btn"
            fullwidth
            onClick={() => this.props.history.push(PROFILE)}
            style={{ width: '100%' }}
          >
            Go to Profile
          </Button>

          <a
            className="MuiButtonBase-root MuiButton-root MuiButton-text menu-link-btn MuiButton-textPrimary"
            tabIndex="0"
            aria-disabled="false"
            target="_blank"
            rel="noreferrer"
            href="https://suggestionboard.ideas.aha.io/ideas?project=CBEXU"
          >
            <span className="MuiButton-label">
              <Pencil className="MuiSvgIcon-root menu-btn-link__icon" />
              Suggestion Board
            </span>
            <span className="MuiTouchRipple-root" />
          </a>
          <a
            className="MuiButtonBase-root MuiButton-root MuiButton-text menu-link-btn MuiButton-textPrimary"
            tabIndex="0"
            aria-disabled="false"
            target="_blank"
            rel="noreferrer"
            href="https://quintiles.sharepoint.com/sites/ltc/CBEx/SitePages/Unity-Wiki.aspx"
          >
            <span className="MuiButton-label">
              <Globe className="MuiSvgIcon-root menu-btn-link__icon" />
              Unity Wiki
            </span>
            <span className="MuiTouchRipple-root" />
          </a>
          <a
            className="MuiButtonBase-root MuiButton-root MuiButton-text menu-link-btn MuiButton-textPrimary"
            tabIndex="0"
            aria-disabled="false"
            target="_blank"
            rel="noreferrer"
            href="https://quintiles.service-now.com/via?id=sc_cat_item&amp;sys_id=dd5c819fdb8fdc107cf37e77f4961917"
          >
            <span className="MuiButton-label">
              <ReportIssue className="MuiSvgIcon-root menu-btn-link__icon" />
              Report an Issue
            </span>
            <span className="MuiTouchRipple-root" />
          </a>
        </div>
        <div
          id="logout-button"
          className="toolbar-account-menu-button"
          onClick={this.handleLogout}
          onKeyPress={this.handleKeyPress}
          role="button"
          tabIndex={-1}
        >
          Log out
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Map) => ({
  rolesList: getRoles(state),
  isRolesLoading: isRolesInfoLoading(state)
});

export default withRouter(
  connect(mapStateToProps, {
    getRolesInfoF: getRolesInfo,
    logoutUser: logout,
    changeUserRole: onSetUserRole
  })(AnalyticsHOC(ToolbarMenuComponent))
);
