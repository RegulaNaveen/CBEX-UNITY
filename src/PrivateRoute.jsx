// @flow
import React from 'react';
import type { ElementType } from 'react';
import { Route, Redirect } from 'react-router-dom';
import type { Match } from 'react-router-dom';

import { LOGIN } from './routes';
import { saveRedirectURL } from './utils/StorageUtils';

type Props = { component: ElementType, match?: Match };

const PrivateRoute = ({ component: Component, ...rest }: Props) => {
  function renderRoute(props: any) {
    const {
      history: {
        location: { pathname, search }
      }
    } = props;
    const isAuthenticated = !!localStorage.getItem('access_token');
    if (!isAuthenticated) {
      saveRedirectURL(pathname + search);
    }
    return isAuthenticated ? <Component {...props} /> : <Redirect to={LOGIN} />;
  }

  return <Route {...rest} render={renderRoute} />;
};

PrivateRoute.defaultProps = {
  match: undefined
};

export default PrivateRoute;
