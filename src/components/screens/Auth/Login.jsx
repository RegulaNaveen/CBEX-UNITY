// @flow
import React from 'react';
import Loader from 'react-loader-spinner';
import classNames from 'classnames';
import { Microsoft } from '../../svg';
import img from '../../../../img/login-background.png';
import { API } from '../../../constants';

const { COGNITO_HOST, REDIRECTION_URL, CLIENT_ID } = API.AUTH;

const Login = () => {
  function handleAmplifyLogin() {
    window.location.assign(
      `${COGNITO_HOST}/oauth2/authorize?identity_provider=AzureAD&redirect_uri=${REDIRECTION_URL}&response_type=CODE&client_id=${CLIENT_ID}&scope=aws.cognito.signin.user.admin email openid phone profile`
    );
  }

  const getIsAuthInProgress = !!localStorage.getItem('isAuthInProgress');

  return (
    <div className="sso-login-wrapper">
      <div className="left">
        <div className="gradient-background-img" />
        <img
          className="login-background-img"
          src={img}
          alt="Login background"
          role="presentation"
        />
      </div>
      <div className="right">
        <div className="login-form">
          <p className="form-title">IQVIA Unity</p>
          <button
            type="button"
            className={classNames('azure-login-button', {
              'is-loading': getIsAuthInProgress
            })}
            disabled={getIsAuthInProgress}
            onClick={handleAmplifyLogin}
          >
            {getIsAuthInProgress ? (
              <Loader type="TailSpin" color="#FFFFFF" height={20} width={20} />
            ) : (
              <>
                <Microsoft width={20} height={20} />
                Log in with SSO
              </>
            )}
          </button>
        </div>
        <p className="copyright-text">Copyright @ 2020. All rights reserved</p>
      </div>
    </div>
  );
};

export default Login;
