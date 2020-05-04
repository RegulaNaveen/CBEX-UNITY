// @flow
import '../styles/App.scss';
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './PrivateRoute';
import { LOGIN, PROPOSALS } from './routes';
import SessionHandler from './SessionHandler';
import Login from './components/auth/Login';
import ProposalComponent from './components/screens/Proposal';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <SessionHandler>
          <Switch>
            <Route path={LOGIN} component={Login} />
            <PrivateRoute>
              <Route path={PROPOSALS} component={ProposalComponent} />
            </PrivateRoute>
            <Redirect to={LOGIN} />
          </Switch>
        </SessionHandler>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
