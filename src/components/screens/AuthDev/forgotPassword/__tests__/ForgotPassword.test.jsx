/**
 * js-dom jest environment
 */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../../../../store';
import ForgotPassword from '../ForgotPassword';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

const ForgotPasswordWithRedux = (props) => (
    <Provider store={store}>
        <ForgotPassword {...props} />
    </Provider>
);

describe('test change password component', () => {
    test('render the component without crashing | Please provide an email.', () => {
        render(<ForgotPasswordWithRedux handleCancel={jest.fn()} />);
        expect(screen.getByText('Forgot Password')).toBeInTheDocument();
        const submitBtn = screen.getByText('Send email');
        fireEvent.click(submitBtn);
        expect(screen.getByText('Please provide an email.'))
            .toBeInTheDocument();
    });

    test('check for email input and submit', () => {
        render(<ForgotPasswordWithRedux handleCancel={jest.fn()} />);
        const emailInput = screen.getByPlaceholderText('Email');
        fireEvent.change(emailInput, { target: { id: 'email', value: 'test@1234' }});
        waitFor(() => {
            expect(screen.getByText('test@1234')).toBeInTheDocument();
        });
        const submitBtn = screen.getByText('Send email');
        fireEvent.click(submitBtn);
        waitFor(() => {
            expect(screen.getByText('Please provide a valid email.')).toBeInTheDocument();
        });

        const cancel = screen.getByText('Cancel');
        fireEvent.click(cancel);
    });
});