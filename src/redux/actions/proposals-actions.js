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
  getFavoritesOpportunity,
  onGetFilterValues,
  onGetSFNonEditabelField
} from '../../api/proposals';
import {
  selectFavourites,
  selectCustomNameMap,
  selectFavouritesUpdatedDateMap
} from '../selectors/sso-auth';
import { getProposals, getFavouriteProposals } from '../selectors';
import { getfetchAllFlags } from '../selectors/proposal';
import { getPage, getNumOfRows } from '../selectors/proposals';

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
  NON_EDITABLE_SF_FIELD,
  ON_GET_FAVOURITE,
  DASHBOARD_PROPOSAL_DETAIL,
  UPDATE_DASHBOARD_BID,
  UPDATE_DASHBOARD_OPPORTUNITY,
  TOTAL_COUNT,
  PAGINATION_SIZE,
  FROM,
  SET_DASHBOARD_FILTERS
} = REDUX_TYPES.PROPOSALS;

function removeDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

const formatProposalGrid = proposal => {
  const formatted = {
    'bid due date': proposal?.['Bid due date'],
    'opportunity number': proposal['CRM #'],
    'protocol number': proposal['Protocol number'],
    'opportunity status': proposal['opportunityStatus'],
    'verbatim indication': proposal['Verbatim indication'],
    bidNo: proposal['bidNo'],
    isFavourite: proposal.isFavourite,
    customer: proposal.Customer,
    customName: proposal.customName,
    bidStopStatus: proposal.bidStatus,
    nextMilestone: proposal.nextMilestone,
    opportunityName: proposal.opportunityName,
    isApprovalCountPresent: proposal.isApprovalCountPresent,
    bidType: proposal.bidType
  };
  return formatted;
};

export const formatProposal = (
  proposal: Object,
  favoritesMap: Object,
  customNameMap: Object = {}
): Object => {
  const formattedProposal = {};

  const {
    proposalDetails,
    proposalId,
    opportunityName,
    opportunityOverview,
    usersList,
    approvalsCount,
    isApprovalCountPresent,
    bidStopStatus,
    bidType
  } = proposal;
  // if (!isEmpty(opportunityOverview)) {
  formattedProposal.proposalId = proposalId;
  formattedProposal.bidType = bidType;

  formattedProposal.opportunityName = opportunityName;
  formattedProposal['opportunity number'] = proposalDetails['CRM #'];
  formattedProposal['bidNo'] = proposalDetails['bidNo'];
  formattedProposal.customer = proposalDetails.Customer;
  formattedProposal['protocol number'] = proposalDetails['Protocol number'];
  formattedProposal.phase = proposalDetails.Phase;
  formattedProposal.product = proposalDetails['Product name'];
  formattedProposal['verbatim indication'] =
    proposalDetails['Verbatim indication'];
  formattedProposal.therapeuticArea = proposalDetails['Therapeutic area'];
  formattedProposal['bid due date'] = proposalDetails?.['Bid due date'];
  formattedProposal['opportunity status'] =
    opportunityOverview.OpportunityStatus || '';
  formattedProposal.usersList = usersList;
  formattedProposal.approvalsCount = approvalsCount;
  formattedProposal.isApprovalCountPresent = isApprovalCountPresent;
  formattedProposal.bidStopStatus = bidStopStatus || false;
  formattedProposal.isFavourite = !!favoritesMap[`${proposalDetails['CRM #']}`];
  formattedProposal.customName =
    customNameMap[`${proposalDetails['CRM #']}`] || '';
  formattedProposal.nextMilestone = proposal.nextMilestone || [];
  return formattedProposal;
  // }

  // return {};
};

export const getAllProposals = (): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<Object, Object>) => {
    dispatch({ type: ON_PROPOSALS_LOADING, payload: {} });
    try {
      const { data } = await onGetAllProposals({
        from: 0,
        size: 15,
        filter: {}
      });
      if (!isEmpty(data)) {
        const { proposals } = data;
        const formatted = proposals.map(proposal => formatProposal(proposal));
        dispatch({ type: ON_GET_PROPOSALS, payload: { proposals: formatted } });
      }
    } catch (error) {
      console.log('error', error);
      dispatch({ type: ERROR_ON_GET_PROPOSALS, payload: { error } });
    }
  };
};

export const updateDashboardBid = (data): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: UPDATE_DASHBOARD_BID,
      payload: data
    });
  };
};

export const syncDashboardOpportunity = (data): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: UPDATE_DASHBOARD_OPPORTUNITY,
      payload: data
    });
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

export const getUserMail = lookupValue => {
  const results = /\((.*)\)/.exec(lookupValue);
  if (results !== null) {
    return results[1];
  }
  return null;
};

export const getDateRangeFormatted = range => {
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
  tabIndex: Number,
  from: number = 0,
  size: number = 15
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
          case 'Customized opportunity name': {
            filterPayload.opportunityCustomname = value;
            break;
          }
          default:
            break;
        }
      });
      const allFlags = getfetchAllFlags(getState());
      let data = { proposals: [] };
      if (Number(tabIndex) === 0) {
        const userEmail = localStorage.getItem('userEmail') || '';
        if (Object.keys(filterPayload).length > 1) {
          const response = await getAssignedOpportunity(
            filterPayload,
            true,
            userEmail
          );
          data = response.data;
        } else {
          const response = await getAssignedOpportunity(
            filterPayload,
            false,
            userEmail
          );
          data = response.data;
        }
      } else if (allFlags.favouriteFlag && Number(tabIndex) === 1) {
        const userEmail = localStorage.getItem('userEmail') || '';
        const response = await getFavoritesOpportunity(
          filterPayload,
          userEmail
        );
        data = response.data;
      } else {
        let checkTab = allFlags.favouriteFlag
          ? Number(tabIndex) === 2
          : Number(tabIndex) === 1;
        if (checkTab) {
          const userEmail = localStorage.getItem('userEmail') || '';
          if (Object.keys(filterPayload).length > 1) {
            const response = await getRecentOpportunity(
              filterPayload,
              true,
              userEmail
            );
            data = response.data;
          } else {
            const response = await getRecentOpportunity(
              filterPayload,
              false,
              userEmail
            );
            data = response.data;
          }
        }
      }
      if (!isEmpty(data)) {
        let proposals = [];
        if (Number(tabIndex) === 3) {
          proposals = data.map(item => item?.latestProposal);
        } else {
          proposals = data.proposals;
          // const { proposals } = data;
        }
        const favourites = selectFavourites(getState()).toJS();
        const customNameMap = selectCustomNameMap(getState()).toJS();

        const favouritesMap = favourites.reduce((favMap, fav) => {
          favMap[fav] = true;
          return favMap;
        }, {});
        const formatted = proposals.map(proposal =>
          formatProposal(proposal, favouritesMap, customNameMap)
        );

        if (allFlags.favouriteFlag && Number(tabIndex) === 1) {
          const favouritesUpdatedDateMap = selectFavouritesUpdatedDateMap(
            getState()
          ).toJS();
          favouritesUpdatedDateMap
            .sort((a, b) =>
              a['updated date'] > b['updated date']
                ? 1
                : b['updated date'] > a['updated date']
                ? -1
                : 0
            )
            .reverse();
          const uniqueFavourites = removeDuplicates(favouritesUpdatedDateMap);
          let orderedProposal = [];
          for (const favorite of uniqueFavourites) {
            for (const proposal of formatted) {
              if (
                proposal['opportunity number'] ===
                favorite['opportunity number']
              )
                orderedProposal.push(proposal);
            }
          }
          dispatch({
            type: ON_GET_FAVOURITE,
            payload: { proposalsFavourite: orderedProposal }
          });
        } else {
          dispatch({
            type: ON_GET_PROPOSALS,
            payload: { proposals: formatted }
          });
        }
      }
    } catch (error) {
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

export const updateProposal = (oppNumber, favourite, proposalDetails) => async (
  dispatch,
  getState
) => {
  try {
    let proposalsFavourite = getFavouriteProposals(getState());
    let proposals = getProposals(getState());
    const proposalIndex = proposals.findIndex(
      proposal => proposal['opportunity number'] === oppNumber
    );
    if (proposalIndex > -1) {
      proposals[proposalIndex]['isFavourite'] = favourite;
      dispatch({ type: ON_GET_PROPOSALS, payload: { proposals } });
    }

    const proposalCheck = proposalsFavourite.some(
      proposal => proposal['opportunity number'] === oppNumber
    );
    if (!proposalCheck && favourite) {
      delete proposalDetails.favourite;
      const { dataFromGrid } = proposalDetails;
      proposalDetails['isFavourite'] = favourite;
      proposals[proposalIndex]
        ? proposalsFavourite.unshift(proposals[proposalIndex])
        : dataFromGrid
        ? proposalsFavourite.unshift(formatProposalGrid(proposalDetails))
        : proposalsFavourite.unshift(proposalDetails);
      dispatch({ type: ON_GET_FAVOURITE, payload: { proposalsFavourite } });
    }
    if (proposalCheck && !favourite) {
      let index = proposalsFavourite.findIndex(
        proposal => proposal['opportunity number'] === oppNumber
      );
      proposalsFavourite.splice(index, 1);
      dispatch({ type: ON_GET_FAVOURITE, payload: { proposalsFavourite } });
    }
  } catch (error) {
    console.log(error);
  }
};

export const setPaginationSize = size => ({
  type: PAGINATION_SIZE,
  payload: size
});

export const setFrom = from => ({
  type: FROM,
  payload: from
});

export const setDashboardFilters = filters => async (dispatch, getState) => {
  dispatch({
    type: SET_DASHBOARD_FILTERS,
    payload: filters
  });
};
