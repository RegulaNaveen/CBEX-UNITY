// @flow
import { Component } from 'react';
import type { Node } from 'react';
import { withRouter } from 'react-router-dom';
import type { History } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { loginUser, onRefreshUserData } from './actions/sso-auth-actions';
import { PROPOSAL, DASHBOARD } from './routes';
import { getUserAuthStatus } from './selectors';

import { API } from './constants';

const { COGNITO_HOST, REDIRECTION_URL, CLIENT_ID } = API.AUTH;

type Props = {
  children: Node,
  history: History,
  isAuthenticated: boolean,
  refreshUserData: () => {},
  onLoginUser: (code: string) => void
};

class SessionHandler extends Component<Props, {}> {
  componentDidMount() {
    const isAuthenticated = !!localStorage.getItem('access_token');

    if (isAuthenticated) this.userIsLoggedIn();
    else this.startAuthentication();
  }

  componentDidUpdate(prevProps: Object) {
    const { isAuthenticated } = this.props;

    if (prevProps.isAuthenticated !== isAuthenticated) {
      if (isAuthenticated) this.userIsLoggedIn();
      else this.userIsNotLoggedIn();
    }
  }

  startAuthentication = () => {
    const { onLoginUser } = this.props;

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) onLoginUser(code);
  };

  userIsLoggedIn = () => {
    const { history, refreshUserData } = this.props;

    refreshUserData();

    const proposalId = localStorage.getItem('proposalId');
    history.push(`${proposalId ? `${PROPOSAL}${proposalId}` : DASHBOARD}`);
  };

  userIsNotLoggedIn = () => {
    window.location.assign(
      `${COGNITO_HOST}/logout?client_id=${CLIENT_ID}&logout_uri=${REDIRECTION_URL}`
    );
  };

  render() {
    const { children } = this.props;
    return children;
  }
}

const mapStateToProps = (state: Map) => ({
  isAuthenticated: getUserAuthStatus(state)
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    onLoginUser: loginUser,
    refreshUserData: onRefreshUserData
  })
)(SessionHandler);
