// @flow
import React, { PureComponent } from "react";
import type { Node } from "react";
import { Route, Redirect } from "react-router-dom";
import { LOGIN } from "./routes";

type Props = {
  children: Node,
  authenticated: boolean,
};

class PrivateRoute extends PureComponent<Props> {
  renderRoute = () => {
    const { authenticated, children } = this.props;
    return authenticated ? children : <Redirect to={LOGIN} />;
  };

  render() {
    return <Route render={this.renderRoute} />;
  }
}

export default PrivateRoute;
