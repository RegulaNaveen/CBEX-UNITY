import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';

import { store } from '../../../store';
import PriceModeler from '../PriceModeler';

describe('render the pricemodeler component', () => {
    test('renders PriceModeler component without crashing', () => {
        render(
            <Provider store={store}>
                <PriceModeler />
            </Provider>
        );
    });

    test('displays estimated price', () => {
        const mockPriceModuler = {
            cost: '1000'
        };
        jest.mock('react-redux', () => ({
            useSelector: jest.fn().mockImplementation(callback => callback(mockPriceModuler))
        }));
        const { getByText } = render(
            <Provider store={store}>
                <PriceModeler />
            </Provider>
        );
        expect(getByText('Price Modeler Estimate')).toBeInTheDocument();
    });

});
