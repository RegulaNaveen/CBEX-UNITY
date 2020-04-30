// @flow
import React from 'react';
import type { NavigationHistory } from 'react-router-dom';
import LoginForm from './LoginForm';
import img from '../../../img/login-background.png';

type Props = {
  history: NavigationHistory,
  forceLogin: Function
};

const Login = ({ history, forceLogin }: Props) => {
  return (
    <div className="login-wrapper">
      <div className="gradient-background-img" />
      <img
        className="login-background-img"
        src={img}
        alt="Login background"
        role="presentation"
      />
      <div className="login-form">
        <LoginForm history={history} forceLogin={forceLogin} />
        <p className="copyright-text">Copyright @ 2019. All rights reserved</p>
      </div>
    </div>
  );
};
export default Login;
