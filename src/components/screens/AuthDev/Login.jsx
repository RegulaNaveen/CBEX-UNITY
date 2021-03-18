// @flow
import React from 'react';
import LoginForm from './LoginForm';
import img from '../../../../img/login-background.png';

const Login = () => {
  return (
    <div className="login-wrapper">
      <div className="image-wrapper">
        <div className="gradient-background-img" />
        <img
          className="login-img"
          src={img}
          alt="Login background"
          role="presentation"
        />
      </div>
      <div className="login-form">
        <div className="form-wrapper">
          <LoginForm />
          <p className="copyright-text">
            Copyright @ 2020. All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
