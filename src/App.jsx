// @flow
import '../styles/App.scss';
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { LOGIN, PROPOSALS } from './routes';
import Login from './components/auth/Login';
import Proposal from './components/screens/Proposal';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={LOGIN} component={Login} />
        <PrivateRoute isAuthenticated>
          <Route path={PROPOSALS} component={Proposal} />
        </PrivateRoute>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
