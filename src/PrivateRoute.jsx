// @flow
import React from 'react';
import type { ElementType } from 'react';
import { Route, Redirect } from 'react-router-dom';
import type { Match } from 'react-router-dom';

import { LOGIN } from './routes';

type Props = { component: ElementType, match?: Match };

const PrivateRoute = ({ component: Component, ...rest }: Props) => {
  function renderRoute(props) {
    const {
      match: { params }
    } = props;

    const proposalId = params.id || '';
    localStorage.setItem('proposalId', proposalId);

    const isAuthenticated = !!localStorage.getItem('access_token');
    return isAuthenticated ? <Component {...props} /> : <Redirect to={LOGIN} />;
  }

  return <Route {...rest} render={renderRoute} />;
};

PrivateRoute.defaultProps = {
  match: undefined
};

export default PrivateRoute;
