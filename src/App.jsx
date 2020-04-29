// @flow
import '../styles/App.scss';
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './PrivateRoute';
import { LOGIN, PROPOSALS } from './routes';
import SessionHandler, { getSession } from './SessionHandler';
import Login from './components/auth/Login';
import Proposal from './components/screens/Proposal';

const App = () => {
  const isAuthenticated = getSession();
  return (
    <Provider store={store}>
      <BrowserRouter>
        <SessionHandler>
          <Switch>
            <Route path={LOGIN} component={Login} />
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Route path={PROPOSALS} component={Proposal} />
            </PrivateRoute>
            <Redirect to={LOGIN} />
          </Switch>
        </SessionHandler>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
