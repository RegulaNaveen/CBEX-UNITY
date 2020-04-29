// @flow
import '../styles/App.scss';
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './PrivateRoute';
import { LOGIN, PROPOSALS } from './routes';
import Login from './components/auth/Login';
import Proposal from './components/screens/Proposal';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path={LOGIN} component={Login} />
          <PrivateRoute isAuthenticated>
            <Route exact path={PROPOSALS} component={Proposal} />
          </PrivateRoute>
          <Redirect to={LOGIN} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
