// @flow
import React, { PureComponent } from 'react';
import { PrimaryButton, LinkButton } from '../common/Button';
import InputField from '../common/InputField';
import Checkbox from '../common/Checkbox';

type State = {
  email: string,
  password: string,
  checked: boolean
};

class LoginForm extends PureComponent<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      email: '',
      password: '',
      checked: false
    };
  }

  onEmailChange = (text: SyntheticInputEvent<EventTarget>) => {
    this.setState({ email: text.target.value });
  };

  onPasswordChange = (text: SyntheticInputEvent<EventTarget>) => {
    this.setState({ password: text.target.value });
  };

  handleChecked = () => {
    const { checked } = this.state;
    this.setState({ checked: !checked });
  };

  Login = () => {
    // TOOD: Login functionality
  };

  forgotPassword = () => {
    // TOOD: forgot password functionality
  };

  render() {
    const { checked, email, password } = this.state;
    return (
      <div className="form-wrapper">
        <p className="form-title">IQVIA Living Proposal</p>
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
          onChange={this.handleChecked}
          checked={checked}
        >
          Remember my username
        </Checkbox>
        <div className="login-button-wrapper">
          <div className="login-button">
            <PrimaryButton type="submit" onChange={this.Login}>
              Log in
            </PrimaryButton>
          </div>
          <div className="forgot-password-link">
            <LinkButton type="submit" onChange={this.forgotPassword}>
              Forgot your password?
            </LinkButton>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
