import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { REDUX_TYPES } from '../../../../constants';
import * as data from './mockdata/question.json';
import { store } from '../../../../store';
import { SocketContext } from '../../../../context/SocketContext';
import * as SessionHandler from '../../../../SessionHandler';
import Opportunity from '../index';

jest.mock('../../../../utils/launchDarkly', () => ({
  __esModule: true,
  default: () => Promise.resolve({ favouriteFlag: true })
}));

jest.mock('../../../views/export-component/GenerateDocs.jsx', () => () => (
  <p>React PDF Component</p>
));

const proposalId = data.proposalID;
const autDataMap = new Map(Object.entries(data.ssoAuth));
const detailsMap = new Map(Object.entries(data.details));
const selectedBidMap = new Map(Object.entries(data.selectedBid));

describe.skip('Opportunity component', () => {
  window.scrollTo = jest.fn();
  const props = {
    authData: autDataMap,
    details: detailsMap,
    match: { params: { id: proposalId } },
    isLoading: false,
    isSidebarOpen: false,
    isOpen: true,
    selectedBid: selectedBidMap,
    search: '',
    location: { search: '', pathname: '/opportunities/UZA89103' },
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

  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn()
  }));
  afterEach(cleanup);
  jest
    .spyOn(SessionHandler, 'getUserRole')
    .mockReturnValue('Proposal Developer');
  test('Opportunity component header', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <SocketContext.Provider
          value={{ socket: null, updateSocketOppId: jest.fn() }}
        >
          <BrowserRouter>
            <Opportunity {...props} />
          </BrowserRouter>
        </SocketContext.Provider>
      </Provider>
    );
    await store.dispatch({
      type: REDUX_TYPES.PROPOSAL.PROPOSAL_INFO_ERROR,
      payload: 'proposal error'
    });
    expect(getByText(/IQVIA™/i)).toBeInTheDocument();
  });
});
