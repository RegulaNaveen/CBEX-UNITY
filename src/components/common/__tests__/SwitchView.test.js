import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import SwitchView from '../SwitchView';

describe('SwitchView', () => {

    const props = {
        getSelectedTab: jest.fn(),
        selectedViewType: 0,
        eventCategories: {},
        userActions: {},
        trackEvent: jest.fn()
    };

    it('should render two buttons', () => {
        const { container } = render(
            <Provider store={store}>
                <SwitchView {...props} />
            </Provider>
        );
        expect(container).toBeInTheDocument();
    });

    it('should set view to list when list button is clicked', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <SwitchView {...props} />
            </Provider>
        );
        const listButton = getByTestId('list-view');
        fireEvent.click(listButton);
        expect(props.getSelectedTab).toHaveBeenCalledWith(0);
        expect(props.trackEvent).toHaveBeenCalledWith({
            category: props.eventCategories.dp,
            action: `View: ${props.userActions.click} On List View`
        });
    });

    it('should set view to grid when grid button is clicked', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <SwitchView {...props} />
            </Provider>
        );
        const cardButton = getByTestId('card-view');
        fireEvent.click(cardButton);
        expect(props.getSelectedTab).toHaveBeenCalledWith(0);
        expect(props.trackEvent).toHaveBeenCalledWith({
            category: props.eventCategories.dp,
            action: `View: ${props.userActions.click} On Card View`
        });
    });
});
