// @flow
import React, { PureComponent } from 'react';
import type { NavigationHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import Loader from 'react-loader-spinner';
import Button from 'apollo-react/components/Button';
import PencilIcon from 'apollo-react-icons/Pencil';
import GlobeIcon from 'apollo-react-icons/Globe';
import { LOGIN } from '../../../routes';
import { getRoles, isRolesInfoLoading } from '../../../redux/selectors';
import { getRolesInfo } from '../../../redux/actions/proposal-actions';
import { logout } from '../../../redux/actions/auth-actions';
import { onSetUserRole } from '../../../redux/actions/sso-auth-actions';
import Dropdown from '../../common/atoms/inputs/Dropdown';
import {
  getUserEmail,
  getUserName,
  getUserRole
} from '../../../SessionHandler';
import { ReportIssue } from '../../svg';
import MatomoHOC from '../../HOC/MatomoHOC';

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
    this.trackMatomoRoleChange(value)
  };

  trackMatomoLinkClicks = (link: string) =>{
    const {
      userActions,
      eventCategories,
      trackEvent
    } = this.props;
    trackEvent({
      category: eventCategories.tb,
      action: `ToolBar: ${userActions.click} On ${link} Link`
    });
  }

  trackMatomoRoleChange = (role: string) =>{
    const {
      userActions,
      eventCategories,
      trackEvent
    } = this.props;
    trackEvent({
      category: eventCategories.tb,
      action: `ToolBar: ${userActions.changed} User Role to ${role}`
    });
  }

  render() {
    const { roleName } = this.state;
    const { rolesList, isRolesLoading } = this.props;
    const name = getUserName();
    const email = getUserEmail();

    return (
      <div className="toolbar-account-menu">
        <p className="toolbar-account-menu-name">{name}</p>
        <p className="toolbar-account-menu-email">{email}</p>
        <div className="toolbar-account-menu-separator" />
        <div className="toolbar-account-menu-option">
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
        </div>
        <div className="menu-links">
            <Button
            target="_blank"
            variant="text"
            icon={<PencilIcon />}
            className="menu-link-btn"
            href="https://suggestionboard.ideas.aha.io/ideas?project=CBEXU"
            onClick={() => this.trackMatomoLinkClicks('Suggestion Board')}
          >
            Suggestion Board
          </Button>
          <Button
            target="_blank"
            variant="text"
            icon={<GlobeIcon />}
            className="menu-link-btn"
            href="https://quintiles.sharepoint.com/sites/ltc/CBEx/SitePages/Unity-Wiki.aspx"
            onClick={() => this.trackMatomoLinkClicks('Unity Wiki')}
          >
            Unity Wiki
          </Button>
          <Button
            target="_blank"
            variant="text"
            icon={
              <ReportIssue className="MuiSvgIcon-root IconComponent-icon-5" />
            }
            className="menu-link-btn"
            href="https://quintiles.service-now.com/via?id=sc_cat_item&sys_id=dd5c819fdb8fdc107cf37e77f4961917"
            onClick={() => this.trackMatomoLinkClicks('Report an Issue')}
          >
            Report an Issue
          </Button>
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
  })(MatomoHOC(ToolbarMenuComponent))
);
