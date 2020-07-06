// @flow
import React, { Component } from 'react';
// import Loader from 'react-loader-spinner';
import { isTextValid } from '../../../utils/ValidationUtils';
import { PrimaryButton } from '../../common/Buttons';
import InputField from '../../common/InputField';
import ChangePassword from './ChangePassword';

type Props = {};

type State = {
  code: string,
  error: string,
  isValideCode: boolean
};

class ValidateCode extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      code: '',
      error: '',
      isValideCode: false
    };
  }

  componentDidMount() {
    this.setState({ code: '', error: '' });
  }

  handleForgotPassword = () => {
    const { code, isValideCode } = this.state;
    this.setState({ error: '' });
    if (isTextValid(code)) {
      // send code to endoint and validate
      this.setState({ isValideCode: !isValideCode });
    } else {
      this.setState({ error: 'Please provide a code' });
    }
  };

  onCodeChange = (event: SyntheticInputEvent<EventTarget>) => {
    this.setState({ code: event.target.value });
  };

  render() {
    const { code, error, isValideCode } = this.state;
    return (
      <div className="form-wrapper">
        {isValideCode ? (
          <ChangePassword />
        ) : (
          <div>
            <p className="form-title">Validate Code</p>
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
                  Validate Code
                </PrimaryButton>
              </div>
              {/* )} */}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ValidateCode;
