// @flow
import React, { Component } from 'react';
// import Loader from 'react-loader-spinner';
import { isEmailValid, isTextValid } from '../../../utils/ValidationUtils';
import { PrimaryButton } from '../../common/Buttons';
import InputField from '../../common/InputField';
import ValidateCode from './ValidateCode';

type Props = {
  handleCancel: Function
};

type State = {
  email: string,
  error: string,
  validateCode: boolean
};

class ForgotPassword extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      email: '',
      error: '',
      validateCode: false
    };
  }

  componentDidMount() {
    this.setState({ email: '', error: '' });
  }

  handleForgotPassword = () => {
    const { email, validateCode } = this.state;
    this.setState({ error: '' });
    if (isTextValid(email)) {
      if (isEmailValid(email)) {
        // send email to endpoint
        this.setState({ validateCode: !validateCode });
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
    const { email, error, validateCode } = this.state;
    const { handleCancel } = this.props;
    return (
      <div className="form-wrapper">
        {validateCode ? (
          <ValidateCode />
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
                  id="send-email-button"
                  onClick={this.handleForgotPassword}
                >
                  Send email
                </PrimaryButton>
              </div>
              {/* )} */}
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
          </div>
        )}
      </div>
    );
  }
}

export default ForgotPassword;
