import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

import { store } from '../../../store';
import DashboardFilters from '../DashboardFilters';

const defaultProps = {
    onTextFilterChange: jest.fn(),
    onDropDownFilterChange: jest.fn(),
    onDateRangeChange: jest.fn(),
    fetchFilterValues: jest.fn(),
    fetchUsers: jest.fn(),
    clearFilter: jest.fn(),
    filterValues: { phases: ['Phase 1', 'Phase 2'], therapeuticAreas: ['Therapeutic Area 1', 'Therapeutic Area 2'], opportunityStatuses: ['Status 1', 'Status 2'] },
    filters: { 'opportunity number': '12345', opportunityName: 'Test Opportunity', customer: 'Test Customer', 'protocol number': '67890', phase: 'Phase 1', product: 'Test Product', therapeuticArea: 'Therapeutic Area 1', 'verbatim indication': 'Test Indication', 'bid due date': '01/01/2023 - 01/31/2023', 'opportunity status': 'Status 1', teamMember: 'John Doe' }
}
describe('DashboardFilters component', () => {

    it('should render the component', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <DashboardFilters {...defaultProps} />
            </Provider>
        );
        expect(getByTestId('dashboard-filters')).toBeInTheDocument();
    });

    it.skip('should render 10 InputField components', () => {
        expect(wrapper.find('InputField')).toHaveLength(10);
    });

    it.skip('should render 3 FilterDropDown components', () => {
        expect(wrapper.find('FilterDropDown')).toHaveLength(3);
    });

    it.skip('should render 1 DateRange component', () => {
        expect(wrapper.find('DateRange')).toHaveLength(1);
    });

    it.skip('should render 1 UserLookup component', () => {
        expect(wrapper.find('UserLookup')).toHaveLength(1);
    });

    it.skip('should call fetchFilterValues and fetchUsers on mount', () => {
        expect(fetchFilterValues).toHaveBeenCalled();
        expect(fetchUsers).toHaveBeenCalled();
    });

    it.skip('should call onTextFilterChange when an InputField value changes', () => {
        wrapper.find('#opportunity number').simulate('change', { target: { value: '54321' } });
        expect(onTextFilterChange).toHaveBeenCalledWith('opportunity number', '54321');
    });

    it.skip('should call onDropDownFilterChange when a FilterDropDown value changes', () => {
        wrapper.find('#phase').simulate('change', 'Phase 2');
        expect(onDropDownFilterChange).toHaveBeenCalledWith('phase', 'Phase 2');
    });

    it.skip('should call onDateRangeChange when a DateRange value changes', () => {
        wrapper.find('DateRange').prop('onSetRange')('02/01/2023 - 02/28/2023');
        expect(onDateRangeChange).toHaveBeenCalledWith('bid due date', '02/01/2023 - 02/28/2023');
    });

    it.skip('should call onDropDownFilterChange when a UserLookup value changes', () => {

    });

});
