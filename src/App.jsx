// @flow
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { LOGIN } from './routes';
import Login from './components/auth/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={LOGIN} component={Login} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
