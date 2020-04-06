// @flow
import React, { PureComponent } from 'react';
import { PrimaryButton, LinkButton } from '../common/Button';
import InputField from '../common/InputField';
import Checkbox from '../common/Checkbox';

type Props = {
  onEmailChange: Function,
  onPasswordChange: Function
};

class LoginForm extends PureComponent<Props> {
  // TODO: Uncommet when react-router PR is merged
  // onEmailChange = (text: string) => {
  // };

  // onPasswordChange = (text: string) => {
  // };

  render() {
    return (
      <div className='form-wrapper'>
        <p className='form-title'>IQVIA Living Proposal</p>
        <div className='input-wrapper'>
          <InputField
            id='login-input-email'
            title='Email'
            placeholder='Email'
            type='email'
            //onChange={this.onEmailChange}
          />
        </div>
        <div className='input-wrapper'>
          <InputField
            id='login-input-password'
            title='Password'
            placeholder='Password'
            type='password'
            //onChange={this.onPasswordChange}
          />
        </div>
        <Checkbox
          id='remember-username-checkbox'
          value='username'
          name='username'
          checked
        >
          Remember my username
        </Checkbox>
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
  }
}

export default LoginForm;
