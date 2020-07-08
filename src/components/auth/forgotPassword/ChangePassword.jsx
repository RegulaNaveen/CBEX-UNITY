// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import Loader from 'react-loader-spinner';
import type { NavigationHistory } from 'react-router-dom';
import {
  getForgotPasswordData,
  getResetPasswordData,
  isResetPasswordLoading,
  getResetPasswordError
} from '../../../selectors';
import { sendResetPassword } from '../../../actions/auth-actions';
import { isTextValid } from '../../../utils/ValidationUtils';
import { PrimaryButton } from '../../common/Buttons';
import InputField from '../../common/InputField';
import { LOGIN } from '../../../routes';

type Props = {
  userEmail: string,
  isLoading: Boolean,
  forgotPasswordSuccess: Map,
  resetPasswordSuccess: Map,
  resetPasswordError: string,
  doResetPassword: Function,
  handleShowLogin: Function
};

type State = {
  password: string,
  confirmPassword: string,
  error: string,
  code: string
};

class ChangePassword extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      password: '',
      confirmPassword: '',
      error: '',
      code: ''
    };
  }

  componentDidMount() {
    this.setState({ password: '', confirmPassword: '', error: '' });
  }

  componentDidUpdate(prevProps) {
    console.log('UDPATE');
    const { isLoading, resetPasswordSuccess } = this.props;
    if (
      isLoading === false &&
      prevProps.isLoading === true &&
      resetPasswordSuccess
    ) {
      console.log('SHOULD REDIRECT');
      this.handleRedirection();
    }
  }

  handleRedirection = () => {
    const { handleShowLogin } = this.props;
    console.log('SHOULD REDIRECT');
    handleShowLogin();
  };

  handleChangePassword = () => {
    const { code, password, confirmPassword } = this.state;
    const { userEmail, doResetPassword } = this.props;
    this.setState({ error: '' });
    if (isTextValid(password) && isTextValid(code)) {
      if (password === confirmPassword) {
        doResetPassword(userEmail, code, password);
      } else {
        this.setState({ error: 'Password do not match' });
      }
    } else {
      this.setState({ error: 'Please enter your code and new password' });
    }
  };

  onCodeChange = (event: SyntheticInputEvent<EventTarget>) => {
    this.setState({ code: event.target.value });
  };

  onPasswordChange = (event: SyntheticInputEvent<EventTarget>) => {
    this.setState({ password: event.target.value });
  };

  onConfirmPasswordChange = (event: SyntheticInputEvent<EventTarget>) => {
    this.setState({ confirmPassword: event.target.value });
  };

  render() {
    const { password, confirmPassword, error, code } = this.state;
    const {
      isLoading,
      resetPasswordSuccess,
      resetPasswordError,
      forgotPasswordSuccess
    } = this.props;
    // Use forgotPasswordSuccess as info message for page
    console.log('RESET---DATARENDER', forgotPasswordSuccess);
    console.log('RESET---DATARENDER', resetPasswordSuccess);
    console.log('RESET---ERRORRENDER', resetPasswordError);
    return (
      <div className="form-wrapper">
        <p className="form-title">Change Password</p>
        <p className="form-message-success">{forgotPasswordSuccess}</p>
        <div className="input-wrapper">
          <InputField
            id="login-input-email"
            title="Code"
            placeholder="Enter code"
            type="Code"
            onChange={this.onCodeChange}
            value={code}
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
        {error !== '' || resetPasswordError !== undefined ? (
          <p className="login-form-error">{error || resetPasswordError}</p>
        ) : null}
        {resetPasswordSuccess !== undefined ? (
          <p className="login-form-success">
            {resetPasswordSuccess.data.authService}
          </p>
        ) : null}
        <div className="login-button-wrapper">
          {/* TODO: Add loader with endpoint response for validate email */}
          {isLoading ? (
            <div className="login-loader">
              <Loader type="TailSpin" color="#297DFD" height={50} width={50} />
            </div>
          ) : (
            <div className="login-button-wrapper">
              <PrimaryButton
                id="change-password-button"
                onClick={this.handleChangePassword}
              >
                Change password
              </PrimaryButton>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Map) => {
  const isLoading = isResetPasswordLoading(state);
  const resetPasswordSuccess = getResetPasswordData(state);
  const forgotPasswordSuccess = getForgotPasswordData(state);
  const resetPasswordError = getResetPasswordError(state);

  return {
    isLoading,
    resetPasswordSuccess,
    resetPasswordError,
    forgotPasswordSuccess
  };
};

export default connect(mapStateToProps, {
  doResetPassword: sendResetPassword
})(ChangePassword);
