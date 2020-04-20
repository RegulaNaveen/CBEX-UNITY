// @flow
import '../styles/App.scss';
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { LOGIN, PROPOSALS, ADD_NEW_QUESTION } from './routes';
import Login from './components/auth/Login';
import Proposal from './components/screens/Proposal';
import AddQuestionModal from './components/screens/Proposal/AddQuestionModal';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={LOGIN} component={Login} />
        <PrivateRoute isAuthenticated>
          <Route path={PROPOSALS} component={Proposal} />
          <Route path={ADD_NEW_QUESTION} component={AddQuestionModal} />
        </PrivateRoute>
        <Redirect to={LOGIN} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
