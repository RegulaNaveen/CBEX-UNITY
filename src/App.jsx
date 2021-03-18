// @flow
import React from 'react';
import { MatomoProvider } from '@datapunt/matomo-tracker-react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './PrivateRoute';
import { LOGIN, PROPOSALS, DASHBOARD } from './routes';
import SessionHandler, { getSession } from './SessionHandler';
import Login from './components/screens/AuthDev/Login';
import ProposalComponent from './components/screens/Proposal';
import DashboardComponent from './components/screens/Dashboard';
import matomoInstace from './utils/Matomo';
import '../styles/App.scss';

const App = () => {
  const isAuthenticated = getSession();

  return (
    <Provider store={store}>
      <MatomoProvider value={matomoInstace}>
        <BrowserRouter>
          <SessionHandler>
            <Switch>
              <Route path={LOGIN} component={Login} />

              <PrivateRoute
                path={PROPOSALS}
                isAuthenticated={isAuthenticated}
                component={ProposalComponent}
              />

              <PrivateRoute
                path={DASHBOARD}
                isAuthenticated={isAuthenticated}
                component={DashboardComponent}
              />

              <Redirect to={LOGIN} />
            </Switch>
          </SessionHandler>
        </BrowserRouter>
      </MatomoProvider>
    </Provider>
  );
};

export default App;
