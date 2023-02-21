import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import { mount } from 'enzyme';
import Tabbar from '../Tabbar';

describe.skip('Tabbar component', () => {
    let wrapper;

    beforeEach(() => {
        const props = {
            children: ['My Docket', 'Recent', 'All'],
            setProposalView: jest.fn(),
            filterProposals: jest.fn(),
            eventCategories: {},
            userActions: {},
            trackEvent: jest.fn()
        };
        wrapper = mount(<Provider store={store}><Tabbar {...props} /></Provider>);
    });

    afterEach(() => {
        wrapper.unmount();
    })

    it('should render without crashing', () => {
        expect(wrapper).toBeDefined();
    });

    it('should have the correct initial state', () => {
        expect(wrapper.state()).toEqual({
            selected: 0,
            filterCount: 0,
            showFilters: false,
            filters: {
                opportunityNumber: '',
                opportunityName: '',
                customer: '',
                protocolNumber: '',
                phase: '',
                product: '',
                therapeuticArea: '',
                indication: '',
                bidDueDate: '',
                opportunityStatus: '',
                teamMember: ''
            }
        });
    });

    it('should update the selected state when handleChange is called', () => {
        const index = 1;
        wrapper.instance().handleChange(index);
        expect(wrapper.state('selected')).toEqual(index);
    });

    it('should update the proposal view when handleTypeView is called', () => {
        const selectedTab = 1;
        wrapper.instance().handleTypeView(selectedTab);
        expect(wrapper.instance().props.setProposalView).toHaveBeenCalledWith(selectedTab);
    });

    it('should toggle the showFilters state when toggleFilters is called', () => {
        wrapper.instance().toggleFilters();
        expect(wrapper.state('showFilters')).toEqual(true);
        wrapper.instance().toggleFilters();
        expect(wrapper.state('showFilters')).toEqual(false);
    });

    it('should reset the filters to their initial state when clearFilter is called', () => {
        wrapper.instance().clearFilter();
        expect(wrapper.state('filters')).toEqual({
            opportunityNumber: '',
            opportunityName: '',
            customer: '',
            protocolNumber: '',
            phase: '',
            product: '',
            therapeuticArea: '',
            indication: '',
            bidDueDate: '',
            opportunityStatus: '',
            teamMember: ''
        });
    });

    it('should update the filters correctly when onTextFilterChange is called', () => {
        const event = {
            target: {
                id: 'opportunityNumber',
                value: '123'
            }
        };
        wrapper.instance().onTextFilterChange(event);
        expect(wrapper.state('filters')).toEqual(
            { 'opportunityNumber': '123' },
            0);
    });

    it('should call filterProposals with the correct arguments when onDropDownFilterChange is called', () => {
        const id = 'opportunityStatus';
        const value = 'Draft';
        wrapper.instance().onDropDownFilterChange(id, value);
        expect(props.filterProposals).toHaveBeenCalledWith(
            { opportunityStatus: 'Draft' },
            0
        );
    });

    it('should call filterProposals with the correct arguments when onDateRangeChange is called', () => {
        const id = 'bidDueDate';
        const range = { startDate: new Date('2022-02-01'), endDate: new Date('2022-02-28') };
        wrapper.instance().onDateRangeChange(id, range);
        expect(props.filterProposals).toHaveBeenCalledWith(
            { bidDueDate: range },
            0
        );
    });
});
