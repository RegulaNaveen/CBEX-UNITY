// @flow
import React, { Component } from 'react';
import type { NavigationHistory } from 'react-router-dom';
import { setSession } from '../../SessionHandler';
import { PROPOSALS } from '../../routes';
import { PrimaryButton, LinkButton } from '../common/Buttons';
import InputField from '../common/InputField';
import Checkbox from '../common/Checkbox';

type State = {
  email: string,
  password: string,
  isChecked: boolean
};

type Props = {
  history: NavigationHistory,
  forceLogin: Function
};

class LoginForm extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isChecked: false
    };
  }

  onEmailChange = (event: SyntheticInputEvent<EventTarget>) => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event: SyntheticInputEvent<EventTarget>) => {
    this.setState({ password: event.target.value });
  };

  handleIsChecked = () => {
    const { isChecked } = this.state;
    this.setState({ isChecked: !isChecked });
  };

  handleLogin = () => {
    // TODO: Login functionality
    // TODO: Remove navigation test code
    setSession();
    const proposalId = localStorage.getItem('proposalId');
    console.log(proposalId);
    const { history } = this.props;
    history.push(`/app/proposals/${proposalId}`);
  };

  handleForgotPassword = () => {
    // TODO: forgot password functionality
  };

  render() {
    const { isChecked, email, password } = this.state;
    return (
      <div className="form-wrapper">
        <p className="form-title">IQVIA Unity</p>
        <div className="input-wrapper">
          <InputField
            id="login-input-email"
            title="Email"
            placeholder="Email"
            type="email"
            onChange={this.onEmailChange}
            value={email}
          />
        </div>
        <div className="input-wrapper">
          <InputField
            id="login-input-password"
            title="Password"
            placeholder="Password"
            type="password"
            onChange={this.onPasswordChange}
            value={password}
          />
        </div>
        <Checkbox
          id="remember-username-checkbox"
          value="username"
          name="username"
          onChange={this.handleIsChecked}
          isChecked={isChecked}
        >
          Remember my username
        </Checkbox>
        <div className="login-button-wrapper">
          <div className="login-button">
            <PrimaryButton id="login-button" onClick={this.handleLogin}>
              Log in
            </PrimaryButton>
          </div>
          <div className="forgot-password-link">
            <LinkButton
              id="forgot-password"
              onClick={this.handleForgotPassword}
            >
              Forgot your password?
            </LinkButton>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
