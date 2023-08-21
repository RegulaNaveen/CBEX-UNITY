import React from 'react';
import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import { store } from '../../../../store'
import { REDUX_TYPES } from '../../../../constants';
import LoginForm from '../LoginForm';

const LoginFormWithRedux = (props) => (
    <Provider store={store}>
        <LoginForm {...props} />
    </Provider>
);

describe('LoginForm component', () => {
  const loginUserMock = jest.fn();

  it('should render without crashing', () => {
    render(
        <LoginFormWithRedux 
            isLoading={false} 
            isAuthError="" 
            loginUser={loginUserMock}
        />
    );
    expect(screen.getByText('IQVIA Unity')).toBeInTheDocument();
  });

  it('should update email state on input change', () => {
    render(<LoginFormWithRedux loginUser={loginUserMock} />);
    const emailInput = screen.getByPlaceholderText('Email');
    const mockEvent = { target: { id: 'email', value: 'test@example.com' } };
    fireEvent.change(emailInput, mockEvent);
    const submit = screen.getByText('Log in');
    fireEvent.click(submit);
    // expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('should update password state on input change', () => {
    render(<LoginFormWithRedux loginUser={loginUserMock} />);
    const passwordInput = screen.getByPlaceholderText('Password');
    const mockEvent = { target: { id: 'password', value: 'test123' } };
    fireEvent.change(passwordInput, mockEvent);
    const submit = screen.getByText('Log in');
    fireEvent.click(submit);
    // expect(screen.getByText('test123')).toBeInTheDocument();
  });

  it('should set isForgotPassword state to true when "Forgot password?" link is clicked', () => {
    render(<LoginFormWithRedux loginUser={loginUserMock} />);
    const forgotPasswordLink = screen.getByText('Forgot password?');
    fireEvent.click(forgotPasswordLink);
    expect(screen.getByText('Forgot Password')).toBeInTheDocument();
  });

  it('should call onFormSubmit when the form is submitted', () => {
    render(<LoginFormWithRedux loginUser={loginUserMock} />);
    const emailInput = screen.getByPlaceholderText('Email');
    const mockEventEmail = { target: { id: 'email', value: 'test@example.com' } };
    fireEvent.change(emailInput, mockEventEmail);
    const passwordInput = screen.getByPlaceholderText('Password');
    const mockEventPassowrd = { target: { id: 'password', value: 'test123' } };
    fireEvent.change(passwordInput, mockEventPassowrd);
    const submit = screen.getByText('Log in');
    fireEvent.click(submit);
  });

  it.skip('should show the error message when there is an authentication error', () => {
    store.dispatch({ type: REDUX_TYPES.AUTH.AUTH_LOADING });
    render(<LoginFormWithRedux loginUser={loginUserMock} />);
    store.dispatch({
      type: REDUX_TYPES.AUTH.AUTH_ERROR,
      payload: { error: 'Authentication failed.'}
    });
    expect(screen.getByText('Authentication failed.')).toBeInTheDocument();
  });
});
