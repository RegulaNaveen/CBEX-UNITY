// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import Loader from 'react-loader-spinner';
import {
  getForgotPasswordData,
  isForgotPasswordLoading,
  getForgotPasswordError
} from '../../../selectors';
import { sendForgotPassword } from '../../../actions/auth-actions';
import { isEmailValid, isTextValid } from '../../../utils/ValidationUtils';
import { PrimaryButton } from '../../common/Buttons';
import InputField from '../../common/InputField';
import ChangePassword from './ChangePassword';

type Props = {
  handleCancel: Function,
  isLoading: Boolean,
  forgotPasswordSuccess: Map,
  forgotPasswordError: string,
  doForgotPassword: Function
};

type State = {
  email: string,
  error: string,
  isChangePassword: boolean
};

class ForgotPassword extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      email: '',
      error: '',
      isChangePassword: false
    };
  }

  componentDidMount() {
    this.setState({ email: '', error: '' });
  }

  componentDidUpdate(prevProps) {
    const { isLoading, forgotPasswordSuccess } = this.props;
    if (
      isLoading === false &&
      prevProps.isLoading === true &&
      forgotPasswordSuccess
    ) {
      this.updateForm();
    }
  }

  updateForm = () => {
    const { isChangePassword } = this.state;
    this.setState({ isChangePassword: !isChangePassword });
  };

  handleForgotPassword = () => {
    const { email } = this.state;
    const { doForgotPassword } = this.props;
    this.setState({ error: '' });
    if (isTextValid(email)) {
      if (isEmailValid(email)) {
        doForgotPassword(email);
      } else {
        this.setState({ error: 'Invalid email' });
      }
    } else {
      this.setState({ error: 'Please provide an email' });
    }
  };

  onEmailChange = (event: SyntheticInputEvent<EventTarget>) => {
    this.setState({ email: event.target.value });
  };

  render() {
    const { email, error, isChangePassword } = this.state;
    const { handleCancel, isLoading, forgotPasswordError } = this.props;
    // Use forgotPasswordError to show error if any
    console.log('FORGOT---ERRORRENDER', forgotPasswordError);
    return (
      <div className="form-wrapper">
        {isChangePassword ? (
          <ChangePassword userEmail={email} handleShowLogin={handleCancel} />
        ) : (
          <div>
            <p className="form-title">Forgot Password</p>
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
            {error !== '' || forgotPasswordError !== undefined ? (
              <p className="login-form-error">{error || forgotPasswordError}</p>
            ) : null}
            <div className="login-button-wrapper">
              {isLoading ? (
                <div className="login-loader">
                  <Loader
                    type="TailSpin"
                    color="#297DFD"
                    height={50}
                    width={50}
                  />
                </div>
              ) : (
                <div className="login-button">
                  <PrimaryButton
                    id="send-email-button"
                    onClick={this.handleForgotPassword}
                  >
                    Send email
                  </PrimaryButton>
                </div>
              )}
            </div>
            <div className="login-button">
              <PrimaryButton
                id="cancel-button"
                className="secundary-button"
                onClick={handleCancel}
              >
                Cancel
              </PrimaryButton>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: Map) => {
  const isLoading = isForgotPasswordLoading(state);
  const forgotPasswordSuccess = getForgotPasswordData(state);
  const forgotPasswordError = getForgotPasswordError(state);

  return { isLoading, forgotPasswordSuccess, forgotPasswordError };
};

export default connect(mapStateToProps, {
  doForgotPassword: sendForgotPassword
})(ForgotPassword);
