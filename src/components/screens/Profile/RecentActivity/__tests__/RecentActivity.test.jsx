import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../../../store';
import RecentActivity from '../RecentActivity';
import { BrowserRouter } from 'react-router-dom';

describe('RecentActivity', () => {
    it('renders the components correctly', () => {
        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <RecentActivity />
                </BrowserRouter>
            </Provider>
        );
        expect(getByText('Recent Activity')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Search recent notifications')).toBeInTheDocument();
        //expect(getByTestId('cog-icon')).toBeInTheDocument();
        //expect(getByTestId('notification-card')).toBeInTheDocument();
    });

    it('updates input value correctly', () => {
        const setSearchKey = jest.fn();
        const { findByText } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <RecentActivity setSearchKey={setSearchKey} />
                </BrowserRouter>
            </Provider>
        );
        const textInput = screen.getByPlaceholderText('Search recent notifications');
        fireEvent.change(textInput, { target: { value: 'test' } });
    });
});    
