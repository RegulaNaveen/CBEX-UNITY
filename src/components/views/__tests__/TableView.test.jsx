import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import TableView from '../TableView';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import SocketContextProvider from '../../../context/SocketContext';

afterEach(cleanup);

const data = [
  {
    'opportunity number': 'OPP123',
    'opportunity name': 'Test Opportunity',
    'bid due date': '2022-01-01',
    'opportunity status': 'Active'
  },
  {
    'opportunity number': 'OPP456',
    'opportunity name': 'Test Opportunity 2',
    'bid due date': '2022-02-01',
    'opportunity status': 'Inactive'
  }
];

const hideStatusData = [
  {
    'opportunity number': 'OPP123',
    'opportunity name': 'Test Opportunity',
    'bid due date': '2022-01-01'
  },
  {
    'opportunity number': 'OPP456',
    'opportunity name': 'Test Opportunity 2',
    'bid due date': '2022-02-01'
  }
];

const TableViewWithRedux = props => {
  return (
    <Provider store={store}>
      <Router>
        <SocketContextProvider>
          <TableView {...props} />
        </SocketContextProvider>
      </Router>
    </Provider>
  );
};

describe('TableView component', () => {
  test.skip('renders table headers and content correctly', () => {
    const { getByText } = render(<TableViewWithRedux data={data} />);

    const headerOpportunityNumber = getByText(/opportunity number/i);
    // const headerOpportunityName = getByText(/opportunity name/i);
    const headerBidDueDate = getByText(/bid due date/i);
    // const headerOpportunityStatus = getByText('opportunity stage');
    const firstRowOpportunityNumber = getByText('OPP123');
    const firstRowOpportunityName = getByText('Test Opportunity');
    const firstRowBidDueDate = getByText('1-Jan-2022');
    const firstRowOpportunityStatus = getByText('Active');

    expect(headerOpportunityNumber).toBeInTheDocument();
    // expect(headerOpportunityName).toBeInTheDocument();
    expect(headerBidDueDate).toBeInTheDocument();
    // expect(headerOpportunityStatus).toBeInTheDocument();
    expect(firstRowOpportunityNumber).toBeInTheDocument();
    expect(firstRowOpportunityName).toBeInTheDocument();
    expect(firstRowBidDueDate).toBeInTheDocument();
    expect(firstRowOpportunityStatus).toBeInTheDocument();
  });

  test('hides the opportunity status header and data correctly', () => {
    const { queryByText } = render(
      <TableViewWithRedux data={hideStatusData} hideStatus />
    );

    const headerOpportunityStatus = queryByText('opportunity stage');
    const firstRowOpportunityStatus = queryByText('Active');

    expect(headerOpportunityStatus).not.toBeInTheDocument();
    expect(firstRowOpportunityStatus).not.toBeInTheDocument();
  });
});
