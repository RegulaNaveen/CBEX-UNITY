import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import { REDUX_TYPES } from '../../../constants';
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

    test('price modeler recalculating state', async () => {
        const { SET_PRICE_MODELER_RECALCULATING } = REDUX_TYPES.PROPOSAL;
        store.dispatch({type: SET_PRICE_MODELER_RECALCULATING, payload: true});
        const { getByText, getByTestId } = await render(
            <Provider store={store}>
                <PriceModeler />
            </Provider>
        );
        expect(getByText('Price Modeler Estimate')).toBeInTheDocument();
        expect(getByTestId("price-modeler-icon")).toBeInTheDocument();
        expect(getByTestId("price-modeler-recalc-loader")).toBeInTheDocument();
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
