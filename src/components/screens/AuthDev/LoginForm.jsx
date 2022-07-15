// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable'; // NOSONAR
import Loader from 'react-loader-spinner';
import classNames from 'classnames';
import { isAuthLoading, authHasErrors } from '../../../redux/selectors';
import { login } from '../../../redux/actions/auth-actions';
import isEmailValid from '../../../utils/ValidationUtils';
import { LinkButton } from '../../common/atoms/Buttons';
import ForgotPassword from './forgotPassword/ForgotPassword';
import InputField from '../../common/atoms/inputs/InputField';

type State = {
  email: string,
  password: string,
  error: string,
  isForgotPassword: boolean
};

type Props = {
  isLoading: boolean,
  isAuthError: string,
  loginUser: Function
};

class LoginForm extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
      isForgotPassword: false
    };
  }

  componentDidMount() {
    const { error } = this.state;

    if (error === 'Internal server error') this.setState({ error: '' });
  }

  onInputChange = ({ target }: SyntheticInputEvent<EventTarget>) => {
    const { id, value } = target;
    this.setState({ [id]: value });
  };

  onFormSubmit = (event: SyntheticEvent<EventTarget>) => {
    event.preventDefault();

    this.setState({ error: '' });

    const { loginUser } = this.props;
    const { email, password } = this.state;

    const validateInputs = (): string => {
      if (!email || !password) return 'Please provide an email and password.';
      if (!isEmailValid(email)) return 'Please provide a valid email.';
      return '';
    };

    const error = validateInputs();

    if (!error) {
      loginUser(email, password);
    } else this.setState({ error });
  };

  onForgotPassword = () => {
    const { isForgotPassword } = this.state;
    this.setState({ isForgotPassword: !isForgotPassword });
  };

  renderContent = () => {
    const { email, password, error, isForgotPassword } = this.state;
    const { isLoading, isAuthError } = this.props;

    if (isForgotPassword)
      return <ForgotPassword handleCancel={this.onForgotPassword} />;

    const renderLoader = () => {
      if (isLoading)
        return <Loader type="TailSpin" color="#297DFD" width={30} />;

      return <input type="submit" className="primary-button" value="Log in" />;
    };

    return (
      <form onSubmit={this.onFormSubmit}>
        <p className="form-title">IQVIA Unity</p>
        <InputField
          id="email"
          label="Email"
          placeholder="Email"
          type="email"
          onChange={this.onInputChange}
          value={email}
        />
        <InputField
          id="password"
          label="Password"
          placeholder="Password"
          type="password"
          onChange={this.onInputChange}
          value={password}
        />

        <div className="login-loader-button-wrapper">{renderLoader()}</div>

        <p
          className={classNames('login-form-error', {
            'is-displayed': error || isAuthError
          })}
        >
          {error || isAuthError}
        </p>

        <LinkButton onClick={this.onForgotPassword}>
          Forgot password?
        </LinkButton>
      </form>
    );
  };

  render() {
    return <>{this.renderContent()}</>;
  }
}

const mapStateToProps = (state: Map) => ({
  isLoading: isAuthLoading(state),
  isAuthError: authHasErrors(state)
});

export default connect(mapStateToProps, { loginUser: login })(LoginForm);
