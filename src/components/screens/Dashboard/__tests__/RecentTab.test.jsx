import React from 'react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { cleanup, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import { REDUX_TYPES } from '../../../../constants';
import { SocketContext } from '../../../../context/SocketContext';
import RecentTab from '../RecentTab';

const { 
  SET_PROPOSAL_FILTERING,
  SET_PROPOSAL_VIEW_TYPE, 
  ON_GET_PROPOSALS,
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
    'bid due date': '2022-02-01',
    'opportunity status': 'Inactive'
  }
];

describe('testing my docket tab', () => {
  afterEach(() => {
    cleanup();
  });

  test('render the component without being crashed', () => {
    store.dispatch({
      type: SET_PROPOSAL_FILTERING,
      payload: true
    })
    const { container } = render(
      <Provider store={store}>
        <RecentTab />
      </Provider>
    );

    expect(container).toBeInTheDocument();
  });

  test('check for filtered proposals', () => {
    store.dispatch({
      type: ON_GET_PROPOSALS, 
      payload: { proposals: proposals }
    });
    
    const { container } = render(
      <Router>
        <Provider store={store}>
          <SocketContext.Provider value={{ updateFavouriteWrapper: jest.fn() }}>
            <RecentTab />
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
          <RecentTab />
        </SocketContext.Provider>
      </Provider>
    </Router> 
    );
  
    expect(container).toBeInTheDocument();
  });
});
