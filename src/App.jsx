// @flow
import React from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { LOGIN, PROPOSALS } from './routes';
import Login from './components/auth/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* TODO: Add Login Component */}
        <Route path={LOGIN} component={Login} />
        <PrivateRoute isAuthenticated={false}>
          {/* TODO: Add here Proposals component */}
        </PrivateRoute>
        <Redirect to='/' />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
