import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import AssignTabPagination from '../AssignTabPagination';

describe('AssignTabPagination', () => {
    const props = {
        totalItems: 100,
        getCurrentPosition: jest.fn(),
        getMaxRows: jest.fn(),
        eventCategories: {},
        userActions: {},
        trackEvent: jest.fn(),
    };

    it('render with no props', () => {
        render(
            <Provider store={store}>
                <AssignTabPagination 
                    totalItems={0}
                    getMaxRows={jest.fn()}
                    getCurrentPosition={jest.fn()} 
                />
            </Provider>
        );
        expect(screen.getByText('Rows')).toBeInTheDocument();
    });

    it('renders the dropdown and pagination components', () => {
        render(
            <Provider store={store}>
                <AssignTabPagination {...props} />
            </Provider>
        );
        expect(screen.getByText('Rows')).toBeInTheDocument();
        const dropDown = screen.getByText('10');
        fireEvent.click(dropDown);
        const maxRows15 = screen.getByText('15');
        fireEvent.click(maxRows15);
        expect(screen.getByText('15')).toBeInTheDocument();
        const pageNo3 = screen.getByText('3');
        fireEvent.click(pageNo3); 
    });

});
