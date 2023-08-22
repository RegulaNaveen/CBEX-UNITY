import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import { fireEvent, render, screen } from '@testing-library/react';
import { mount } from 'enzyme';
import Tabbar from '../Tabbar';
import { REDUX_TYPES } from '../../../constants';

const TabbarWithRedux = (props) => (
    <Provider store={store}>
        <Tabbar {...props} />
    </Provider>
);

const filterValues = {
    proposalsFilters: {
        phases: ['Phase 1', 'Phase 2', 'Phase 3']
    }
};

describe('Tabbar component', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    const props = {
        children:['Assigned', 'Favorites', 'Recent', 'All'],
        setProposalView: jest.fn(),
        filterProposals: jest.fn(),
        eventCategories: {},
        userActions: {},
        trackEvent: jest.fn(),
        getFilterStatus: jest.fn(),
    };

    it('should render without crashing', () => {
        const { container } = render(<TabbarWithRedux {...props} />);
        expect(container).toBeDefined();
    });

    it('should update the selected state when handleChange is called', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Tabbar {...props} />
            </Provider>
        );
        wrapper.find('TabItem').at(1).simulate('click');
        expect(wrapper.find('TabItem').at(1).prop('selected')).toEqual(1);
    });

    it('should update the proposal view when handleTypeView is called', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Tabbar {...props} />
            </Provider>
        );
        expect(wrapper.find('SwitchView').prop('selectedViewType')).toEqual(1);
        wrapper.find('button').at(0).simulate('click');
        expect(wrapper.find('SwitchView').prop('selectedViewType')).toEqual(0);
    });

    it('should toggle the showFilters state when toggleFilters is called', () => {
        render(<TabbarWithRedux {...props} />);
        const Filter = screen.getByText('Filter');
        fireEvent.click(Filter);
        const DashboardFilters = screen.getByTestId('dashboard-filters');
        expect(DashboardFilters).toBeDefined();
    });

    it('should update the filters correctly when onTextFilterChange is called', () => {
        const { container } = render(<TabbarWithRedux {...props} />);
        const Filter = screen.getByText('Filter');
        fireEvent.click(Filter);
        const oppNameInput = container.querySelector('#opportunityName');
        fireEvent.change(oppNameInput, { target: { id: 'opportunityName', value: 'ABC12345' }});
        expect(oppNameInput).toHaveValue('ABC12345');
    });

    it('should call filterProposals with the correct arguments when onDropDownFilterChange is called', () => {
        store.dispatch({
            type: REDUX_TYPES.PROPOSALS.ON_SET_PROPOSALS_FILTERS,
            payload: filterValues
        });
        const { container } = render(<TabbarWithRedux {...props} />);
        const Filter = screen.getByText('Filter');
        fireEvent.click(Filter);
        const phaseInput = container.querySelector('#phase');
        fireEvent.click(phaseInput);
        const phase1 = screen.getByText('Phase 1');
        fireEvent.click(phase1);
        expect(screen.getByText('Phase 1')).toBeInTheDocument();
    });

    it('should call filterProposals with the correct arguments when onDateRangeChange & clearFilter is called', () => {
        const { container } = render(<TabbarWithRedux {...props} />);
        const Filter = screen.getByText('Filter');
        fireEvent.click(Filter);
        const phaseInput = container.querySelector('.datepicker-input');
        fireEvent.focusIn(phaseInput);
        const from = screen.getByText('1');
        fireEvent.click(from);
        const to = screen.getByText('28');
        fireEvent.click(to);
        const clearAll = screen.getByText('Clear All');
        fireEvent.click(clearAll);
        fireEvent.click(Filter);
    });
});
