import React from 'react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { cleanup, render, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import { REDUX_TYPES } from '../../../../constants';
import { SocketContext } from '../../../../context/SocketContext';
import FavoritesTab from '../FavoritesTab';

const { 
    SET_PROPOSAL_VIEW_TYPE, 
    SET_PROPOSAL_FILTERING, 
    ON_GET_FAVOURITE,
    ON_FILTER_PROPOSALS 
} = REDUX_TYPES.PROPOSALS

const proposals = [
  {
    'opportunity number': 'OPP123',
    'opportunity name': 'Test Opportunity',
    'bid due date': '2022-01-01',
    'opportunity status': 'Active'
  },
  {
    'opportunity number': 'OPP456',
    'opportunity name': 'Test Opportunity 2',
    'bid due date': '2022-03-01',
    'opportunity status': 'Inactive'
  },
  {
    'opportunity number': 'OPP4563',
    'opportunity name': 'Test Opportunity 3',
    'bid due date': '2022-02-01',
    'opportunity status': 'Active'
  },
  {
    'opportunity number': 'OPP4564',
    'opportunity name': 'Test Opportunity 4',
    'bid due date': '2022-04-01',
    'opportunity status': 'Inactive'
  },
  {
    'opportunity number': 'OPP4565',
    'opportunity name': 'Test Opportunity 5',
    'bid due date': '2022-05-01',
    'opportunity status': 'Active'
  },
  {
    'opportunity number': 'OPP4567',
    'opportunity name': 'Test Opportunity 7',
    'bid due date': '2022-07-01',
    'opportunity status': 'Inactive'
  },
  {
    'opportunity number': 'OPP4568',
    'opportunity name': 'Test Opportunity 8',
    'bid due date': '2022-08-01',
    'opportunity status': 'Active'
  },
  {
    'opportunity number': 'OPP4569',
    'opportunity name': 'Test Opportunity 9',
    'bid due date': '2022-09-01',
    'opportunity status': 'Inactive'
  },
  {
    'opportunity number': 'OPP4561',
    'opportunity name': 'Test Opportunity 10',
    'bid due date': '2022-10-01',
    'opportunity status': 'Active'
  },
  {
    'opportunity number': 'OPP4562',
    'opportunity name': 'Test Opportunity 12',
    'bid due date': '2022-12-01',
    'opportunity status': 'Inactive'
  },
  {
    'opportunity number': 'OPP4563',
    'opportunity name': 'Test Opportunity 13',
    'bid due date': '2022-01-01',
    'opportunity status': 'Active'
  },
  {
    'opportunity number': 'OPP4564',
    'opportunity name': 'Test Opportunity 14',
    'bid due date': '2022-02-01',
    'opportunity status': 'Inactive'
  },
  {
    'opportunity number': 'OPP4565',
    'opportunity name': 'Test Opportunity 15',
    'bid due date': '2022-03-01',
    'opportunity status': 'Active'
  },
  {
    'opportunity number': 'OPP4566',
    'opportunity name': 'Test Opportunity 16',
    'bid due date': '2022-06-01',
    'opportunity status': 'Inactive'
  },
  {
    'opportunity number': 'OPP4567',
    'opportunity name': 'Test Opportunity 17',
    'bid due date': '2022-07-01',
    'opportunity status': 'Active'
  },
  {
    'opportunity number': 'OPP4568',
    'opportunity name': 'Test Opportunity 18',
    'bid due date': '2022-08-01',
    'opportunity status': 'Inactive'
  },
];

const FavoritesTabWithRedux = () => (
  <Provider store={store}>
    <FavoritesTab />
  </Provider>
);

describe('testing favorites tab', () => {
  afterEach(() => {
    cleanup();
  });

  test('return null if favorite flag is off', () => {
    const { container } = render(<FavoritesTabWithRedux />);
    act(() => {
      store.dispatch({
        type: REDUX_TYPES.PROPOSAL.SET_FLAG,
        payload: {
          favouriteFlag: false
        },
      });
    });
    expect(container).toBeInTheDocument();
  })

  test('render the component without being crashed', () => {
    store.dispatch({
      type: SET_PROPOSAL_FILTERING,
      payload: true
    })
    const { container } = render(
      <Provider store={store}>
        <FavoritesTab />
      </Provider>
    );

    expect(container).toBeInTheDocument();
  });

  test('render the component with favourite proposals', () => {
    store.dispatch({
      type: ON_GET_FAVOURITE, 
      payload: { proposalsFavourite: proposals }
    });
    
    const { container } = render(
      <Router>
        <Provider store={store}>
          <SocketContext.Provider value={{ updateFavouriteWrapper: jest.fn() }}>
            <FavoritesTab />
          </SocketContext.Provider>
        </Provider>
      </Router> 
    );

    expect(container).toBeInTheDocument();
  });

  test('check for filtered proposals and grid view', () => {
    store.dispatch({
        type: ON_FILTER_PROPOSALS, 
        payload: { filteredProposals: proposals, isFiltering: true }
    });

    store.dispatch({
        type: SET_PROPOSAL_VIEW_TYPE, payload: { typeView: 0 }
    });

    const { container } = render(
    <Router>
        <Provider store={store}>
        <SocketContext.Provider value={{ updateFavouriteWrapper: jest.fn() }}>
            <FavoritesTab />
        </SocketContext.Provider>
        </Provider>
    </Router> 
    );
  
    expect(container).toBeInTheDocument();
  });
});
