// @flow
import React from 'react';
import Checkbox from '../common/checkbox';
import { PrimaryButton, LinkButton } from '../common/Button';

const LoginForm = () => {
  return (
    <div className='login-form-container'>
      <div className='test'>
        <p className='iqvia-living-proposal-title'>IQVIA Living Proposal</p>
      </div>
      <form>
        <div className='input-container'>
          <label htmlFor='email' className='label-input'>
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
        <div className='inputs'>
          <label htmlFor='password' className='label-input'>
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
      <div className='checkbox-container'>
        <Checkbox />
      </div>
      <div className='button-container'>
        <PrimaryButton />
        <LinkButton />
      </div>
    </div>
  );
};

export default LoginForm;
