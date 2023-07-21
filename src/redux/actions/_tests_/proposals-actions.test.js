/**
 * jest-dom environment
 */

import { store } from '../../../store';
import { act } from '@testing-library/react';
import { REDUX_TYPES } from '../../../constants';
import * as ProposalsAPIs from '../../../api/proposals';
import {
  updateProposal,
  getAllProposals,
  getProposalsByStatus,
  onFilteringProposals,
  updateDashboardBid,
  syncDashboardOpportunity
} from '../../../redux/actions/proposals-actions';

export const proposals = {
  proposals: [
    {
      'opportunity number': 'UZA89257',
      opportunityName: 'Test Opportunity',
      proposalId: '',
      proposalDetails: {
        Customer: 'RealPage, Inc.',
        'CRM #': 'UZA89257',
        'Bid due date': '2024-03-22',
        'Line of business': 'Clinical',
        'Is this IQVIA Biotech': 'No',
        Phase: 'Phase 3',
        'Verbatim indication': 'chronic hcv',
        'Therapeutic area': 'Infectious Disease',
        'Protocol number': 'gs - us - 342 - 1138',
        'Product name': 'gs - 5816',
        BoxId: '201920827809',
        IsFsp: 'No',
        pertinentDetails: 'None',
        opportunityId: '0060100000BClTFAA1',
        bidNo: 12
      },
      opportunityOverview: {
        'Opportunity Overview-H8Z': 'Viral hepatitis C',
        'Opportunity Overview-N9U': 'Chemical/Small Molecule',
        'Opportunity Overview-H1X': 'Full service RFP',
        'Opportunity Overview-Z4X': '',
        'Opportunity Overview-J7C': '',
        OpportunityStatus: '3. Developing Proposal'
      },
      usersList: [
        {
          userEmail: 'aadish.tantia@iqvia.com',
          userName: 'Aadish Tantia',
          userId: '1012093'
        },
        {
          userEmail: 'keerthiprasath.chandran@iqvia.com',
          userName: 'Keerthiprasath Chandran',
          userId: '1088411'
        }
      ],
      approvalsCount: 5,
      isApprovalCountPresent: true,
      bidStopStatus: ''
    },
    {
      updatedAt: '2023-07-10T16:47:38.706Z',
      proposalId: '27423fe0-ea03-497b-9fc3-491cdd21f120',
      accountId: '0010100000tt2JlAAI',
      opportunityName: 'RealPage, Inc.-gs - 5816-Phase 3',
      agreementId: 'aM701000000CeGrCAK',
      agreementName: 'RealPage, Inc.-gs - 5816-Phase 3',
      proposalDate: '2023-04-04T09:43:45.515Z',
      proposalDetails: {
        Customer: 'RealPage, Inc.',
        'CRM #': 'UZA89257',
        'Bid due date': '2024-03-22T00:00:00.000Z',
        'Line of business': 'Clinical',
        'Is this IQVIA Biotech': 'No',
        Phase: 'Phase 3',
        'Verbatim indication': 'chronic hcv',
        'Therapeutic area': 'Infectious Disease',
        'Protocol number': 'gs - us - 342 - 1138',
        'Product name': 'gs - 5816',
        BoxId: '201920827809',
        IsFsp: 'No',
        pertinentDetails: 'None',
        opportunityId: '0060100000BClTFAA1',
        bidNo: 12
      },
      opportunityOverview: {
        'Opportunity Overview-H8Z': 'Viral hepatitis C',
        'Opportunity Overview-N9U': 'Chemical/Small Molecule',
        'Opportunity Overview-H1X': 'Full service RFP',
        'Opportunity Overview-Z4X': '',
        'Opportunity Overview-J7C': '',
        OpportunityStatus: '3. Developing Proposal'
      },
      active: true,
      boxMigrated: true,
      opportunityTypeLogic:
        '[{"fieldName":"Core Opportunity Launch Call (AMR/EMEA)","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Equal"},{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Is_this_IQVIA_Biotech__c","Sub group":""},"fieldValue":["No"],"answerRelationship":"And","operator":"Equal"}]}]},{"fieldName":"Core Opportunity Launch Call (APAC)","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Is_this_IQVIA_Biotech__c","Sub group":""},"fieldValue":["No"],"answerRelationship":"And","operator":"Equal"},{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Equal"}]}]},{"fieldName":"Non-Core Clinical Studies","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Is_this_IQVIA_Biotech__c","Sub group":""},"fieldValue":["Yes"],"answerRelationship":"And","operator":"Equal"}]},{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Not Equal"}]}]},{"fieldName":"Ballpark","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Bid_History__c","SF Field API Name":"Opportunity_Type__c","Sub group":""},"fieldValue":["Ballpark"],"answerRelationship":"And","operator":"Equal"},{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Equal"}]}]},{"fieldName":"IQB Template","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Is_this_IQVIA_Biotech__c","Sub group":""},"fieldValue":["Yes"],"answerRelationship":"And","operator":"Equal"},{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Equal"}]}]},{"fieldName":"Default Type","operator":"Or","conditions":[]}]',
      opportunityType: 'Core Opportunity Launch Call (AMR/EMEA)',
      questionTemplateVersionNumber: 'v2023.379',
      inProgress: '',
      isDeleted: '',
      approvalsCount: 8,
      isApprovalCountPresent: true,
      switchTemplateStatus: '',
      typeOfWidget: '',
      bidStopStatus: '',
      nextMilestone: [
        {
          name: 'Bid due date',
          date: '22-Mar-2024'
        },
        {
          name: 'CRO Start Date',
          date: '10-Jul-2023'
        }
      ],
      usersList: [
        {
          userEmail: 'aadish.tantia@iqvia.com',
          userName: 'Aadish Tantia',
          userId: '1012093'
        },
        {
          userEmail: 'keerthiprasath.chandran@iqvia.com',
          userName: 'Keerthiprasath Chandran',
          userId: '1088411'
        },
        {
          userEmail: 'rahul.tiwari@iqvia.com',
          userName: 'RAHUL TIWARI',
          userId: '1095367'
        },
        {
          userEmail: 'sushil.munda@iqvia.com',
          userName: 'Sushil Munda',
          userId: '1138123'
        },
        {
          userEmail: 'vamsi.krishna5@iqvia.com',
          userId: '1101790'
        }
      ]
    }
  ]
};

export const favourites = ['UZA89257', 'UZA89257'];
export const favouritesUpdatedDateMap = [
  {
    'opportunity number': 'UZA89257',
    'updated date': '2023-07-10T13:47:05+05:30'
  },
  {
    'opportunity number': 'UZA89257',
    'updated date': '2023-07-11T13:47:05+05:30'
  }
];

const filters = {
  'opportunity number': 'UZA89257',
  opportunityName: 'Test Opportunity',
  customer: 'RealPage, Inc.',
  'protocol number': 'gs - us - 342 - 1138',
  product: 'gs - 5816',
  'verbatim indication': 'chronic hcv',
  phase: 'Phase 3',
  therapeuticArea: 'Infectious Disease',
  'opportunity status': '3. Developing Proposal',
  'bid due date': {
    from: '2024-03-20',
    to: '2024-03-25'
  },
  teamMember: 'Aadish1234@iqvia.com',
  'Customized opportunity name': 'Test Opportunity'
};

export const proposalDetails = {
  Customer: 'AVKASH TEST',
  'CRM #': 'UZA88708',
  'Bid due date': '2022-10-12T00:00:00.000Z',
  'Line of business': 'Clinical',
  'Is this IQVIA Biotech': 'No',
  Phase: 'Phase 1',
  'Verbatim indication': 'test',
  'Therapeutic area': 'Allergy',
  'Protocol number': '123',
  'Product name': 'dmeo',
  BoxId: '176801808962',
  IsFsp: 'No',
  pertinentDetails: 'demo',
  opportunityId: '0060100000AOuK0AAL',
  bidNo: 13,
  "opportunityName": "LakshmiAcntTest-666-Phase 2b",
  'opportunity status': '3. Developing Proposal'
};

const data = {
  data: { 
    proposalDetails: proposalDetails,
    newBid: true,
    bidStatusKey: false,
    bidStopStatus: true,
    oppNo: 'UZA89257'
   },
  oppId: 'UZA89257',
  fromSF: true
}
const userCustomOppNameMap = {
  UZA89257: 'custom name 89257',
  UZA88708: 'custom name 89257'
};

describe('testing onFilteringProposals function', () => {
  beforeEach(() => {
    act(() => {
      store.dispatch({
        type: REDUX_TYPES.PROPOSAL.SET_FLAG,
        payload: {
          favouriteFlag: true
        }
      });
    });
    store.dispatch({
      type: REDUX_TYPES.SSO_AUTH.SET_USER_FAVOURITES,
      payload: favourites
    });
    store.dispatch({
      type: REDUX_TYPES.SSO_AUTH.SET_FAVOURITES_UPDATED_DATE,
      payload: favouritesUpdatedDateMap
    });
    store.dispatch({
      type: REDUX_TYPES.SSO_AUTH.SET_CUSTOM_NAME_MAP,
      payload: userCustomOppNameMap
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('testing for tabIndex 0| Assigned tab', () => {
    const tabIndex = 0;
    const filters = {};

    const mockGetFavoritesOpportunity = jest
      .spyOn(ProposalsAPIs, 'getAssignedOpportunity')
      .mockResolvedValue({ data: proposals });
    store.dispatch(onFilteringProposals(filters, tabIndex));
    expect(mockGetFavoritesOpportunity).toHaveBeenCalledTimes(1);
  });

  test('testing for tabIndex 0| Assigned tab', () => {
    const tabIndex = 0;
    const mockGetFavoritesOpportunity = jest
      .spyOn(ProposalsAPIs, 'getAssignedOpportunity')
      .mockResolvedValue({ data: proposals });
    store.dispatch(onFilteringProposals(filters, tabIndex));
    expect(mockGetFavoritesOpportunity).toHaveBeenCalledTimes(1);
  });

  test('testing for tabIndex 1| Favourite tab', () => {
    const tabIndex = 1;
    const filters = {};

    const mockGetFavoritesOpportunity = jest
      .spyOn(ProposalsAPIs, 'getFavoritesOpportunity')
      .mockResolvedValue({ data: proposals });
    store.dispatch(onFilteringProposals(filters, tabIndex));
    expect(mockGetFavoritesOpportunity).toHaveBeenCalledTimes(1);
  });

  test('testing for tabIndex 1| Favorite tab with filter applied', () => {
    const tabIndex = 1;
    const mockGetFavoritesOpportunity = jest
      .spyOn(ProposalsAPIs, 'onGetAllProposals')
      .mockResolvedValue({ data: proposals });
    store.dispatch(onFilteringProposals(filters, tabIndex));
    expect(mockGetFavoritesOpportunity).toHaveBeenCalled();
  });

  test('testing for tabIndex 2| Recent tab without filter applied', () => {
    const tabIndex = 2;
    const mockGetFavoritesOpportunity = jest
      .spyOn(ProposalsAPIs, 'getRecentOpportunity')
      .mockResolvedValue({ data: proposals });
    store.dispatch(onFilteringProposals({}, tabIndex));
    expect(mockGetFavoritesOpportunity).toHaveBeenCalled();
  });

  test('testing for tabIndex 2| Recent tab with filter applied', () => {
    const tabIndex = 1;
    act(() => {
      store.dispatch({
        type: REDUX_TYPES.PROPOSAL.SET_FLAG,
        payload: {
          favouriteFlag: false
        }
      });
    });
    const mockGetFavoritesOpportunity = jest
      .spyOn(ProposalsAPIs, 'getRecentOpportunity')
      .mockResolvedValue({ data: proposals });
    store.dispatch(onFilteringProposals(filters, tabIndex));
    expect(mockGetFavoritesOpportunity).toHaveBeenCalled();
  });

  test('testing for tabIndex 3| alltab', () => {
    const tabIndex = 3;
    const mockGetFavoritesOpportunity = jest
      .spyOn(ProposalsAPIs, 'onGetAllProposals')
      .mockResolvedValue({ data: proposals });
    store.dispatch(onFilteringProposals({}, tabIndex));
    expect(mockGetFavoritesOpportunity).toHaveBeenCalled();
  });
});

describe('testing update proposal action', () => {
  beforeEach(() => {
    store.dispatch({
      type: REDUX_TYPES.PROPOSALS.ON_GET_FAVOURITE,
      payload: { proposalsFavourite: proposals.proposals }
    });
    store.dispatch({
      type: REDUX_TYPES.PROPOSALS.ON_GET_PROPOSALS,
      payload: { proposals: proposals.proposals }
    });
  });

  test('rending function with parameters favourite as true', () => {
    store.dispatch(updateProposal('UZA88708', true, proposalDetails));
    const favouriteProposals = store.getState().proposals.toJS()
      .favouriteProposals;
    expect(favouriteProposals.length).toBe(3);
  });

  test('rending function with parameters favourite as false', () => {
    store.dispatch(
      updateProposal('UZA89257', false, proposals.proposals[0].proposalDetails)
    );
    const favouriteProposals = store.getState().proposals.toJS()
      .favouriteProposals;
    expect(favouriteProposals.length).toBe(1);
  });
});

describe('testing getAllProposals action', () => {
  test('render the function without crashing', () => {
    const mockGetFavoritesOpportunity = jest
      .spyOn(ProposalsAPIs, 'onGetAllProposals')
      .mockResolvedValue({ data: proposals });
    store.dispatch(getAllProposals());
    expect(mockGetFavoritesOpportunity).toHaveBeenCalledTimes(1);
  });
});

describe('testing getProposalsByStatus action', () => {
  test('render the function without crashing', () => {
    const mockGetFavoritesOpportunity = jest
      .spyOn(ProposalsAPIs, 'onGetByStatus')
      .mockResolvedValue({ data: proposals });
    store.dispatch(getProposalsByStatus());
    expect(mockGetFavoritesOpportunity).toHaveBeenCalledTimes(1);
  });
});

describe('testing syncDashboardOpportunity action', () => {
  test('render the action with socket response', () => {
    store.dispatch({
      type: REDUX_TYPES.PROPOSALS.ON_GET_FAVOURITE,
      payload: { proposalsFavourite: proposals.proposals }
    });
    store.dispatch({
      type: REDUX_TYPES.PROPOSALS.ON_GET_PROPOSALS,
      payload: { proposals: proposals.proposals }
    });
    store.dispatch({
      type: REDUX_TYPES.PROPOSALS.DASHBOARD_PROPOSAL_DETAIL,
      payload: data
    });
    store.dispatch(syncDashboardOpportunity(data));
    store.dispatch(updateDashboardBid(data));
    const updatedProposal = store.getState().proposals.toJS().proposals[0]['customer'];
    const updatedFavProposal = store.getState().proposals.toJS().favouriteProposals[0]['customer'];
    expect(updatedProposal).toBe('AVKASH TEST');
    expect(updatedFavProposal).toBe('AVKASH TEST');

    data.fromSF = false;
    store.dispatch({
      type: REDUX_TYPES.PROPOSALS.DASHBOARD_PROPOSAL_DETAIL,
      payload: data
    });

    data.data.bidStatusKey = true;
    data.data.proposalDetails['CRM #'] = 'UZA89257';
    store.dispatch({
      type: REDUX_TYPES.PROPOSALS.DASHBOARD_PROPOSAL_DETAIL,
      payload: data
    });

    store.dispatch({
      type: REDUX_TYPES.PROPOSALS.ON_GET_FAVOURITE,
      payload: { proposalsFavourite: [] }
    });
    data.fromSF = true;
    data.data.bidStatusKey = false;
    store.dispatch({
      type: REDUX_TYPES.PROPOSALS.DASHBOARD_PROPOSAL_DETAIL,
      payload: data
    });

    data.fromSF = false;
    store.dispatch({
      type: REDUX_TYPES.PROPOSALS.DASHBOARD_PROPOSAL_DETAIL,
      payload: data
    });

    data.data.bidStatusKey = true;
    store.dispatch({
      type: REDUX_TYPES.PROPOSALS.DASHBOARD_PROPOSAL_DETAIL,
      payload: data
    });
  })
})
