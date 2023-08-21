/**
 * js-dom jest environment
 */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../../../../store';
import ChangePassword from '../ChangePassword';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

const ChangePasswordWithRedux = (props) => (
    <Provider store={store}>
        <ChangePassword {...props} />
    </Provider>
);

describe('test change password component', () => {
    test('render the component without crashing', () => {
        render(<ChangePasswordWithRedux userEmail='' handleShowLogin={jest.fn()} />);
        expect(screen.getByText('Change Password')).toBeInTheDocument();
    });

    test('check for code input and submit | Please enter your code and new password.', () => {
        render(
            <ChangePasswordWithRedux 
                userEmail='test@example.com' 
                handleShowLogin={jest.fn()} 
            />
        );
        const codeInput = screen.getByPlaceholderText('Enter code');
        fireEvent.change(codeInput, { target: { id: 'code', value: '1234' }});
        waitFor(() => {
            expect(screen.getByText('1234')).toBeInTheDocument();
        });
        const submitBtn = screen.getByText('Change password');
        fireEvent.click(submitBtn);
        expect(screen.getByText('Please enter your code and new password.'))
            .toBeInTheDocument();
    });

    test('check for password input and submit | Password do not match.', () => {
        render(
            <ChangePasswordWithRedux 
                userEmail='test@example.com' 
                handleShowLogin={jest.fn()} 
            />
        );

        const codeInput = screen.getByPlaceholderText('Enter code');
        fireEvent.change(codeInput, { target: { id: 'code', value: '1234' }});

        const passwordInput = screen.getByPlaceholderText('Password');
        fireEvent.change(passwordInput, { target: { id: 'password', value: 'test@12' }});
        waitFor(() => {
            expect(screen.getByText('test@12')).toBeInTheDocument();
        });

        const submitBtn = screen.getByText('Change password');
        fireEvent.click(submitBtn);
        expect(screen.getByText('Password do not match.'))
            .toBeInTheDocument();
    });

    test('check for confirm password input and submit', () => {
        render(
            <ChangePasswordWithRedux 
                userEmail='test@example.com' 
                handleShowLogin={jest.fn()} 
            />
        );

        const codeInput = screen.getByPlaceholderText('Enter code');
        fireEvent.change(codeInput, { target: { id: 'code', value: '1234' }});

        const passwordInput = screen.getByPlaceholderText('Password');
        fireEvent.change(passwordInput, { target: { id: 'password', value: 'test@1234' }});

        const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
        fireEvent.change(confirmPasswordInput, { target: { id: 'confirmPassword', value: 'test@1234' }});
        
        const submitBtn = screen.getByText('Change password');
        fireEvent.click(submitBtn);
    });
});