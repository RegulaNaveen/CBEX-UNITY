/**
 * @jest-environment jsdom
 */
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';
import { API } from '../../../constants';
const { COGNITO_HOST, REDIRECTION_URL, CLIENT_ID } = API.AUTH;
import sinon from 'sinon';

describe('Login component', () => {
  beforeAll(() => {
    render(<Login />);
  });

  test('Login Screen center title', async () => {
    expect(screen.getByText(/IQVIA Unity/i)).toHaveTextContent('IQVIA Unity');
  });

  test('Login button', async () => {
    render(<Login />)
    expect(screen.getByRole('button')).toHaveTextContent('Log in with SSO');
  });
  test('Login button Click', async () => {
    let url = `${COGNITO_HOST}/oauth2/authorize?identity_provider=AzureAD&redirect_uri=${REDIRECTION_URL}&response_type=CODE&client_id=${CLIENT_ID}&scope=aws.cognito.signin.user.admin email openid phone profile`
    render(<Login />);
    delete window.location
    window.location = { assign: jest.fn() }
    fireEvent.click(await screen.getByRole('button'));
});
  afterAll(cleanup);
});
