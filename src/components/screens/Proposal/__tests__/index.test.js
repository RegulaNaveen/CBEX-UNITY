/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import * as data from './data.json';
import { Map } from 'immutable';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../../../../store';
import Proposal from '../index';

describe('Questions component', () => {
  const mockGetProposalInfo = jest.fn();
  const mockLocationReplace = jest.fn();
  const mockWindow = {
    location: {
      replace: mockLocationReplace
    },
    origin: 'http://localhost:3000'
  };

  const props = {
    isLoading: false,
    isSidebarOpen: false,
    match: {
      params: {
        id: '123'
      }
    },
    getProposalInfo: mockGetProposalInfo
  };

  const mockProposal = Map({
    proposalDetails: {
      'CRM #': '456'
    }
  });

  beforeEach(() => {
    mockGetProposalInfo.mockResolvedValue({
      proposal: mockProposal
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Proposal component load for loading', () => {
    const props = {
      isLoading: true,
      getProposalInfo: jest.fn(),
      proposalDetail: Map(data.proposalDetail),
      isSidebarOpen: false
    }
    const { container } = render(
      <Provider store={store}>
        <Router>
          <Proposal {...props} />
        </Router>
      </Provider>
    );
    expect(container).toBeInTheDocument();
  });

  test.skip('should redirect to the opportunity URL when a proposal is found', async () => {

    const { container } = render(
      <Provider store={store}>
        <Router>
          <Proposal {...props} />
        </Router>
      </Provider>, {
      context: {
        window: mockWindow
      }
    });

    await Promise.resolve();

    expect(container).toBeInTheDocument();
    expect(mockGetProposalInfo).toHaveBeenCalledWith('123');
    expect(mockLocationReplace).toHaveBeenCalledWith('http://localhost:3000/opportunity/456');
  });
});
