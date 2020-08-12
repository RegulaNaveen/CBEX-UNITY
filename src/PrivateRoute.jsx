// @flow
import React from 'react';
import type { ElementType } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getSession } from './SessionHandler';
import { LOGIN } from './routes';

type Props = { component: ElementType };

const PrivateRoute = ({ component: Component, ...rest }: Props) => {
  function renderRoute(props) {
    const isAuthenticated = getSession();
    return isAuthenticated ? <Component {...props} /> : <Redirect to={LOGIN} />;
  }

  return <Route {...rest} render={renderRoute} />;
};

export default PrivateRoute;
