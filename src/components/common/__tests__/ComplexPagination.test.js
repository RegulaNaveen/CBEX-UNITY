import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';

import { store } from '../../../store';
import Pagination from '../atoms/Pagination';
import Dropdown from '../atoms/inputs/Dropdown';
import ComplexPagination from '../ComplexPagination';

describe('ComplexPagination', () => {
    const props = {
        totalItems: 100,
        getCurrentPosition: jest.fn(),
        getMaxRows: jest.fn(),
        eventCategories: {},
        userActions: {},
        trackEvent: jest.fn(),
    };

    it('renders the dropdown and pagination components', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <ComplexPagination {...props} />
            </Provider>
        );
        expect(getByTestId('complex-pagination')).toBeInTheDocument();
    });

});
