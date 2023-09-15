import {
  UpdateNewBid,
  getOpportunity,
  getOpportunityFolderId
} from '../proposal-actions';
import { waitFor } from '@testing-library/react';
import * as ProposalApi from '../../../api/proposal';
import * as ApprovalApi from '../../../api/approvals';
import { store } from '../../../store';
import { REDUX_TYPES } from '../../../constants';
import axios from 'axios';

jest.mock('axios', () => {
  const jestOriginal = jest.requireActual('axios');
  return {
    __esModule: true,
    ...jestOriginal
  };
});
axios.get = jest.fn(() => Promise.resolve({ data: {} }));

describe('proposal-actions test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('bidType in url', async () => {
    const testBid = {
      proposal: {
        proposalDetails: {
          bidNo: 1
        }
      }
    };
    window.history.pushState({}, 'test', '/opportunities/12345?bidNo=1');
    UpdateNewBid(testBid);
    await waitFor(() => {
      expect(window.location.search).toEqual('?bidNo=1&bidType=Clinical_Bid');
    });
  });

  test('fetch opp folder id from api', async () => {
    jest.spyOn(ProposalApi, 'fetchOpportunityFolderLink').mockResolvedValue({
      data: 'test-folder-id'
    });
    await store.dispatch(getOpportunityFolderId('test-folder-id'));
    await waitFor(() =>
      expect(store.getState().proposal.get('boxOpportunityFolderId')).toBe(
        'test-folder-id'
      )
    );
  });

  test('fetch opp folder id from api - catch', async () => {
    jest.spyOn(ProposalApi, 'fetchOpportunityFolderLink').mockRejectedValue({});
    await store.dispatch(getOpportunityFolderId('test-folder-id'));
    await waitFor(() =>
      expect(store.getState().proposal.get('boxOpportunityFolderId')).toBe('')
    );
  });

  test('update bidType in url on opportunity info load', async () => {
    window.history.pushState(
      null,
      '',
      '/opportunities/12345?bidNo=1&bidType=Clinical_Bid'
    );
    jest.spyOn(ProposalApi, 'getAllProposals').mockResolvedValue([
      {
        isCurrent: true,
        proposal: {
          proposalId: 'test-id',
          switchTemplateStatus: false,
          bidType: 'Clinical_Bid',
          proposalDetails: {
            bidNo: 1
          },
          opportunityOverview: {}
        }
      }
    ]);
    jest.spyOn(ProposalApi, 'getPaginateProposal').mockResolvedValue([
      {
        data: {
          isCurrent: true,
          proposal: {
            proposalId: 'test-id',
            switchTemplateStatus: false,
            bidType: 'Clinical_Bid',
            proposalDetails: {
              bidNo: 1
            },
            opportunityOverview: {}
          }
        }
      }
    ]);
    jest.spyOn(ApprovalApi, 'getApprovalsApi').mockResolvedValue({
      data: {}
    });
    await store.dispatch({
      type: REDUX_TYPES.PROPOSAL.SET_FLAG,
      payload: {
        earlyEngagementInBidHistory: false
      }
    });
    await store.dispatch(getOpportunity('test-id', 1));
    await waitFor(() => {
      expect(store.getState().proposal.getIn(['selectedBid', 'id'])).toEqual(
        'test-id'
      );
    });
  });

  test('update bidType in url on opportunity info load - url change', async () => {
    window.history.pushState(
      null,
      '',
      '/opportunities/12345?bidNo=1&bidType=Early_Engagement_Bid'
    );
    jest.spyOn(ProposalApi, 'getAllProposals').mockResolvedValue([
      {
        isCurrent: true,
        proposal: {
          proposalId: 'test-id',
          switchTemplateStatus: false,
          bidType: 'Clinical_Bid',
          proposalDetails: {
            bidNo: 1
          },
          opportunityOverview: {}
        }
      }
    ]);
    jest.spyOn(ProposalApi, 'getPaginateProposal').mockResolvedValue([
      {
        data: {
          isCurrent: true,
          proposal: {
            proposalId: 'test-id',
            switchTemplateStatus: false,
            bidType: 'Clinical_Bid',
            proposalDetails: {
              bidNo: 1
            },
            opportunityOverview: {}
          }
        }
      }
    ]);
    jest.spyOn(ApprovalApi, 'getApprovalsApi').mockResolvedValue({
      data: {}
    });
    await store.dispatch({
      type: REDUX_TYPES.PROPOSAL.SET_FLAG,
      payload: {
        earlyEngagementInBidHistory: false
      }
    });
    await store.dispatch(getOpportunity('test-id', 1));
    await waitFor(() => {
      expect(window.location.search).toEqual(
        '?bidNo=1&bidType=Early_Engagement_Bid'
      );
    });
  });
});
