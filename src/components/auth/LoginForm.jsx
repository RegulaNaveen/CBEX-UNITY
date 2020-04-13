// @flow
import React, { Component } from 'react';
import type { NavigationHistory } from 'react-router-dom';
import { PROPOSALS } from '../../routes';
import { PrimaryButton, LinkButton } from '../common/Buttons';
import InputField from '../common/InputField';
import Checkbox from '../common/Checkbox';
import ModalProposal from '../ModalProposal';

type State = {
  email: string,
  password: string,
  checked: boolean,
  showModal: boolean
};

type Props = {
  history: NavigationHistory
};

class LoginForm extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      email: '',
      password: '',
      checked: false,
      showModal: false
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction);
  }

  escFunction = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.handleLogin();
    }
  };

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

  handleLogin = () => {
    // TODO: Login functionality
    // CODE TO TEST MODAL
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
    // TODO: Remove navigation test code
    const { history } = this.props;
    history.push(PROPOSALS);
  };

  handleForgotPassword = () => {
    // TODO: forgot password functionality
  };

  render() {
    const { checked, email, password, showModal } = this.state;
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
          onChange={this.handleChecked}
          checked={checked}
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
        <ModalProposal showModal={showModal} />
      </div>
    );
  }
}

export default LoginForm;
