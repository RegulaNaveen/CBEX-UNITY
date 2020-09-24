// @flow
import React, { PureComponent } from 'react';
import type { NavigationHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import Loader from 'react-loader-spinner';
import { LOGIN } from '../../routes';
import { getRoles, getUserData, isRolesInfoLoading } from '../../selectors';
import { getRolesInfo } from '../../actions/proposal-actions';
import { logout, changeRole } from '../../actions/auth-actions';
import Dropdown from '../common/Dropdown';
import { getUserRole } from '../../SessionHandler';

type Props = {
  authData: Object,
  rolesList: Array<string>,
  getRolesInfoF: Function,
  changeUserRole: Function,
  isRolesLoading: boolean,
  history: NavigationHistory,
  logoutUser: Function
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
  };

  render() {
    const { roleName } = this.state;
    const { rolesList, isRolesLoading, authData } = this.props;
    const { name, email } = authData;

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
              items={rolesList}
              onClick={this.onRoleChange}
              value={roleName}
            />
          )}
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
  authData: getUserData(state),
  rolesList: getRoles(state),
  isRolesLoading: isRolesInfoLoading(state)
});

export default withRouter(
  connect(mapStateToProps, {
    getRolesInfoF: getRolesInfo,
    logoutUser: logout,
    changeUserRole: changeRole
  })(ToolbarMenuComponent)
);
