// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import Loader from 'react-loader-spinner';
import classNames from 'classnames';
import {
  getForgotPasswordData,
  getResetPasswordData,
  isResetPasswordLoading,
  getResetPasswordError,
} from '../../../../redux/selectors';
import { sendResetPassword } from '../../../../redux/actions/auth-actions';
import InputField from '../../../common/atoms/inputs/InputField';

type Props = {
  userEmail: string,
  isLoading: Boolean,
  forgotPasswordSuccess: Map,
  resetPasswordSuccess: Map,
  resetPasswordError: string,
  doResetPassword: Function,
  handleShowLogin: Function,
};

type State = {
  password: string,
  confirmPassword: string,
  error: string,
  code: string,
};

class ChangePassword extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      password: '',
      confirmPassword: '',
      error: '',
      code: '',
    };
  }

  componentDidUpdate(prevProps) {
    const { isLoading, resetPasswordSuccess } = this.props;
    const { isLoading: prevIsLoading } = prevProps;

    if (!isLoading && prevIsLoading && resetPasswordSuccess) {
      this.handleRedirection();
    }
  }

  handleRedirection = () => {
    const { handleShowLogin } = this.props;
    handleShowLogin();
  };

  onInputChange = ({ target }: SyntheticInputEvent<EventTarget>) => {
    const { id, value } = target;
    this.setState({ [id]: value });
  };

  onFormSubmit = (event: SyntheticEvent<EventTarget>) => {
    event.preventDefault();

    this.setState({ error: '' });

    const { userEmail, doResetPassword } = this.props;
    const { code, password, confirmPassword } = this.state;

    const validateInputs = (): string => {
      if (!code || !password) return 'Please enter your code and new password.';
      if (password !== confirmPassword) return 'Password do not match.';
      return '';
    };

    const error = validateInputs();

    if (!error) {
      doResetPassword(userEmail, code, password);
      this.setState({ code: '', password: '', confirmPassword: '' });
    } else this.setState({ error });
  };

  render() {
    const { password, confirmPassword, error, code } = this.state;
    const {
      isLoading,
      resetPasswordSuccess,
      resetPasswordError,
      forgotPasswordSuccess,
    } = this.props;

    const renderLoader = () => {
      if (isLoading)
        return <Loader type="TailSpin" color="#297DFD" width={30} />;

      return (
        <input
          type="submit"
          className="primary-button"
          value="Change password"
        />
      );
    };

    return (
      <form onSubmit={this.onFormSubmit}>
        <p className="form-title">Change Password</p>
        <p
          className={classNames('form-message-success', {
            'is-displayed': forgotPasswordSuccess,
          })}
        >
          {forgotPasswordSuccess}
        </p>
        <InputField
          id="code"
          label="Code"
          placeholder="Enter code"
          type="Code"
          onChange={this.onInputChange}
          value={code}
        />
        <InputField
          id="password"
          title="Password must have more than 8 characters"
          label="Password"
          placeholder="Password"
          type="password"
          onChange={this.onInputChange}
          value={password}
        />
        <InputField
          id="confirmPassword"
          title="Confirm Password"
          label="Confirm Password"
          placeholder="Confirm Password"
          type="Password"
          onChange={this.onInputChange}
          value={confirmPassword}
        />

        <div className="login-loader-button-wrapper">{renderLoader()}</div>

        <p
          className={classNames('login-form-error', {
            'is-displayed': error || resetPasswordError,
          })}
        >
          {error || resetPasswordError}
        </p>

        {resetPasswordSuccess !== undefined ? (
          <p className="login-form-success">
            {resetPasswordSuccess.data.authService}
          </p>
        ) : null}
      </form>
    );
  }
}

const mapStateToProps = (state: Map) => ({
  isLoading: isResetPasswordLoading(state),
  resetPasswordSuccess: getResetPasswordData(state),
  resetPasswordError: getResetPasswordError(state),
  forgotPasswordSuccess: getForgotPasswordData(state),
});

export default connect(mapStateToProps, {
  doResetPassword: sendResetPassword,
})(ChangePassword);
