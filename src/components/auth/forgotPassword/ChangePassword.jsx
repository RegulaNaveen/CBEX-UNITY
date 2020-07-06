// @flow
import React, { Component } from 'react';
// import Loader from 'react-loader-spinner';
import { isTextValid } from '../../../utils/ValidationUtils';
import { PrimaryButton } from '../../common/Buttons';
import InputField from '../../common/InputField';

type Props = {};

type State = {
  password: string,
  confirmPassword: string,
  error: string
};

class ChangePassword extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      password: '',
      confirmPassword: '',
      error: ''
    };
  }

  componentDidMount() {
    this.setState({ password: '', confirmPassword: '', error: '' });
  }

  handleChangePassword = () => {
    const { password, confirmPassword } = this.state;
    this.setState({ error: '' });
    if (isTextValid(password)) {
      if (password === confirmPassword) {
        // send new password to endoint and go to login
      } else {
        this.setState({ error: 'Password do not match' });
      }
    } else {
      this.setState({ error: 'Please enter your new password' });
    }
  };

  onPasswordChange = (event: SyntheticInputEvent<EventTarget>) => {
    this.setState({ password: event.target.value });
  };

  onConfirmPasswordChange = (event: SyntheticInputEvent<EventTarget>) => {
    this.setState({ confirmPassword: event.target.value });
  };

  render() {
    const { password, confirmPassword, error } = this.state;
    return (
      <div className="form-wrapper">
        <p className="form-title">Change Password</p>
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
        <div className="input-wrapper">
          <InputField
            id="login-input-password"
            title="Confirm Password"
            placeholder="Confirm Password"
            type="Password"
            onChange={this.onConfirmPasswordChange}
            value={confirmPassword}
          />
        </div>
        {error !== '' ? <p className="login-form-error">{error}</p> : null}
        <div className="login-button-wrapper">
          {/* TODO: Add loader with endpoint response for validate email */}
          {/* {isLoading ? (
            <div className="login-loader">
              <Loader type="TailSpin" color="#297DFD" height={50} width={50} />
            </div>
          ) : ( */}
          <div className="login-button">
            <PrimaryButton
              id="change-password-button"
              onClick={this.handleChangePassword}
            >
              Change password
            </PrimaryButton>
          </div>
          {/* )} */}
        </div>
      </div>
    );
  }
}

export default ChangePassword;
