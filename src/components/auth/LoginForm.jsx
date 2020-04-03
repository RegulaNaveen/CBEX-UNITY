// @flow
import React from 'react';
import Checkbox from '../common/checkbox';
import { PrimaryButton, LinkButton } from '../common/Button';

const LoginForm = () => {
  return (
    <div className='login-form-wrapper'>
      <p className='living-proposal-title'>IQVIA Living Proposal</p>
      <form className='login-input-wrapper'>
        <div>
          <label htmlFor='email' className='login-label-input'>
            Email
            <br />
            <input
              className='input-login'
              placeholder='Email'
              type='text'
              id='email'
              name='email'
            />
            <br />
          </label>
        </div>
        <div className='password-input-wrapper'>
          <label htmlFor='password' className='login-label-input'>
            Password
            <br />
            <input
              className='input-login'
              placeholder='Password'
              type='password'
              id='password'
              name='password'
            />
            <br />
          </label>
        </div>
      </form>
      <Checkbox />
      <div className='login-button-wrapper'>
        <div className='login-button'>
          <PrimaryButton />
        </div>
        <div className='forgot-password-link'>
          <LinkButton />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
