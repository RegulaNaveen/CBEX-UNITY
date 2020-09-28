// @flow
import React from 'react';
import { MatomoProvider } from '@datapunt/matomo-tracker-react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './PrivateRoute';
import { LOGIN, PROPOSALS, DASHBOARD } from './routes';
import SessionHandler from './SSOSessionHandler';
import Login from './components/screens/Auth/Login';
import ProposalComponent from './components/screens/Proposal';
import DashboardComponent from './components/screens/Dashboard';
import '../styles/App.scss';
import matomoInstace from './utils/Matomo';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <SessionHandler>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path={LOGIN} component={Login} />
          <PrivateRoute path={DASHBOARD} component={DashboardComponent} />
          <PrivateRoute path={PROPOSALS} component={ProposalComponent} />
          <Redirect to={Login} />
        </Switch>
      </SessionHandler>
    </BrowserRouter>
  </Provider>
);

export default App;
