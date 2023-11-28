import React from 'react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import { REDUX_TYPES } from '../../../../constants';
import { SocketContext } from '../../../../context/SocketContext';
import MyDocketTab from '../MyDocketTab';

const {
  SET_PROPOSAL_FILTERING,
  SET_PROPOSAL_VIEW_TYPE,
  ON_GET_PROPOSALS,
  ON_FILTER_PROPOSALS
} = REDUX_TYPES.PROPOSALS;

const proposals = [
  {
    'opportunity number': 'OPP123',
    'opportunity name': 'Test Opportunity',
    'bid due date': '2023-10-01',
    'opportunity status': 'Active',
    bidStopStatus: false
  },
  {
    'opportunity number': 'OPP456',
    'opportunity name': 'Test Opportunity 2',
    'bid due date': '2023-10-01',
    'opportunity status': 'Inactive',
    bidStopStatus: false
  },
  {
    'opportunity number': 'OPP4563',
    'opportunity name': 'Test Opportunity 3',
    'bid due date': '2023-10-01',
    'opportunity status': 'Active',
    bidStopStatus: false
  },
  {
    'opportunity number': 'OPP4564',
    'opportunity name': 'Test Opportunity 4',
    'bid due date': '2023-10-01',
    'opportunity status': 'Inactive',
    bidStopStatus: false
  },
  {
    'opportunity number': 'OPP4565',
    'opportunity name': 'Test Opportunity 5',
    'bid due date': '2023-10-01',
    'opportunity status': 'Active',
    bidStopStatus: false
  },
  {
    'opportunity number': 'OPP4567',
    'opportunity name': 'Test Opportunity 7',
    'bid due date': '2023-10-01',
    'opportunity status': 'Inactive',
    bidStopStatus: false
  },
  {
    'opportunity number': 'OPP4568',
    'opportunity name': 'Test Opportunity 8',
    'bid due date': '2023-10-01',
    'opportunity status': 'Active',
    bidStopStatus: false
  },
  {
    'opportunity number': 'OPP4569',
    'opportunity name': 'Test Opportunity 9',
    'bid due date': '2023-10-01',
    'opportunity status': 'Inactive',
    bidStopStatus: false
  },
  {
    'opportunity number': 'OPP4561',
    'opportunity name': 'Test Opportunity 10',
    'bid due date': '2023-10-01',
    'opportunity status': 'Active',
    bidStopStatus: false
  },
  {
    'opportunity number': 'OPP4562',
    'opportunity name': 'Test Opportunity 12',
    'bid due date': '2023-10-01',
    'opportunity status': 'Inactive',
    bidStopStatus: false
  },
  {
    'opportunity number': 'OPP4563',
    'opportunity name': 'Test Opportunity 13',
    'bid due date': '2023-10-01',
    'opportunity status': 'Active',
    bidStopStatus: false
  },
  {
    'opportunity number': 'OPP4564',
    'opportunity name': 'Test Opportunity 14',
    'bid due date': '2023-10-01',
    'opportunity status': 'Inactive',
    bidStopStatus: false
  },
  {
    'opportunity number': 'OPP4565',
    'opportunity name': 'Test Opportunity 15',
    'bid due date': '2023-10-01',
    'opportunity status': 'Active',
    bidStopStatus: false
  },
  {
    'opportunity number': 'OPP4566',
    'opportunity name': 'Test Opportunity 16',
    'bid due date': '2023-10-01',
    'opportunity status': 'Inactive',
    bidStopStatus: false
  },
  {
    'opportunity number': 'OPP4567',
    'opportunity name': 'Test Opportunity 17',
    'bid due date': '2023-10-01',
    'opportunity status': 'Active',
    bidStopStatus: false
  },
  {
    'opportunity number': 'OPP4568',
    'opportunity name': 'Test Opportunity 18',
    'bid due date': '2023-10-01',
    'opportunity status': 'Inactive',
    bidStopStatus: false
  }
];

describe('testing my docket tab', () => {
  afterEach(() => {
    cleanup();
  });

  const props = {
    proposals: [],
    loading: true,
    isFilteringProposals: false,
    filteredProposals: [],
    setPage: jest.fn(),
    setRows: jest.fn(),
    selectedViewType: true,
    allFlags: {}
  };
  test('render the component without being crashed with loading state', () => {
    store.dispatch({
      type: SET_PROPOSAL_FILTERING,
      payload: true
    });
    const { container } = render(
      <Provider store={store}>
        <MyDocketTab props={props} />
      </Provider>
    );
    expect(container).toBeInTheDocument();
    const loader = container.querySelector('.loading');
    expect(loader).toBeInTheDocument();
  });

  test('check for loaded proposals for current tab', async () => {
    store.dispatch({
      type: ON_GET_PROPOSALS,
      payload: { proposals: proposals }
    });
    const { container } = render(
      <Provider store={store}>
        <SocketContext.Provider
          value={{
            updateFavouriteWrapper: jest.fn()
          }}
        >
          <BrowserRouter>
            <MyDocketTab />
          </BrowserRouter>
        </SocketContext.Provider>
      </Provider>
    );
    const moreButton = screen.getByText('More');
    fireEvent.click(moreButton);
    const pastButton = screen.getByRole('menuitem', { name: /past \(16\)/i });
    fireEvent.click(pastButton);
    expect(container).toBeInTheDocument();
  });

  test('check for loaded proposals for current tab with list view', () => {
    store.dispatch({
      type: SET_PROPOSAL_VIEW_TYPE,
      payload: { typeView: 0 }
    });
    const { container } = render(
      <Provider store={store}>
        <SocketContext.Provider
          value={{
            updateFavouriteWrapper: jest.fn()
          }}
        >
          <BrowserRouter>
            <MyDocketTab />
          </BrowserRouter>
        </SocketContext.Provider>
      </Provider>
    );
    expect(container).toBeInTheDocument();
  });

  test('check for loaded proposals for past tab with list view', async () => {
    const pastProposals = proposals.map(proposal => {
      proposal['bidStopStatus'] = true;
      return proposal;
    });
    store.dispatch({
      type: ON_GET_PROPOSALS,
      payload: { proposals: pastProposals }
    });
    store.dispatch({
      type: SET_PROPOSAL_VIEW_TYPE,
      payload: { typeView: 0 }
    });
    const { container, findByText } = render(
      <Provider store={store}>
        <SocketContext.Provider
          value={{
            updateFavouriteWrapper: jest.fn()
          }}
        >
          <BrowserRouter>
            <MyDocketTab />
          </BrowserRouter>
        </SocketContext.Provider>
      </Provider>
    );
    const moreButton = screen.getByText('More');
    fireEvent.click(moreButton);
    const pastButton = await findByText('Past (16)');
    fireEvent.click(pastButton);
    expect(container).toBeInTheDocument();
  });

  test('check for loaded proposals for past tab with card view', async () => {
    store.dispatch({
      type: SET_PROPOSAL_VIEW_TYPE,
      payload: { typeView: 1 }
    });
    const { container, findByText } = render(
      <Provider store={store}>
        <SocketContext.Provider
          value={{
            updateFavouriteWrapper: jest.fn()
          }}
        >
          <BrowserRouter>
            <MyDocketTab />
          </BrowserRouter>
        </SocketContext.Provider>
      </Provider>
    );
    const moreButton = screen.getByText('More');
    fireEvent.click(moreButton);
    const pastButton = await findByText('Past (16)');
    expect(pastButton).toBeInTheDocument();
    expect(container).toBeInTheDocument();
  });

  test('check for loaded filtered proposals for current tab', () => {
    store.dispatch({
      type: ON_FILTER_PROPOSALS,
      payload: { filteredProposals: proposals, isFiltering: true }
    });
    store.dispatch({
      type: SET_PROPOSAL_VIEW_TYPE,
      payload: { typeView: 0 }
    });
    const { container } = render(
      <Provider store={store}>
        <SocketContext.Provider
          value={{
            updateFavouriteWrapper: jest.fn()
          }}
        >
          <BrowserRouter>
            <MyDocketTab filterApply={0} />
          </BrowserRouter>
        </SocketContext.Provider>
      </Provider>
    );
    expect(container).toBeInTheDocument();
  });
});
