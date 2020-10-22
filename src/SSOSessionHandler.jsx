// @flow
import { Component } from 'react';
import type { Node } from 'react';
import { withRouter } from 'react-router-dom';
import type { History, Match, Location } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { loginUser, onRefreshUserData } from './actions/sso-auth-actions';
import { PROPOSAL, DASHBOARD, LOGIN } from './routes';
import { getUserAuthStatus } from './selectors';
import { validateToken } from './api/sso-auth';
import { API } from './constants';

const { COGNITO_HOST, REDIRECTION_URL, CLIENT_ID } = API.AUTH;

type Props = {
  children: Node,
  history: History,
  location: Location,
  match: Match,
  isAuthenticated: boolean,
  refreshUserData: () => {},
  onLoginUser: (code: string) => void
};

class SessionHandler extends Component<Props, {}> {
  componentDidMount() {
    const idToken = localStorage.getItem('id_token');

    if (idToken) this.validateUserToken(idToken);

    this.startAuthentication();
  }

  componentDidUpdate(prevProps: Object) {
    const idToken = localStorage.getItem('id_token');
    const { isAuthenticated, location } = this.props;
    const { location: prevLocation } = prevProps;

    if (prevProps.isAuthenticated !== isAuthenticated) {
      if (isAuthenticated) this.userIsLoggedIn();
      else this.userIsNotLoggedIn();
    }

    if (prevLocation.pathname !== location.pathname && idToken)
      this.validateUserToken(idToken);
  }

  validateUserToken = async (idToken: string) => {
    const { location } = this.props;

    const validToken = await validateToken(idToken);

    if (validToken) this.userIsLoggedIn();
    else if (location.pathname !== LOGIN && location.pathname !== '/') {
      localStorage.clear();
      this.userIsNotLoggedIn();
    }
  };

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
