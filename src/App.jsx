// @flow
import React from "react";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { LOGIN, PROPOSALS } from "./routes";

const Login = () => <div>Login Page :D</div>;

const Proposals = () => <div>Proposals Page :)</div>;

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <ul>
          <li>
            <Link to={LOGIN}>Public Page</Link>
          </li>
          <li>
            <Link to={PROPOSALS}>Protected Page</Link>
          </li>
        </ul>
        <Switch>
          <Route path={LOGIN} component={Login} />
          <PrivateRoute isAuthenticated={false}>
            <Proposals />
          </PrivateRoute>
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
