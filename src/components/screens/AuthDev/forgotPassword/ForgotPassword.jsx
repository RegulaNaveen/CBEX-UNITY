// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import Loader from 'react-loader-spinner';
import classNames from 'classnames';
import {
  getForgotPasswordData,
  isForgotPasswordLoading,
  getForgotPasswordError,
} from '../../../../redux/selectors';
import { sendForgotPassword } from '../../../../redux/actions/auth-actions';
import isEmailValid from '../../../../utils/ValidationUtils';
import { PrimaryButton } from '../../../common/atoms/Buttons';
import ChangePassword from './ChangePassword';
import InputField from '../../../common/atoms/inputs/InputField';

type Props = {
  handleCancel: Function,
  isLoading: Boolean,
  forgotPasswordSuccess: Map,
  forgotPasswordError: string,
  doForgotPassword: Function,
};

type State = {
  email: string,
  error: string,
  isChangePassword: boolean,
};

class ForgotPassword extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      email: '',
      error: '',
      isChangePassword: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { isLoading, forgotPasswordSuccess } = this.props;
    const { isLoading: prevIsLoading } = prevProps;

    if (!isLoading && prevIsLoading && forgotPasswordSuccess) {
      this.updateForm();
    }
  }

  updateForm = () => {
    const { isChangePassword } = this.state;
    this.setState({ isChangePassword: !isChangePassword });
  };

  onInputChange = ({ target }: SyntheticInputEvent<EventTarget>) => {
    const { id, value } = target;
    this.setState({ [id]: value });
  };

  onFormSubmit = (event: SyntheticEvent<EventTarget>) => {
    event.preventDefault();

    this.setState({ error: '' });

    const { doForgotPassword } = this.props;
    const { email } = this.state;

    const validateInputs = (): string => {
      if (!email) return 'Please provide an email.';
      if (!isEmailValid(email)) return 'Please provide a valid email.';
      return '';
    };

    const error = validateInputs();

    if (!error) {
      doForgotPassword(email);
    } else this.setState({ error });
  };

  renderContent = () => {
    const { email, error, isChangePassword } = this.state;
    const { handleCancel, isLoading, forgotPasswordError } = this.props;

    if (isChangePassword)
      return (
        <ChangePassword userEmail={email} handleShowLogin={handleCancel} />
      );

    const renderLoader = () => {
      if (isLoading)
        return <Loader type="TailSpin" color="#297DFD" width={30} />;

      return (
        <input type="submit" className="primary-button" value="Send email" />
      );
    };

    return (
      <form onSubmit={this.onFormSubmit}>
        <p className="form-title">Forgot Password</p>
        <InputField
          id="email"
          label="Email"
          placeholder="Email"
          type="email"
          onChange={this.onInputChange}
          value={email}
        />

        <div className="login-loader-button-wrapper">{renderLoader()}</div>

        <p
          className={classNames('login-form-error', {
            'is-displayed': error || forgotPasswordError,
          })}
        >
          {error || forgotPasswordError}
        </p>

        <PrimaryButton
          id="cancel-button"
          className="secundary-button"
          onClick={handleCancel}
        >
          Cancel
        </PrimaryButton>
      </form>
    );
  };

  render() {
    return <>{this.renderContent()}</>;
  }
}

const mapStateToProps = (state: Map) => ({
  isLoading: isForgotPasswordLoading(state),
  forgotPasswordSuccess: getForgotPasswordData(state),
  forgotPasswordError: getForgotPasswordError(state),
});

export default connect(mapStateToProps, {
  doForgotPassword: sendForgotPassword,
})(ForgotPassword);
