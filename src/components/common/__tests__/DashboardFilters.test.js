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
  filterValues: {
    phases: ['Phase 1', 'Phase 2'],
    therapeuticAreas: ['Therapeutic Area 1', 'Therapeutic Area 2'],
    opportunityStatuses: ['Status 1', 'Status 2']
  },
  filters: {
    'opportunity number': '12345',
    opportunityName: 'Test Opportunity',
    customer: 'Test Customer',
    'protocol number': '67890',
    phase: 'Phase 1',
    product: 'Test Product',
    therapeuticArea: 'Therapeutic Area 1',
    'verbatim indication': 'Test Indication',
    'bid due date': '01/01/2023 - 01/31/2023',
    'opportunity status': 'Status 1',
    teamMember: 'John Doe'
  }
};
describe('DashboardFilters component', () => {
  it('should render the component', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <DashboardFilters {...defaultProps} />
      </Provider>
    );
    expect(getByTestId('dashboard-filters')).toBeInTheDocument();
  });
});
