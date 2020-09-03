// @flow
import type { Dispatch, ThunkAction } from './action-types';
import { REDUX_TYPES } from '../constants';
import { onGetAllProposals, onGetByStatus } from '../api/proposals';

const {
  SET_PROPOSAL_VIEW_TYPE,
  ON_GET_PROPOSALS,
  ERROR_ON_GET_PROPOSALS
} = REDUX_TYPES.PROPOSALS;

const formatProposal = (proposal: Object): Object => {
  const formattedProposal = {};
  const { proposalDetails, proposalId, opportunityName } = proposal;
  formattedProposal.proposalId = proposalId;
  formattedProposal.opportunityName = opportunityName;
  formattedProposal['opportunity #'] = proposalDetails['CRM #'];
  formattedProposal.account = proposalDetails.Customer;
  formattedProposal['protocol #'] = proposalDetails['Protocol number'];
  formattedProposal.phase = proposalDetails.Phase;
  formattedProposal.product = proposalDetails['Product name'];
  formattedProposal.indication = proposalDetails['Verbatim indication'];
  formattedProposal.therapeuticArea = proposalDetails['Therapeutic area'];
  formattedProposal['bid due date'] = proposalDetails['Bid due date'];
  // TODO: Opportunity status
  return formattedProposal;
};

const dummy = {
  proposalId: '0a45a58d-8fdc-409b-b81c-1d0c89fb188e',
  accountId: '00101000001vn0xAAA',
  opportunityName: 'Testing-Opportunity-05-CRM',
  agreementId: 'a1F01000000CiZgEAK',
  agreementName: 'Testing-Opportunity-05-CRM',
  proposalDate: '2020-08-07T03:24:50.943Z',
  proposalDetails: {
    Customer: 'Testing-Account-01',
    'CRM #': 'DUMMY',
    'Bid due date': '2020-08-28',
    'Line of business': 'Core Clinical',
    'Is this IQVIA Biotech': 'Yes',
    Phase: 'Phase 4',
    'Verbatim indication': 'An indication of verbatim test',
    'Therapeutic area': 'Acute Care',
    'Protocol number': '008 test',
    'Product name': 'black widow poison 2'
  },
  opportunityOverview: {
    'Opportunity Overview-H8Z': 'Test 101',
    'Opportunity Overview-N9U': 'Biologic',
    'Opportunity Overview-H1X': 'RFP',
    'Opportunity Overview-Z4X': '',
    'Opportunity Overview-J7C': 'No Risk'
  },
  daysUntilDueDate: -3,
  usersList: [
    {
      userEmail: 'testing@gmail.com',
      userName: 'Test - Avkash RockitData'
    }
  ]
};

export const getAllProposals = (): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<Object, string>) => {
    try {
      const { data } = await onGetAllProposals();

      if (data) {
        const { proposals } = data;
        const formatted = [
          ...proposals.map(proposal => formatProposal(proposal)),
          ...Array(40)
            .fill(dummy)
            .map(proposal => formatProposal(proposal))
        ];
        dispatch({ type: ON_GET_PROPOSALS, payload: { proposals: formatted } });
      }
    } catch (error) {
      dispatch({ type: ERROR_ON_GET_PROPOSALS, payload: { error } });
    }
  };
};

export const getProposalsByStatus = (status: string) => {
  const userEmail = localStorage.getItem('userEmail');
  return async (dispatch: Dispatch<Object, string>) => {
    try {
      const { data } = await onGetByStatus(status, userEmail);

      if (data) {
        const { proposals } = data;
        const formatted = [
          ...proposals.map(proposal => formatProposal(proposal)),
          ...Array(40)
            .fill(dummy)
            .map(proposal => formatProposal(proposal))
        ];
        dispatch({ type: ON_GET_PROPOSALS, payload: { proposals: formatted } });
      }
    } catch (error) {
      dispatch({ type: ERROR_ON_GET_PROPOSALS, payload: { error } });
    }
  };
};

export const setProposalTypeView = (
  typeView: 0 | 1
): ThunkAction<string, Object> => {
  return (dispatch: Dispatch<string, Object>) => {
    dispatch({ type: SET_PROPOSAL_VIEW_TYPE, payload: { typeView } });
  };
};
