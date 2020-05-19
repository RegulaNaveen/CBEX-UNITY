// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { isAuthLoading } from '../../selectors';
import { login } from '../../actions/auth-actions';
import { isEmailValid, isTextValid } from '../../utils/ValidationUtils';
import { PrimaryButton } from '../common/Buttons';
import InputField from '../common/InputField';
import Checkbox from '../common/Checkbox';

type State = {
  email: string,
  password: string,
  error: string,
  isChecked: boolean
};

type Props = {
  // isLoading: boolean,
  loginUser: Function
};

export class LoginFormImpl extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
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
    const { email, password } = this.state;
    if (isTextValid(email) && isTextValid(password)) {
      if (isEmailValid(email)) {
        const { loginUser } = this.props;
        loginUser(email, password);
      } else {
        this.setState({ error: 'Invalid email' });
      }
    } else {
      this.setState({ error: 'Please provide an email and password' });
    }
  };

  render() {
    const { isChecked, email, password, error } = this.state;
    // TODO: Implement functionality with isLoading redux prop
    // const { isLoading } = this.props;
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
        {error !== '' && <p className="login-form-error">{error}</p>}
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Map) => {
  const isLoading = isAuthLoading(state);

  return { isLoading };
};

export default connect(mapStateToProps, { loginUser: login })(LoginFormImpl);
