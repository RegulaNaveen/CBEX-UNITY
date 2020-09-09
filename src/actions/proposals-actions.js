// @flow
import { valuesIn, includes } from 'lodash';
import type { Dispatch, ThunkAction } from './action-types';
import { REDUX_TYPES } from '../constants';
import { onGetAllProposals, onGetByStatus } from '../api/proposals';

const {
  SET_PROPOSAL_VIEW_TYPE,
  ON_GET_PROPOSALS,
  ERROR_ON_GET_PROPOSALS,
  ON_PROPOSALS_LOADING,
  ON_FILTER_PROPOSALS
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
  const userEmail = localStorage.getItem('userEmail');
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

type FilteredData = {
  opportunityNumber: string,
  opportunityName: string,
  customer: string,
  protocolNumber: string,
  phase: string,
  product: string,
  therapeuticArea: string,
  indication: string,
  bidDueDate: string,
  opportunityStatus: string,
  teamMember: string
};

export const onFilteringProposals = (
  newFilteredProposals: FilteredData,
  isFiltering: boolean
): ThunkAction<string, Object> => (
  dispatch: Dispatch<string, Object>,
  getState: Function
) => {
  const {
    opportunityNumber,
    opportunityName,
    customer,
    protocolNumber,
    phase,
    product,
    therapeuticArea,
    indication,
    bidDueDate,
    opportunityStatus,
    teamMember
  } = newFilteredProposals;

  const proposalsMap = getState().proposals;
  const proposals = proposalsMap.get('proposals');
  const cleanFilters = Object.entries(newFilteredProposals).filter(
    value => value !== ''
  );

  console.log(cleanFilters);

  const filteredProposals = proposals.filter(proposal =>
    includes(proposal, cleanFilters)
  );

  console.log(filteredProposals);

  dispatch({
    type: ON_FILTER_PROPOSALS,
    payload: { filteredProposals, isFiltering }
  });
};

export const setProposalTypeView = (
  typeView: 0 | 1
): ThunkAction<string, Object> => {
  return (dispatch: Dispatch<string, Object>) => {
    dispatch({ type: SET_PROPOSAL_VIEW_TYPE, payload: { typeView } });
  };
};
