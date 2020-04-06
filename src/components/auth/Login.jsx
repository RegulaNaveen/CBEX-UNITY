// @flow
import React from 'react';
import LoginForm from './LoginForm';
import img from '../../../img/login-background.png';

const Login = () => {
  return (
    <div className="login-wrapper">
      <div className="gradient-background-img" />
      <div>
        <img
          className="login-background-img"
          src={img}
          alt="Login background"
          role="presentation"
        />
      </div>
      <div className="login-form">
        <LoginForm />
        <p className="copyright-text">Copyright @ 2019. All rights reserved</p>
      </div>
    </div>
  );
};
export default Login;
