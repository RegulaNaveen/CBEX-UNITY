// @flow
import React, { PureComponent } from 'react';
import type { Node } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getSession } from './SessionHandler';
import { LOGIN } from './routes';

type Props = {
  children: Node
};

class PrivateRoute extends PureComponent<Props> {
  renderRoute = () => {
    const isAuthenticated = getSession();
    const { children } = this.props;
    return isAuthenticated ? children : <Redirect to={LOGIN} />;
  };

  render() {
    return <Route render={this.renderRoute} />;
  }
}

export default PrivateRoute;
