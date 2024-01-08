import {
  UpdateNewBid,
  callPickListLookupSfData,
  changeBid,
  checkIsEditableTrue,
  deleteProposalUserFromDB,
  fetchUserTagFlagInQuestion,
  getOpportunity,
  getOpportunityFolderId,
  getProposal,
  setCanUserTagInQuestion,
  setNotApplicableLoader,
  setNotApplicableQuestion,
  setProposalAnswerLoading,
  setShowNaCheckbox,
  updateBidNoQueryparam,
  updateBidTypeQueryparam,
  updateChangeBidStatusOperation
} from '../proposal-actions';
import { waitFor } from '@testing-library/react';
import * as ProposalApi from '../../../api/proposal';
import * as ApprovalApi from '../../../api/approvals';
import { store } from '../../../store';
import { REDUX_TYPES } from '../../../constants';
import axios from 'axios';
import * as proposalReducer from '../../selectors/proposal';

import { Map } from 'immutable';
import configureStore from 'redux-mock-store';
import * as data from '../../../components/screens/Opportunity/__tests__/mockdata/document.json';
import thunk from 'redux-thunk';
import cloneDeep from 'lodash/cloneDeep';
import * as proposalSelecter from '../../selectors';

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

  test('setShowNaCheckbox', () => {
    store.dispatch(setShowNaCheckbox('id'));
  });
  test('setCanUserTagInQuestion ', () => {
    store.dispatch(setCanUserTagInQuestion('id'));
  });
  test('fetchUserTagFlagInQuestion ', () => {
    store.dispatch(fetchUserTagFlagInQuestion('id'));
  });
  test('callPickListLookupSfData ', async () => {
    const mockGetFavoritesOpportunity = jest
      .spyOn(ProposalApi, 'getPickListLookupSfData')
      .mockResolvedValue({
        data: {
          data: [
            {
              PicklistValues: ['N/A', 'No', 'Yes'],
              SK: 'SF#All_responses_completed__c',
              ModifiedAt: 1704367929665,
              PK: 'SF#Bid_History__c',
              Updatable: true,
              EntityType: 'Salesforce',
              CreatedAt: 1704367929665
            },
            {
              PicklistValues: [
                'Assay Validation Document',
                'Ballpark',
                'Budget',
                'Budget + Bid Grid',
                'Full Budget',
                'N/A',
                'Price per Patient Range',
                'Ratecard & FTE Table (FSP Only)',
                'Rounded Ballpark'
              ],
              SK: 'SF#Budget_Deliverable__c',
              ModifiedAt: 1690443035331,
              PK: 'SF#Bid_History__c',
              Updatable: true,
              EntityType: 'Salesforce',
              CreatedAt: 1690443035331
            }
          ]
        }
      });
    await store.dispatch(callPickListLookupSfData());
    expect(mockGetFavoritesOpportunity).toHaveBeenCalledTimes(1);
  });
  test('deleteProposalUserFromDB ', async () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const cloneData = cloneDeep(data);
    cloneData.proposal.proposalAnswerTypes = [
      'text',
      'date',
      'number',
      'table'
    ];
    cloneData.proposal.editQuestionsData = Map({});
    cloneData.proposal.getAnswerTypesDataF = jest.fn();
    cloneData.proposal.getRolesInfoF = jest.fn();
    cloneData.proposal.selectedBid = Map(cloneData.proposal.selectedBid);
    const initialState = {
      proposal: Map(cloneData.proposal),
      selectedBid: Map(cloneData.selectedBid),
      proposalQuestion: Map(cloneData.proposal.proposalQuestions),
      currentsection: '',
      onClose: jest.fn(),
      sidebar: Map({
        isOpen: true
      }),
      notepad: {
        proposalID: '',
        notes: [],
        fetchingNotes: false,
        fetchNotesErrorMsg: '',
        uploadingNote: false,
        uploadNoteErrorMsg: '',
        notepadMode: 'notepad_mode_default'
      },
      unitytab: {
        fetching: false,
        allTabs: {
          '73b4e93b-d678-4244-9732-0fd533723baf': [
            {
              UnityTabSectionOrder: 1,
              UnityTabSectionId: '69c626b1-c49c-478f-a260-0be275697fd4',
              UnityTabSectionQuestions: [
                '9a8c020c-0e54-412c-af8d-88650e48d5c6',
                '10c7fa62-63e1-40c1-9995-3b3a5cd1be33',
                'Opportunity Overview-H1X',
                'b7186e4c-962f-4886-9f83-d3e0f99b5986',
                '4fbc569b-90df-488b-a897-b8da5fc5f0ba',
                '9835edd4-922b-458e-b90f-424c7f0bbaa4',
                '5c05ece4-fa37-42b8-a27a-a32bc4700a64',
                '5958e559-0514-495a-8c40-f67db1e16a8f',
                '6252734c-9e1b-496f-ab1e-8e010844ee3a',
                '1c16e233-06a7-40d2-9e70-830c8a64f218',
                'Study Challenges-G0H',
                '9667da6f-4c7d-40cf-9ab9-ef0bd5dcbf71',
                'e9902a38-a4be-496b-abd4-88097174bd36',
                'd050363a-24c5-4a73-af78-95bd8f27bdb4'
              ],
              UnityTabSectionTitle: 'Overviews',
              TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
              UnityTabOrder: 1,
              UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
              UnityTabTitle: 'Akasha'
            }
          ]
        },
        canSendEmail: false,
        tabRefresh: `Refresh${Date.now().toString()}`,
        isSetQuestionLoading: false,
        setQuestionError: undefined,
        filters: [
          {
            name: 'answered',
            displayName: 'Answered',
            group: 'answer',
            value: false
          },
          {
            name: 'unanswered',
            displayName: 'Unanswered',
            group: 'answer',
            value: false
          },
          {
            name: 'verificationRequired',
            displayName: 'Verification Required',
            group: 'verification',
            value: false
          },
          {
            name: 'responsible',
            displayName: 'Responsible',
            group: 'roles',
            value: false
          },
          {
            name: 'informed',
            displayName: 'Informed',
            group: 'roles',
            value: false
          }
        ]
      },
      approvals: {
        fetching: false,
        allApprovals: [
          {
            ApprovalSectionTitle: 'Strategy Approvals',
            ApprovalSectionRightQuestions: [
              '86ba5974-f4b1-4598-90ae-a1b476fac829',
              '10c7fa62-63e1-40c1-9995-3b3a5cd1be33',
              '4aa99116-ddd6-4e26-98dc-c2b8a3a5ea21',
              '8daca6cc-2c99-4571-ae6d-470f0e7068b5',
              'a932540b-b6ec-4182-82fb-aae5b7e0d027'
            ],
            ApprovalSectionId: '211b13ca-7576-40c5-8e74-442870fb4f98',
            ApprovalSectionOrder: 1,
            ApprovalSectionLeftQuestions: [
              '8d41dd0f-3140-412c-9fd8-a17116d30800',
              'Proposal Team-O0Z',
              'e8fd9762-e57f-4822-9f5b-4f94d9d48e92',
              '722f9c3c-5538-4b64-bda5-76604d61da46',
              'a959f372-8fe5-4064-a7d1-e2c6a0ff06f1',
              '3106acc8-d688-465f-907c-13d890870b43'
            ]
          }
        ],
        canSendEmail: false,
        filters: [
          {
            name: 'answered',
            displayName: 'Answered',
            group: 'answer',
            value: false
          },
          {
            name: 'unanswered',
            displayName: 'Unanswered',
            group: 'answer',
            value: false
          },
          {
            name: 'verificationRequired',
            displayName: 'Verification Required',
            group: 'verification',
            value: false
          },
          {
            name: 'responsible',
            displayName: 'Responsible',
            group: 'roles',
            value: false
          },
          {
            name: 'informed',
            displayName: 'Informed',
            group: 'roles',
            value: false
          }
        ]
      }
    };
    const customstore = mockStore(initialState);
    const mockGetFavoritesOpportunity = jest
      .spyOn(ProposalApi, 'deleteProposalUser')
      .mockResolvedValue({
        questionid: '123',
        iscustomquestion: 'true',
        proposalid: '123'
      });
    await customstore.dispatch(deleteProposalUserFromDB());
    expect(mockGetFavoritesOpportunity).toHaveBeenCalledTimes(1);
  });

  test('changeBid ', async () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const cloneData = cloneDeep(data);
    cloneData.proposal.proposalAnswerTypes = [
      'text',
      'date',
      'number',
      'table'
    ];
    cloneData.proposal.editQuestionsData = Map({});
    cloneData.proposal.getAnswerTypesDataF = jest.fn();
    cloneData.proposal.getRolesInfoF = jest.fn();
    cloneData.proposal.selectedBid = Map(cloneData.proposal.selectedBid);
    const initialState = {
      proposal: Map(cloneData.proposal),
      selectedBid: Map(cloneData.selectedBid),
      proposalQuestion: Map(cloneData.proposal.proposalQuestions),
      currentsection: '',
      onClose: jest.fn(),
      sidebar: Map({
        isOpen: true
      }),
      notepad: {
        proposalID: '',
        notes: [],
        fetchingNotes: false,
        fetchNotesErrorMsg: '',
        uploadingNote: false,
        uploadNoteErrorMsg: '',
        notepadMode: 'notepad_mode_default'
      },
      unitytab: {
        fetching: false,
        allTabs: {
          '73b4e93b-d678-4244-9732-0fd533723baf': [
            {
              UnityTabSectionOrder: 1,
              UnityTabSectionId: '69c626b1-c49c-478f-a260-0be275697fd4',
              UnityTabSectionQuestions: [
                '9a8c020c-0e54-412c-af8d-88650e48d5c6',
                '10c7fa62-63e1-40c1-9995-3b3a5cd1be33',
                'Opportunity Overview-H1X',
                'b7186e4c-962f-4886-9f83-d3e0f99b5986',
                '4fbc569b-90df-488b-a897-b8da5fc5f0ba',
                '9835edd4-922b-458e-b90f-424c7f0bbaa4',
                '5c05ece4-fa37-42b8-a27a-a32bc4700a64',
                '5958e559-0514-495a-8c40-f67db1e16a8f',
                '6252734c-9e1b-496f-ab1e-8e010844ee3a',
                '1c16e233-06a7-40d2-9e70-830c8a64f218',
                'Study Challenges-G0H',
                '9667da6f-4c7d-40cf-9ab9-ef0bd5dcbf71',
                'e9902a38-a4be-496b-abd4-88097174bd36',
                'd050363a-24c5-4a73-af78-95bd8f27bdb4'
              ],
              UnityTabSectionTitle: 'Overviews',
              TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
              UnityTabOrder: 1,
              UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
              UnityTabTitle: 'Akasha'
            }
          ]
        },
        canSendEmail: false,
        tabRefresh: `Refresh${Date.now().toString()}`,
        isSetQuestionLoading: false,
        setQuestionError: undefined,
        filters: [
          {
            name: 'answered',
            displayName: 'Answered',
            group: 'answer',
            value: false
          },
          {
            name: 'unanswered',
            displayName: 'Unanswered',
            group: 'answer',
            value: false
          },
          {
            name: 'verificationRequired',
            displayName: 'Verification Required',
            group: 'verification',
            value: false
          },
          {
            name: 'responsible',
            displayName: 'Responsible',
            group: 'roles',
            value: false
          },
          {
            name: 'informed',
            displayName: 'Informed',
            group: 'roles',
            value: false
          }
        ]
      },
      approvals: {
        fetching: false,
        allApprovals: [
          {
            ApprovalSectionTitle: 'Strategy Approvals',
            ApprovalSectionRightQuestions: [
              '86ba5974-f4b1-4598-90ae-a1b476fac829',
              '10c7fa62-63e1-40c1-9995-3b3a5cd1be33',
              '4aa99116-ddd6-4e26-98dc-c2b8a3a5ea21',
              '8daca6cc-2c99-4571-ae6d-470f0e7068b5',
              'a932540b-b6ec-4182-82fb-aae5b7e0d027'
            ],
            ApprovalSectionId: '211b13ca-7576-40c5-8e74-442870fb4f98',
            ApprovalSectionOrder: 1,
            ApprovalSectionLeftQuestions: [
              '8d41dd0f-3140-412c-9fd8-a17116d30800',
              'Proposal Team-O0Z',
              'e8fd9762-e57f-4822-9f5b-4f94d9d48e92',
              '722f9c3c-5538-4b64-bda5-76604d61da46',
              'a959f372-8fe5-4064-a7d1-e2c6a0ff06f1',
              '3106acc8-d688-465f-907c-13d890870b43'
            ]
          }
        ],
        canSendEmail: false,
        filters: [
          {
            name: 'answered',
            displayName: 'Answered',
            group: 'answer',
            value: false
          },
          {
            name: 'unanswered',
            displayName: 'Unanswered',
            group: 'answer',
            value: false
          },
          {
            name: 'verificationRequired',
            displayName: 'Verification Required',
            group: 'verification',
            value: false
          },
          {
            name: 'responsible',
            displayName: 'Responsible',
            group: 'roles',
            value: false
          },
          {
            name: 'informed',
            displayName: 'Informed',
            group: 'roles',
            value: false
          }
        ]
      }
    };
    const customstore = mockStore(initialState);
    const mockGetFavoritesOpportunity = jest
      .spyOn(proposalReducer, 'getSelectedBid')
      .mockReturnValue(
        Map({
          bidName: 'Post_Award'
        })
      );
    jest.spyOn(proposalReducer, 'getOpportunityData').mockReturnValue(Map({}));

    await customstore.dispatch(
      changeBid({
        bidDueDate: '2024-02-29',
        bidDate: '2023-12-13T12:49:04.430Z',
        bidId: '066aaea1-e28d-4c8d-b737-e5dbf7b7a71c',
        isCurrent: false,
        bidName: 'RFI  1',
        bidStatus: '',
        pertinentDetails: null,
        earlyEngagementDevelopmentPlan: '',
        describeActivity: '',
        typeOfActivity: '',
        bidNo: '1',
        bidType: 'Post_Award',
        isEditable: true
      })
    );
    expect(mockGetFavoritesOpportunity).toHaveBeenCalledTimes(1);
  });
  test('updateChangeBidStatusOperation', async () => {
    store.dispatch(updateChangeBidStatusOperation(true));
  });
  test('setNotApplicableLoader', async () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const cloneData = cloneDeep(data);
    cloneData.proposal.proposalAnswerTypes = [
      'text',
      'date',
      'number',
      'table'
    ];
    cloneData.proposal.editQuestionsData = Map({});
    cloneData.proposal.getAnswerTypesDataF = jest.fn();
    cloneData.proposal.getRolesInfoF = jest.fn();
    cloneData.proposal.selectedBid = Map(cloneData.proposal.selectedBid);
    const initialState = {
      proposal: Map(cloneData.proposal),
      selectedBid: Map(cloneData.selectedBid),
      proposalQuestion: Map(cloneData.proposal.proposalQuestions),
      currentsection: '',
      onClose: jest.fn(),
      sidebar: Map({
        isOpen: true
      }),
      notepad: {
        proposalID: '',
        notes: [],
        fetchingNotes: false,
        fetchNotesErrorMsg: '',
        uploadingNote: false,
        uploadNoteErrorMsg: '',
        notepadMode: 'notepad_mode_default'
      },
      unitytab: {
        fetching: false,
        allTabs: {
          '73b4e93b-d678-4244-9732-0fd533723baf': [
            {
              UnityTabSectionOrder: 1,
              UnityTabSectionId: '69c626b1-c49c-478f-a260-0be275697fd4',
              UnityTabSectionQuestions: [
                '9a8c020c-0e54-412c-af8d-88650e48d5c6',
                '10c7fa62-63e1-40c1-9995-3b3a5cd1be33',
                'Opportunity Overview-H1X',
                'b7186e4c-962f-4886-9f83-d3e0f99b5986',
                '4fbc569b-90df-488b-a897-b8da5fc5f0ba',
                '9835edd4-922b-458e-b90f-424c7f0bbaa4',
                '5c05ece4-fa37-42b8-a27a-a32bc4700a64',
                '5958e559-0514-495a-8c40-f67db1e16a8f',
                '6252734c-9e1b-496f-ab1e-8e010844ee3a',
                '1c16e233-06a7-40d2-9e70-830c8a64f218',
                'Study Challenges-G0H',
                '9667da6f-4c7d-40cf-9ab9-ef0bd5dcbf71',
                'e9902a38-a4be-496b-abd4-88097174bd36',
                'd050363a-24c5-4a73-af78-95bd8f27bdb4'
              ],
              UnityTabSectionTitle: 'Overviews',
              TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
              UnityTabOrder: 1,
              UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
              UnityTabTitle: 'Akasha'
            }
          ]
        },
        canSendEmail: false,
        tabRefresh: `Refresh${Date.now().toString()}`,
        isSetQuestionLoading: false,
        setQuestionError: undefined,
        filters: [
          {
            name: 'answered',
            displayName: 'Answered',
            group: 'answer',
            value: false
          },
          {
            name: 'unanswered',
            displayName: 'Unanswered',
            group: 'answer',
            value: false
          },
          {
            name: 'verificationRequired',
            displayName: 'Verification Required',
            group: 'verification',
            value: false
          },
          {
            name: 'responsible',
            displayName: 'Responsible',
            group: 'roles',
            value: false
          },
          {
            name: 'informed',
            displayName: 'Informed',
            group: 'roles',
            value: false
          }
        ]
      },
      approvals: {
        fetching: false,
        allApprovals: [
          {
            ApprovalSectionTitle: 'Strategy Approvals',
            ApprovalSectionRightQuestions: [
              '86ba5974-f4b1-4598-90ae-a1b476fac829',
              '10c7fa62-63e1-40c1-9995-3b3a5cd1be33',
              '4aa99116-ddd6-4e26-98dc-c2b8a3a5ea21',
              '8daca6cc-2c99-4571-ae6d-470f0e7068b5',
              'a932540b-b6ec-4182-82fb-aae5b7e0d027'
            ],
            ApprovalSectionId: '211b13ca-7576-40c5-8e74-442870fb4f98',
            ApprovalSectionOrder: 1,
            ApprovalSectionLeftQuestions: [
              '8d41dd0f-3140-412c-9fd8-a17116d30800',
              'Proposal Team-O0Z',
              'e8fd9762-e57f-4822-9f5b-4f94d9d48e92',
              '722f9c3c-5538-4b64-bda5-76604d61da46',
              'a959f372-8fe5-4064-a7d1-e2c6a0ff06f1',
              '3106acc8-d688-465f-907c-13d890870b43'
            ]
          }
        ],
        canSendEmail: false,
        filters: [
          {
            name: 'answered',
            displayName: 'Answered',
            group: 'answer',
            value: false
          },
          {
            name: 'unanswered',
            displayName: 'Unanswered',
            group: 'answer',
            value: false
          },
          {
            name: 'verificationRequired',
            displayName: 'Verification Required',
            group: 'verification',
            value: false
          },
          {
            name: 'responsible',
            displayName: 'Responsible',
            group: 'roles',
            value: false
          },
          {
            name: 'informed',
            displayName: 'Informed',
            group: 'roles',
            value: false
          }
        ]
      },
      search: cloneData.search
    };
    const customstore = mockStore(initialState);
    customstore.dispatch(setNotApplicableLoader(false));
  });
  test('setNotApplicableQuestion', async () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const cloneData = cloneDeep(data);
    cloneData.proposal.proposalAnswerTypes = [
      'text',
      'date',
      'number',
      'table'
    ];
    cloneData.proposal.editQuestionsData = Map({});
    cloneData.proposal.getAnswerTypesDataF = jest.fn();
    cloneData.proposal.getRolesInfoF = jest.fn();
    cloneData.proposal.selectedBid = Map(cloneData.proposal.selectedBid);
    const initialState = {
      proposal: Map(cloneData.proposal),
      selectedBid: Map(cloneData.selectedBid),
      proposalQuestion: Map(cloneData.proposal.proposalQuestions),
      currentsection: '',
      onClose: jest.fn(),
      sidebar: Map({
        isOpen: true
      }),
      notepad: {
        proposalID: '',
        notes: [],
        fetchingNotes: false,
        fetchNotesErrorMsg: '',
        uploadingNote: false,
        uploadNoteErrorMsg: '',
        notepadMode: 'notepad_mode_default'
      },
      unitytab: {
        fetching: false,
        allTabs: {
          '73b4e93b-d678-4244-9732-0fd533723baf': [
            {
              UnityTabSectionOrder: 1,
              UnityTabSectionId: '69c626b1-c49c-478f-a260-0be275697fd4',
              UnityTabSectionQuestions: [
                '9a8c020c-0e54-412c-af8d-88650e48d5c6',
                '10c7fa62-63e1-40c1-9995-3b3a5cd1be33',
                'Opportunity Overview-H1X',
                'b7186e4c-962f-4886-9f83-d3e0f99b5986',
                '4fbc569b-90df-488b-a897-b8da5fc5f0ba',
                '9835edd4-922b-458e-b90f-424c7f0bbaa4',
                '5c05ece4-fa37-42b8-a27a-a32bc4700a64',
                '5958e559-0514-495a-8c40-f67db1e16a8f',
                '6252734c-9e1b-496f-ab1e-8e010844ee3a',
                '1c16e233-06a7-40d2-9e70-830c8a64f218',
                'Study Challenges-G0H',
                '9667da6f-4c7d-40cf-9ab9-ef0bd5dcbf71',
                'e9902a38-a4be-496b-abd4-88097174bd36',
                'd050363a-24c5-4a73-af78-95bd8f27bdb4'
              ],
              UnityTabSectionTitle: 'Overviews',
              TabID: '73b4e93b-d678-4244-9732-0fd533723baf',
              UnityTabOrder: 1,
              UnityTabId: '73b4e93b-d678-4244-9732-0fd533723baf',
              UnityTabTitle: 'Akasha'
            }
          ]
        },
        canSendEmail: false,
        tabRefresh: `Refresh${Date.now().toString()}`,
        isSetQuestionLoading: false,
        setQuestionError: undefined,
        filters: [
          {
            name: 'answered',
            displayName: 'Answered',
            group: 'answer',
            value: false
          },
          {
            name: 'unanswered',
            displayName: 'Unanswered',
            group: 'answer',
            value: false
          },
          {
            name: 'verificationRequired',
            displayName: 'Verification Required',
            group: 'verification',
            value: false
          },
          {
            name: 'responsible',
            displayName: 'Responsible',
            group: 'roles',
            value: false
          },
          {
            name: 'informed',
            displayName: 'Informed',
            group: 'roles',
            value: false
          }
        ]
      },
      approvals: {
        fetching: false,
        allApprovals: [
          {
            ApprovalSectionTitle: 'Strategy Approvals',
            ApprovalSectionRightQuestions: [
              '86ba5974-f4b1-4598-90ae-a1b476fac829',
              '10c7fa62-63e1-40c1-9995-3b3a5cd1be33',
              '4aa99116-ddd6-4e26-98dc-c2b8a3a5ea21',
              '8daca6cc-2c99-4571-ae6d-470f0e7068b5',
              'a932540b-b6ec-4182-82fb-aae5b7e0d027'
            ],
            ApprovalSectionId: '211b13ca-7576-40c5-8e74-442870fb4f98',
            ApprovalSectionOrder: 1,
            ApprovalSectionLeftQuestions: [
              '8d41dd0f-3140-412c-9fd8-a17116d30800',
              'Proposal Team-O0Z',
              'e8fd9762-e57f-4822-9f5b-4f94d9d48e92',
              '722f9c3c-5538-4b64-bda5-76604d61da46',
              'a959f372-8fe5-4064-a7d1-e2c6a0ff06f1',
              '3106acc8-d688-465f-907c-13d890870b43'
            ]
          }
        ],
        canSendEmail: false,
        filters: [
          {
            name: 'answered',
            displayName: 'Answered',
            group: 'answer',
            value: false
          },
          {
            name: 'unanswered',
            displayName: 'Unanswered',
            group: 'answer',
            value: false
          },
          {
            name: 'verificationRequired',
            displayName: 'Verification Required',
            group: 'verification',
            value: false
          },
          {
            name: 'responsible',
            displayName: 'Responsible',
            group: 'roles',
            value: false
          },
          {
            name: 'informed',
            displayName: 'Informed',
            group: 'roles',
            value: false
          }
        ]
      },
      search: cloneData.search
    };
    const customstore = mockStore(initialState);
    jest.spyOn(ProposalApi, 'setNotApplicableQuestionApi').mockReturnValue({
      data: {
        data: {
          questionId: '123',
          isCustomQuestion: 'true',
          proposalId: '123',
          notApplicable: true
        }
      }
    });
    jest.spyOn(proposalSelecter, 'getQuestionsFilters').mockReturnValue(
      Map({
        answerGroup: Map({
          answered: Map({
            checked: false,
            label: 'Answered',
            className: 'questions-filter__row1-col1'
          }),
          unanswered: Map({
            checked: false,
            label: 'Unanswered',
            className: 'questions-filter__row1-col1'
          }),
          logic: 'OR'
        }),
        verificationGroup: Map({
          verificationRequired: Map({
            checked: false,
            label: 'Verification Required',
            className: 'questions-filter__row1-col1'
          }),
          showInactiveQuestions: Map({
            checked: false,
            label: 'Include Not Applicable Questions',
            className: 'questions-filter__row3-col1'
          }),
          logic: 'OR'
        }),
        rolegroup: Map({
          myUserRole: Map({
            checked: false,
            label: 'Responsible',
            className: 'questions-filter__row1-col1'
          }),
          interestedParty: Map({
            checked: false,
            label: 'Informed',
            className: 'questions-filter__row2-col1'
          }),
          logic: 'AND'
        }),
        milestoneGroup: Map({
          abc: Map({
            checked: false,
            label: 'abc',
            className: 'questions-filter__item',
            color: '#df216d'
          }),
          logic: 'OR'
        })
      })
    );
    customstore.dispatch(
      setNotApplicableQuestion('proposalId', 'questionId', true, {
        naQuestionUpdateWrapper: jest.fn()
      })
    );
  });
});
