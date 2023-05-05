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
        const priceModeler = {
            cost: '1000',
            therapeutic: 'Oncology',
            sites: '10',
            phase: 'Phase 2',
            patients: '100',
            regions: 'US'
          };
        jest.mock('react-redux', () => ({
            useSelector: jest.fn().mockImplementation(callback => callback(priceModeler))
        }));
        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <PriceModeler />
            </Provider>
        );
        expect(getByText('Price Modeler Estimate')).toBeInTheDocument();
        expect(getByTestId("price-modeler-icon")).toBeInTheDocument();
    });

    test('test click of the icon button', () => {
        const DEFAULT_TEXT = "The fields listed below are required for an estimate to be displayed. Excludes investigator grants, vendor costs, and other expenses";
        const { getByTestId, getByText } = render(
            <Provider store={store}>
                <PriceModeler />
            </Provider>
        );

        const iconButton = getByTestId("price-modeler-icon");
        fireEvent.click(iconButton);
        expect(getByText(DEFAULT_TEXT)).toBeInTheDocument();
    });

});
