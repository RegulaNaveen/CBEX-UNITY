// @flow
import React from 'react';
import LoginForm from './LoginForm';
import img from '../../../img/login-background.png';

const Login = () => (
  <div className="login-wrapper">
    <div className="gradient-background-img" />
    <img
      className="login-background-img"
      src={img}
      alt="Login background"
      role="presentation"
    />
    <div className="login-form">
      <LoginForm />
      <p className="copyright-text">Copyright @ 2020. All rights reserved</p>
    </div>
  </div>
);

export default Login;
