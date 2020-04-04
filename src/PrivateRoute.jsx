// @flow
import React, { PureComponent } from 'react';
import type { Node } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LOGIN } from './routes';

type Props = {
  children: Node,
  isAuthenticated: boolean
};

class PrivateRoute extends PureComponent<Props> {
  renderRoute = () => {
    const { isAuthenticated, children } = this.props;
    return isAuthenticated ? children : <Redirect to={LOGIN} />;
  };

  render() {
    return <Route render={this.renderRoute} />;
  }
}

export default PrivateRoute;
