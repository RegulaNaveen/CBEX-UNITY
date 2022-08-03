// @flow
import React from 'react';
import { MatomoProvider } from '@datapunt/matomo-tracker-react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './PrivateRoute';
import { LOGIN, PROPOSALS, DASHBOARD, UBUILD, OPPORTUNITYS } from './routes';
import SessionHandler from './SSOSessionHandler';
import Login from './components/screens/Auth/Login';
import ProposalComponent from './components/screens/Proposal';
import OpportunityComponent from './components/screens/Opportunity';
import DashboardComponent from './components/screens/Dashboard';
import UbuildShellComponent from './components/screens/Ubuild';
import '../styles/App.scss';
import matomoInstace from './utils/Matomo';
import SocketContextProvider from './context/SocketContext';
import ErrorBoundaryComponent from './components/HOC/ErrorBoundary';

const App = () => (
  <Provider store={store}>
    <SocketContextProvider>
      <MatomoProvider value={matomoInstace}>
        <ErrorBoundaryComponent>
          <BrowserRouter>
            <SessionHandler>
              <Switch>
                <Route path="/" exact component={Login} />
                <Route path={LOGIN} component={Login} />
                <PrivateRoute path={DASHBOARD} component={DashboardComponent} />
                <PrivateRoute path={PROPOSALS} component={ProposalComponent} />
                <PrivateRoute
                  path={OPPORTUNITYS}
                  component={OpportunityComponent}
                />
                <PrivateRoute path={UBUILD} component={UbuildShellComponent} />
                <Redirect to={Login} />
              </Switch>
            </SessionHandler>
          </BrowserRouter>
        </ErrorBoundaryComponent>
      </MatomoProvider>
    </SocketContextProvider>
  </Provider>
);

export default App;
