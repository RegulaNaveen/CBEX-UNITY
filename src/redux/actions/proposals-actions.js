// @flow
import { isEmpty } from 'lodash';
import moment from 'moment';
import type { Dispatch, ThunkAction } from './action-types';
import { REDUX_TYPES } from '../../constants';
import {
  onGetAllProposals,
  onGetByStatus,
  getRecentOpportunity,
  getAssignedOpportunity,
  onGetFilterValues,
  onGetSFNonEditabelField
} from '../../api/proposals';
import { selectFavourites } from '../selectors/sso-auth';
import { getProposals } from '../selectors';

const {
  SET_PROPOSAL_VIEW_TYPE,
  ON_GET_PROPOSALS,
  ERROR_ON_GET_PROPOSALS,
  ON_PROPOSALS_LOADING,
  ON_SET_PROPOSALS_FILTERS,
  SET_PROPOSAL_FILTERING,
  SET_PAGE,
  SET_NUM_OF_ROWS,
  SET_ASSIGNED_TAB_NUM_OF_ROWS,
  NON_EDITABLE_SF_FIELD
} = REDUX_TYPES.PROPOSALS;

const formatProposal = (proposal: Object, favoritesMap: Object): Object => {
  const formattedProposal = {};

  const {
    proposalDetails,
    proposalId,
    opportunityName,
    opportunityOverview,
    usersList,
    approvalsCount,
    isApprovalCountPresent
  } = proposal;

  if (!isEmpty(opportunityOverview)) {
    formattedProposal.proposalId = proposalId;
    formattedProposal.opportunityName = opportunityName;
    formattedProposal['opportunity number'] = proposalDetails['CRM #'];
    formattedProposal.customer = proposalDetails.Customer;
    formattedProposal['protocol number'] = proposalDetails['Protocol number'];
    formattedProposal.phase = proposalDetails.Phase;
    formattedProposal.product = proposalDetails['Product name'];
    formattedProposal['verbatim indication'] =
      proposalDetails['Verbatim indication'];
    formattedProposal.therapeuticArea = proposalDetails['Therapeutic area'];
    formattedProposal['bid due date'] = proposalDetails['Bid due date'];
    formattedProposal['opportunity status'] =
      opportunityOverview.OpportunityStatus || '';
    formattedProposal.usersList = usersList;
    formattedProposal.approvalsCount = approvalsCount;
    formattedProposal.isApprovalCountPresent = isApprovalCountPresent;
    formattedProposal.isFavourite = !!favoritesMap[
      `${proposalDetails['CRM #']}`
    ];
    return formattedProposal;
  }

  return {};
};

export const getAllProposals = (): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<Object, Object>) => {
    dispatch({ type: ON_PROPOSALS_LOADING, payload: {} });

    try {
      const { data } = await onGetAllProposals({ source: 'es' });

      if (!isEmpty(data)) {
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

const getUserMail = lookupValue => {
  const results = /\((.*)\)/.exec(lookupValue);
  if (results !== null) {
    return results[1];
  }
  return null;
};

const getDateRangeFormatted = range => {
  if (range) {
    return {
      s: moment(range.from).format('yyyy-MM-DD'),
      e: moment(range.to).format('yyyy-MM-DD')
    };
  }
  return null;
};

export const setPageAction = (page: Number) => {
  return dispatch => {
    dispatch({
      type: SET_PAGE,
      payload: page
    });
  };
};

export const onFilteringProposals = (
  filters: FilteredData,
  tabIndex: Number
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>, getState) => {
    try {
      const filterPayload = { source: 'es' };
      dispatch({
        type: SET_PROPOSAL_FILTERING,
        payload: true
      });

      const cleanFilters = Object.entries(filters)
        // eslint-disable-next-line no-unused-vars
        .filter(([key, value]) => value !== '')
        .map(([key, value]) => [key, value]);

      cleanFilters.forEach(([key, value]: Array<any>) => {
        switch (key) {
          case 'opportunity number':
            filterPayload.opportunityNumber = value;
            break;
          case 'opportunityName':
            filterPayload.opportunityName = value;
            break;
          case 'customer':
            filterPayload.customer = value;
            break;
          case 'protocol number':
            filterPayload.protocolNumber = value;
            break;
          case 'product':
            filterPayload.product = value;
            break;
          case 'verbatim indication':
            filterPayload.verbatimIndication = value;
            break;
          case 'phase':
            filterPayload.phase = value;
            break;
          case 'therapeuticArea':
            filterPayload.therapeuticArea = value;
            break;
          case 'opportunity status':
            filterPayload.opportunityStatus = value;
            break;
          case 'bid due date': {
            const bidDueDate = getDateRangeFormatted(value);
            if (bidDueDate) {
              filterPayload.bidDueDate = bidDueDate;
            }
            break;
          }
          case 'teamMember': {
            const userMail = getUserMail(value);
            if (userMail) {
              filterPayload.teamMember = userMail;
            }
            break;
          }
          default:
            break;
        }
      });
      let data = { proposals: [] };
      if (Number(tabIndex) === 0) {
        const userEmail = localStorage.getItem('userEmail') || '';
        if (Object.keys(filterPayload).length > 1) {
          const response = await onGetByStatus(
            filterPayload,
            'current',
            userEmail
          );
          data = response.data;
        } else {
          const response = await getAssignedOpportunity(
            filterPayload,
            'active',
            userEmail
          );
          data = response.data;
        }
      } else if (Number(tabIndex) === 1) {
        const userEmail = localStorage.getItem('userEmail') || '';
        if (Object.keys(filterPayload).length > 1) {
          const response = await onGetByStatus(
            filterPayload,
            'current',
            userEmail
          );
          data = response.data;
        } else {
          const response = await getRecentOpportunity(
            filterPayload,
            'non-active',
            userEmail
          );
          data = response.data;
        }
      } else {
        const response = await onGetAllProposals(filterPayload);
        data = response.data;
      }

      if (!isEmpty(data)) {
        const { proposals } = data;
        const favourites = selectFavourites(getState()).toJS();
        const favouritesMap = favourites.reduce((favMap, fav) => {
          favMap[fav] = true;
          return favMap;
        }, {});
        const formatted = proposals.map(proposal =>
          formatProposal(proposal, favouritesMap)
        );
        dispatch({ type: ON_GET_PROPOSALS, payload: { proposals: formatted } });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: ERROR_ON_GET_PROPOSALS, payload: { error } });
    } finally {
      dispatch(setPageAction(1)); // resetting page to 1
    }
  };
};

export const getFilteringValues = (): ThunkAction<String, Object> => async (
  dispatch: Dispatch<Object, Object>
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

export const setNumberOfRowsAction = (rowsCount: Number) => {
  return dispatch => {
    dispatch({
      type: SET_NUM_OF_ROWS,
      payload: rowsCount
    });
  };
};
export const setAssignedTabNumberOfRowsAction = (rowsCount: Number) => {
  return dispatch => {
    dispatch({
      type: SET_ASSIGNED_TAB_NUM_OF_ROWS,
      payload: rowsCount
    });
  };
};

export const getSFNonEditabelField = (): ThunkAction<String, Object> => async (
  dispatch: Dispatch<Object, Object>
) => {
  try {
    const { data } = await onGetSFNonEditabelField();
    if (data) {
      dispatch({
        type: NON_EDITABLE_SF_FIELD,
        payload: data
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateProposal = (oppNumber, favourite) => async (
  dispatch,
  getState
) => {
  try {
    let proposals = getProposals(getState());
    const proposalIndex = proposals.findIndex(
      proposal => proposal['opportunity number'] === oppNumber
    );
    if (proposalIndex > -1) {
      proposals[proposalIndex]['isFavourite'] = favourite;
      dispatch({ type: ON_GET_PROPOSALS, payload: { proposals } });
    }
  } catch (error) {
    console.log(error);
  }
};
