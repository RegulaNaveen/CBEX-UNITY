// @flow
import { Map, fromJS } from 'immutable'; // NOSONAR
import { REDUX_TYPES } from '../../constants';
import { DashboardSFUpDATE } from '../../constants/app';
import { cloneDeep } from 'lodash';
import moment from 'moment';
import type { ApiAction } from '../actions/action-types';

const {
  SET_PROPOSAL_VIEW_TYPE,
  ON_GET_PROPOSALS,
  ERROR_ON_GET_PROPOSALS,
  ON_PROPOSALS_LOADING,
  ON_FILTER_PROPOSALS,
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
  UPDATE_PROPOSAL_DETAIL_SF,
  TOTAL_COUNT,
  PAGINATION_SIZE,
  FROM,
  SET_DASHBOARD_FILTERS
} = REDUX_TYPES.PROPOSALS;

const INITIAL_STATE: Map = fromJS({
  filteredProposals: undefined,
  isFiltering: false,
  proposals: undefined,
  favouriteProposals: undefined,
  proposalsError: undefined,
  proposalsFilters: undefined,
  proposalsLoading: false,
  selectedViewType: 1,
  page: 1,
  numRows: 15,
  assignTabRows: 15,
  nonEditableSF: [],
  totalCount: 0,
  paginationSize: 15,
  from: 0,
  dashboardFilters: {
    opportunityNumber: '',
    opportunityName: '',
    customer: '',
    protocolNumber: '',
    phase: '',
    product: '',
    therapeuticArea: '',
    indication: '',
    bidDueDate: '',
    opportunityStatus: '',
    teamMember: '',
    opportunityCustomname: ''
  }
});

const setProposals = (state: Map, action: Object): Map => {
  const { proposals } = action.payload;
  return state.set('proposals', proposals).set('proposalsLoading', false);
};

const setProposalsError = (state: Map, action: Object): Map => {
  const { error } = action.payload;
  if (error && error.message && error.message === 'SwitchError')
    return state.set('proposalsError', error);
  else return state.set('proposalsError', error).set('proposalsLoading', false);
};

const onSetFilteringProposals = (state: Map, action: Object): Map => {
  const { filteredProposals, isFiltering } = action.payload;
  return state
    .set('favouriteProposals', '')
    .set('proposals', '')
    .set('filteredProposals', filteredProposals)
    .set('isFiltering', isFiltering);
};

const onSetProposalsFilters = (state: Map, action: Object): Map => {
  const { proposalsFilters } = action.payload;
  return state.set('proposalsFilters', proposalsFilters);
};

const onSetProposalsFavourite = (state: Map, action: Object): Map => {
  const { proposalsFavourite } = action.payload;
  return state
    .set('favouriteProposals', proposalsFavourite)
    .set('proposalsLoading', false);
};

const setProposalViewType = (state: Map, action: Object): Map => {
  const { payload } = action;
  return state.set('selectedViewType', payload.typeView);
};

const onProposalsLoading = (state: Map): Map =>
  state
    .set('proposals', undefined)
    .set('proposalsFilters', undefined)
    .set('favouriteProposals', undefined)
    .set('proposalsLoading', true)
    .set('proposalsError', undefined);

const setProposalFiltering = (state, action) =>
  state.set('proposalsLoading', action.payload);

const setPage = (state, action) => state.set('page', action.payload);

const setNumOfRows = (state, action) => state.set('numRows', action.payload);

const updateDashboradBid = (state, action) => {
  const { data, oppId } = action.payload;
  let proposals = state.get('proposals');
  let favouriteProposals = state.get('favouriteProposals');
  if (data && data?.newBid && favouriteProposals && !data?.data?.bidStatusKey) {
    const updateProposals = favouriteProposals?.map(value => {
      if (oppId && oppId === value['opportunity number']) {
        value['proposalId'] = data.proposalId;
        value['bidNo'] = data?.proposalDetails?.bidNo
          ? data?.proposalDetails?.bidNo
          : parseInt(value['bidNo']);
        value['bid due date'] = moment(
          data?.proposalDetails?.['Bid due date']
        ).format('YYYY-MM-DD');
      }
      return value;
    });
    state.set('favouriteProposals', [...[...updateProposals]]);
  }

  if (data && data?.newBid && proposals && !data?.data?.bidStatusKey) {
    const updateProposals = proposals?.map(value => {
      if (oppId && oppId === value['opportunity number']) {
        value['proposalId'] = data.proposalId;
        value['bidNo'] = data?.proposalDetails?.bidNo
          ? data?.proposalDetails?.bidNo
          : parseInt(value['bidNo']);
        value['bid due date'] = moment(
          data?.proposalDetails?.['Bid due date']
        ).format('YYYY-MM-DD');
      }
      return value;
    });
    return state.set('proposals', [...[...updateProposals]]);
  }
  return state;
};
const updateDasboardSF = (state, action) => {
  const { data, oppId } = action.payload;
  let proposals = state.get('proposals');
  let favouriteProposals = state.get('favouriteProposals');
  console.log(`favouriteProposals`, favouriteProposals);
  if (favouriteProposals && !data?.data?.bidStatusKey) {
    const updateProposals = favouriteProposals.map(value => {
      if (data?.proposalId && data?.proposalId === value['proposalId']) {
        value['bid due date'] = data.proposalDetails?.['Bid due date'] || '';
        value['verbatim indication'] =
          data.proposalDetails['Verbatim indication'] || '';
        value['therapeuticArea'] =
          data.proposalDetails?.['Therapeutic area'] || '';
        value['phase'] = data.proposalDetails['Phase'] || '';
        value['protocol number'] =
          data.proposalDetails?.['Protocol number'] || '';
        value['product'] = data.proposalDetails?.['Product name'] || '';
        value['customer'] = data.proposalDetails?.Customer || '';
        value['bidNo'] = data.proposalDetails?.bidNo || '';
        if (data.proposalDetails?.['opportunity status']) {
          value['opportunity status'] =
            data.proposalDetails?.['opportunity status'] || '';
        }
        if (data.proposalDetails?.['opportunityName']) {
          value['opportunityName'] =
            data.proposalDetails?.['opportunityName'] || '';
        }
      }
      return value;
    });
    state.set('favouriteProposals', [...[...updateProposals]]);
  }

  if (
    proposals &&
    Array.isArray(proposals) &&
    proposals.length &&
    !data?.data?.bidStatusKey
  ) {
    const updateProposals = proposals.map(value => {
      if (data?.proposalId && data?.proposalId === value['proposalId']) {
        value['bid due date'] = data.proposalDetails?.['Bid due date'] || '';
        value['verbatim indication'] =
          data.proposalDetails['Verbatim indication'] || '';
        value['therapeuticArea'] =
          data.proposalDetails?.['Therapeutic area'] || '';
        value['phase'] = data.proposalDetails['Phase'] || '';
        value['protocol number'] =
          data.proposalDetails?.['Protocol number'] || '';
        value['product'] = data.proposalDetails?.['Product name'] || '';
        value['customer'] = data.proposalDetails?.Customer || '';
        value['bidNo'] = data.proposalDetails?.bidNo || '';
        if (data.proposalDetails?.['opportunity status']) {
          value['opportunity status'] =
            data.proposalDetails?.['opportunity status'] || '';
        }
        if (data.proposalDetails?.['opportunityName']) {
          value['opportunityName'] =
            data.proposalDetails?.['opportunityName'] || '';
        }
      }
      return value;
    });
    return state.set('proposals', [...[...updateProposals]]);
  }
  return state;
};

const updateBidStopStatus = (state, action) => {
  const data = action.payload;
  const mapper = DashboardSFUpDATE;
  let proposals = state.get('proposals');
  let favouriteProposals = state.get('favouriteProposals');
  if (data && data?.data && data?.data?.questionSfField && favouriteProposals) {
    const updatefavouriteProposals = favouriteProposals.map(value => {
      if (
        data &&
        data?.data &&
        data?.data?.proposalId === value['proposalId']
      ) {
        if (
          data?.data?.questionSfField === 'Name' &&
          data?.data?.questionsfObject === 'Opportunity'
        ) {
          value['opportunityName'] = data.data.answer;
        } else {
          value[mapper[data?.data?.questionSfField]] = data.data.answer;
        }
      }
      return value;
    });
    state.set('proposals', [...[...updatefavouriteProposals]]);
  }

  if (data && data?.data && data?.data?.questionSfField && proposals) {
    const updateProposals = proposals.map(value => {
      if (
        data &&
        data?.data &&
        data?.data?.proposalId === value['proposalId']
      ) {
        if (
          data?.data?.questionSfField === 'Name' &&
          data?.data?.questionsfObject === 'Opportunity'
        ) {
          value['opportunityName'] = data.data.answer;
        } else {
          value[mapper[data?.data?.questionSfField]] = data.data.answer;
        }
      }
      return value;
    });
    return state.set('proposals', [...[...updateProposals]]);
  }

  if (
    data &&
    data?.data &&
    data?.data?.bidStatusKey &&
    data?.data?.proposalDetails &&
    favouriteProposals
  ) {
    const updatefavouriteProposals = favouriteProposals.map(value => {
      if (
        data &&
        data?.data &&
        data?.data?.proposalId === value['proposalId']
      ) {
        value['bidStopStatus'] = data.data.bidStopStatus || '';
      }
      return value;
    });
    state.set('proposals', [...[...updatefavouriteProposals]]);
  }

  if (
    proposals &&
    data &&
    data?.data &&
    data?.data?.bidStatusKey &&
    data?.data?.proposalDetails
  ) {
    const updateProposals = proposals.map(value => {
      if (
        data &&
        data?.data &&
        data?.data?.proposalId === value['proposalId']
      ) {
        value['bidStopStatus'] = data.data.bidStopStatus || '';
      }
      return value;
    });
    return state.set('proposals', [...[...updateProposals]]);
  }
  return state;
};

const setAssignedTabNumOfRows = (state, action) =>
  state.set('assignTabRows', action.payload);

const setNonEditableField = (state, action) =>
  state.set('nonEditableSF', action.payload);

const actionMap = {
  [SET_PROPOSAL_VIEW_TYPE]: setProposalViewType,
  [ON_GET_PROPOSALS]: setProposals,
  [ERROR_ON_GET_PROPOSALS]: setProposalsError,
  [ON_PROPOSALS_LOADING]: onProposalsLoading,
  [ON_FILTER_PROPOSALS]: onSetFilteringProposals,
  [ON_SET_PROPOSALS_FILTERS]: onSetProposalsFilters,
  [SET_PROPOSAL_FILTERING]: setProposalFiltering,
  [SET_PAGE]: setPage,
  [SET_NUM_OF_ROWS]: setNumOfRows,
  [SET_ASSIGNED_TAB_NUM_OF_ROWS]: setAssignedTabNumOfRows,
  [NON_EDITABLE_SF_FIELD]: setNonEditableField,
  [ON_GET_FAVOURITE]: onSetProposalsFavourite,
  [UPDATE_DASHBOARD_BID]: updateDashboradBid,
  [UPDATE_DASHBOARD_OPPORTUNITY]: updateDasboardSF,
  [UPDATE_PROPOSAL_DETAIL_SF]: updateBidStopStatus,
  [DASHBOARD_PROPOSAL_DETAIL]: updateBidStopStatus,
  [TOTAL_COUNT]: (state, action) => state.set('totalCount', action.payload),
  [PAGINATION_SIZE]: (state, action) =>
    state.set('paginationSize', action.payload),
  [FROM]: (state, action) => state.set('from', action.payload),
  [SET_DASHBOARD_FILTERS]: (state, action) =>
    state.set('dashboardFilters', action.payload)
};

export default function(
  state: Map<string, any> = INITIAL_STATE,
  action: ApiAction<any, any>
): Map {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
