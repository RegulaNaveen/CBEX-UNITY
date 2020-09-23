// @flow
import { isEmpty } from 'lodash';
import type { Dispatch, ThunkAction } from './action-types';
import { REDUX_TYPES } from '../constants';
import {
  onGetAllProposals,
  onGetByStatus,
  onGetFilterValues
} from '../api/proposals';
import { objectContains } from '../utils/helpers';

const {
  SET_PROPOSAL_VIEW_TYPE,
  ON_GET_PROPOSALS,
  ERROR_ON_GET_PROPOSALS,
  ON_PROPOSALS_LOADING,
  ON_FILTER_PROPOSALS,
  ON_SET_PROPOSALS_FILTERS
} = REDUX_TYPES.PROPOSALS;

const formatProposal = (proposal: Object): Object => {
  const formattedProposal = {};
  const {
    proposalDetails,
    proposalId,
    opportunityName,
    opportunityOverview,
    usersList
  } = proposal;
  formattedProposal.proposalId = proposalId;
  formattedProposal.opportunityName = opportunityName;
  formattedProposal['opportunity number'] = proposalDetails['CRM #'];
  formattedProposal.customer = proposalDetails.Customer;
  formattedProposal['protocol number'] = proposalDetails['Protocol number'];
  formattedProposal.phase = proposalDetails.Phase;
  formattedProposal.product = proposalDetails['Product name'];
  formattedProposal.indication = proposalDetails['Verbatim indication'];
  formattedProposal.therapeuticArea = proposalDetails['Therapeutic area'];
  formattedProposal['bid due date'] = proposalDetails['Bid due date'];
  formattedProposal['opportunity status'] =
    opportunityOverview.OpportunityStatus || '';
  formattedProposal.usersList = usersList;

  return formattedProposal;
};

export const getAllProposals = (): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<Object, Object>) => {
    dispatch({ type: ON_PROPOSALS_LOADING, payload: {} });
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
  const userEmail = localStorage.getItem('userEmail') || '';
  return async (dispatch: Dispatch<Object, Object>) => {
    dispatch({ type: ON_PROPOSALS_LOADING, payload: {} });
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

const dateRangeFilter = (key: String, range: Object, array: Array<Object>) => {
  if (!range) return array;
  const { from, to } = range;
  from.setHours(0, 0, 0, 0);
  to.setHours(0, 0, 0, 0);
  return array.filter(proposal => {
    const proposalDate = new Date(proposal[key]);
    proposalDate.setHours(0, 0, 0, 0);
    return proposalDate >= from && proposalDate <= to;
  });
};

const textFilter = (key: string, value: string, array: Array<Object>) =>
  array.filter(proposal =>
    proposal[key].toLowerCase().includes(value.toLowerCase())
  );

const optionFilter = (key: string, value: string, array: Array<Object>) =>
  array.filter(proposal => proposal[key].toLowerCase() === value.toLowerCase());

const userFilter = (value: string, array: Array<Object>) => {
  const userEmail = value.match(/\((.*?)\)/)[1];
  return array.filter(proposal =>
    objectContains(proposal.usersList, userEmail, false)
  );
};

export const onFilteringProposals = (
  filters: FilteredData,
  isFiltering: boolean
): ThunkAction<string, Object> => (
  dispatch: Dispatch<string, Object>,
  getState: Function
) => {
  const proposalsMap = getState().proposals;
  const proposals = proposalsMap.get('proposals');

  const cleanFilters = Object.entries(filters)
    // eslint-disable-next-line no-unused-vars
    .filter(([key, value]) => value !== '')
    .map(([key, value]) => [key, value]);

  if (isEmpty(cleanFilters)) {
    dispatch({
      type: ON_FILTER_PROPOSALS,
      payload: { filteredProposals: proposals, isFiltering }
    });
  } else {
    let filteredProposals = [];

    cleanFilters.forEach(([key, value]) => {
      switch (key) {
        case 'opportunity number':
        case 'opportunityName':
        case 'customer':
        case 'protocol number':
        case 'product':
          filteredProposals = textFilter(
            key,
            value,
            !isEmpty(filteredProposals) ? filteredProposals : proposals
          );
          break;
        case 'phase':
        case 'therapeuticArea':
        case 'indication':
        case 'opportunity status':
          filteredProposals = optionFilter(
            key,
            value,
            !isEmpty(filteredProposals) ? filteredProposals : proposals
          );
          break;
        case 'bid due date':
          filteredProposals = dateRangeFilter(
            key,
            value,
            !isEmpty(filteredProposals) ? filteredProposals : proposals
          );
          break;
        case 'teamMember':
          filteredProposals = userFilter(
            value,
            !isEmpty(filteredProposals) ? filteredProposals : proposals
          );
          break;
        default:
          break;
      }
    });

    dispatch({
      type: ON_FILTER_PROPOSALS,
      payload: { filteredProposals, isFiltering }
    });
  }
};

export const getFilteringValues = (): ThunkAction<String, Object> => async (
  dispatch: Dispatch<Object, string>
) => {
  try {
    const { data } = await onGetFilterValues();

    if (data) {
      const { acceptanceCriteriaValues } = data;
      dispatch({
        type: ON_SET_PROPOSALS_FILTERS,
        payload: { proposalsFilters: acceptanceCriteriaValues }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const setProposalTypeView = (
  typeView: 0 | 1
): ThunkAction<string, Object> => {
  return (dispatch: Dispatch<string, Object>) => {
    dispatch({ type: SET_PROPOSAL_VIEW_TYPE, payload: { typeView } });
  };
};
