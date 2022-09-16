// @flow
import React from 'react';
import type { ElementType } from 'react';
import { Route, Redirect } from 'react-router-dom';
import type { Match } from 'react-router-dom';

import { withLDProvider } from 'launchdarkly-react-client-sdk';
import { useSelector } from 'react-redux';
import { LOGIN } from './routes';
import { saveRedirectURL } from './utils/StorageUtils';
import { LAUNCH_DARKLY_CLIENT_ID } from './constants/api';
import { getUserEmail, getUserName, getUserRole } from './SessionHandler';

const deviceParser = require('ua-parser-js');

type Props = { component: ElementType, match?: Match };

let name = '';
let email = '';
let role = '';

const PrivateRoute = ({ component: Component, ...rest }: Props) => {
  const deviceInfo = deviceParser(window.navigator.userAgent);

  name = useSelector(getUserName);
  email = useSelector(getUserEmail);
  role = useSelector(getUserRole);
  function renderRoute(props: any) {
    const {
      history: {
        location: { pathname, search }
      }
    } = props;
    const isAuthenticated = !!localStorage.getItem('access_token');
    if (isAuthenticated) {
      const WithLDProviderComponent = withLDProvider({
        clientSideID: LAUNCH_DARKLY_CLIENT_ID,
        user: {
          key: email,
          name,
          email,
          custom: {
            role,
            osName: deviceInfo?.os?.name,
            osVersion: deviceInfo?.os?.version,
            browserName: deviceInfo?.browser?.name,
            browserVersion: deviceInfo?.browser?.version
          }
        }
      })(Component);
      return <WithLDProviderComponent {...props} />;
    }

    if (!isAuthenticated) {
      saveRedirectURL(pathname + search);
    }
    return <Redirect to={LOGIN} />;
  }

  return <Route {...rest} render={renderRoute} />;
};

PrivateRoute.defaultProps = {
  match: undefined
};

export default PrivateRoute;
