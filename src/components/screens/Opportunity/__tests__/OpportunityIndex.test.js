/**
 * @jest-environment jsdom
 */
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as data from './mockdata/question.json';
import { store } from '../../../../store';
import { SocketContext } from '../../../../context/SocketContext';
import Opportunity from '../index';
import { Map } from 'immutable';

const proposalId = data.proposalID;
const autDataMap = Map(data.ssoAuth);
const detailsMap = Map(data.details);
const selectedBidMap = Map(data.selectedBid);

describe('Opportunity component', () => {

  const props = {
    authData: autDataMap,
    details: detailsMap,
    match: { params: { id: proposalId } },
    isLoading: false,
    isSidebarOpen: false,
    isOpen: true,
    selectedBid: selectedBidMap,
    search: "",
    location: { search: "", pathname: '/opportunities/UZA89103' },
    newbidflag: false,
    closeNewbidflag: jest.fn(),
    addNewBid: jest.fn(),
    getRefreshAuthData: jest.fn(),
    expandAllSections: jest.fn(),
    handleOpenClose: jest.fn(),
    updateAnswerAction: jest.fn(),
    updateProposalDetail: jest.fn(),
    updateSwitchTempStatus: jest.fn(),
    setSwitchInProgress: jest.fn(),
    updateProposalNotes: jest.fn(),
    getValidatedData: jest.fn(),
    eventCategories: data.eventCategories,
    userActions: data.userActions,
    trackEvent: jest.fn(),
    trackPageView: jest.fn(),
    proposalDetail: data.proposalDetail,
    getOpportunityInfo: jest.fn(),
    setSeenOne: jest.fn(),
    setResetProposalId: jest.fn(),
    setEventFlg: jest.fn(),
    bidList: data.bidList,
    changeBidInView: jest.fn()
  };

  afterEach(cleanup);
  test('Opportunity component header', () => {
    render(
      <Provider store={store}>
        <SocketContext.Provider
          value={{ socket: null, updateSocketOppId: jest.fn(), }}>
          <BrowserRouter>
            <Opportunity {...props} />
          </BrowserRouter>
        </SocketContext.Provider>
      </Provider>
    );
    expect(screen.getByText(/IQVIA™/i)).toBeInTheDocument();
  });
});
