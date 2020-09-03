// @flow
import type { Dispatch, ThunkAction } from './action-types';
import { REDUX_TYPES } from '../constants';
import { onGetAllProposals, onGetByStatus } from '../api/proposals';

const {
  SET_PROPOSAL_VIEW_TYPE,
  ON_GET_PROPOSALS,
  ERROR_ON_GET_PROPOSALS,
  ON_PROPOSALS_LOADING
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

export const getAllProposals = (): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<Object, string>) => {
    dispatch({ type: ON_PROPOSALS_LOADING });
    try {
      const { data } = await onGetAllProposals();

      if (data) {
        const { proposals } = data;
        const formatted = proposals.map(proposal => formatProposal(proposal));
        dispatch({ type: ON_GET_PROPOSALS, payload: { proposals: formatted } });
      }
    } catch (error) {
      dispatch({ type: ERROR_ON_GET_PROPOSALS, payload: { error } });
    }
  };
};

export const getProposalsByStatus = (status: string) => {
  const userEmail = 'testing@gmail.com'; // localStorage.getItem('userEmail');
  return async (dispatch: Dispatch<Object, string>) => {
    dispatch({ type: ON_PROPOSALS_LOADING });
    try {
      const { data } = await onGetByStatus(status, userEmail);

      if (data) {
        const { proposals } = data;
        const formatted = proposals.map(proposal => formatProposal(proposal));
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
