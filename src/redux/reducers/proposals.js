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
  UPDATE_DASHBOARD_OPPORTUNITY
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
  assignTabRows: 10,
  nonEditableSF: []
});

const setProposals = (state: Map, action: Object): Map => {
  const { proposals } = action.payload;
  return state
    .set('favouriteProposals', '')
    .set('proposals', proposals)
    .set('proposalsLoading', false);
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
    .set('filteredProposals', '')
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
    .set('proposals', '')
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

const setProposalDetails = (state, action) => {
  const data = action.payload;
  const mapper = DashboardSFUpDATE;
  let proposals = state.get('proposals');
  let favouriteProposals = state.get('favouriteProposals');

  if (
    favouriteProposals &&
    Array.isArray(favouriteProposals) &&
    favouriteProposals.length
  ) {
    if (
      data &&
      data.data &&
      data.data.proposalDetails &&
      data.fromSF &&
      !data?.data?.bidStatusKey
    ) {
      const updateProposals = favouriteProposals.map(value => {
        if (data.data.oppNo === value['opportunity number']) {
          value['bid due date'] =
            data.data.proposalDetails?.['Bid due date'] || '';
          value['verbatim indication'] =
            data.data.proposalDetails['Verbatim indication'] || '';
          value['therapeuticArea'] =
            data.data.proposalDetails?.['Therapeutic area'] || '';
          value['phase'] = data.data.proposalDetails['Phase'] || '';
          value['protocol number'] =
            data.data.proposalDetails?.['Protocol number'] || '';
          value['product'] = data.data.proposalDetails?.['Product name'] || '';
          value['customer'] = data.data.proposalDetails?.Customer || '';
          value['bidNo'] = data.data.proposalDetails?.bidNo || '';
          if (data?.data?.proposalDetails?.['opportunity status']) {
            value['opportunity status'] =
              data.data.proposalDetails?.['opportunity status'] || '';
          }
          if (data?.data?.proposalDetails?.['opportunityName']) {
            value['opportunityName'] =
              data.data.proposalDetails?.['opportunityName'] || '';
          }
        }
        return value;
      });
      favouriteProposals = updateProposals;
    }
    if (!data.fromSF && !data?.data?.bidStatusKey) {
      const updateProposals = favouriteProposals.map(value => {
        if (
          data?.data?.oppNo &&
          data?.data?.oppNo === value['opportunity number']
        ) {
          value[mapper[data.data.sfField]] = data.data.answer;
        }
        return value;
      });
      favouriteProposals = updateProposals;
    }

    if (
      data &&
      data?.data &&
      data?.data?.bidStatusKey &&
      data?.data?.proposalDetails
    ) {
      const updateProposals = favouriteProposals.map(value => {
        if (
          data.data.proposalDetails['CRM #'] === value['opportunity number']
        ) {
          value['bidStopStatus'] = data.data.bidStopStatus || '';
        }
        return value;
      });
      favouriteProposals = updateProposals;
    }
    const results = cloneDeep(favouriteProposals);
    return state.set('favouriteProposals', [...[...results]]);
  }

  if (proposals) {
    if (
      data &&
      data.data &&
      data.data.proposalDetails &&
      data.fromSF &&
      !data?.data?.bidStatusKey
    ) {
      const updateProposals = proposals.map(value => {
        if (data.data.oppNo === value['opportunity number']) {
          value['bid due date'] =
            data.data.proposalDetails?.['Bid due date'] || '';
          value['verbatim indication'] =
            data.data.proposalDetails['Verbatim indication'] || '';
          value['therapeuticArea'] =
            data.data.proposalDetails?.['Therapeutic area'] || '';
          value['phase'] = data.data.proposalDetails['Phase'] || '';
          value['protocol number'] =
            data.data.proposalDetails?.['Protocol number'] || '';
          value['product'] = data.data.proposalDetails?.['Product name'] || '';
          value['customer'] = data.data.proposalDetails?.Customer || '';
          value['bidNo'] = data.data.proposalDetails?.bidNo || '';
          if (data?.data?.proposalDetails?.['opportunity status']) {
            value['opportunity status'] =
              data.data.proposalDetails?.['opportunity status'] || '';
          }
          if (data?.data?.proposalDetails?.['opportunityName']) {
            value['opportunityName'] =
              data.data.proposalDetails?.['opportunityName'] || '';
          }
        }
        return value;
      });
      proposals = updateProposals;
    }
    if (!data.fromSF && !data?.data?.bidStatusKey) {
      const updateProposals = proposals.map(value => {
        if (
          data?.data?.oppNo &&
          data?.data?.oppNo === value['opportunity number']
        ) {
          value[mapper[data.data.sfField]] = data.data.answer;
        }
        return value;
      });
      proposals = updateProposals;
    }

    if (
      data &&
      data?.data &&
      data?.data?.bidStatusKey &&
      data?.data?.proposalDetails
    ) {
      const updateProposals = proposals.map(value => {
        if (
          data.data.proposalDetails['CRM #'] === value['opportunity number']
        ) {
          value['bidStopStatus'] = data.data.bidStopStatus || '';
        }
        return value;
      });
      proposals = updateProposals;
    }
    const results = cloneDeep(proposals);
    return state.set('proposals', [...[...results]]);
  }
  return state;
};

const updateDashboradBid = (state, action) => {
  const { data, oppId } = action.payload;
  let proposals = state.get('proposals');
  let favouriteProposals = state.get('favouriteProposals');
  if (data && data?.newBid && favouriteProposals) {
    const updateProposals = favouriteProposals?.map(value => {
      if (oppId && oppId === value['opportunity number']) {
        value['bidNo'] = parseInt(value['bidNo']) + 1 || '';
        value['bid due date'] = moment(
          data?.proposalDetails['Bid due date']
        ).format('YYYY-MM-DD');
      }
      return value;
    });
    return state.set('favouriteProposals', [...[...updateProposals]]);
  }

  if (data && data?.newBid && proposals) {
    const updateProposals = proposals?.map(value => {
      if (oppId && oppId === value['opportunity number']) {
        value['bidNo'] = parseInt(value['bidNo']) + 1 || '';
        value['bid due date'] = moment(
          data?.proposalDetails['Bid due date']
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
  if (favouriteProposals) {
    const updateProposals = favouriteProposals.map(value => {
      if (oppId === value['opportunity number']) {
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
    return state.set('favouriteProposals', [...[...updateProposals]]);
  }

  if (proposals && Array.isArray(proposals) && proposals.length) {
    const updateProposals = proposals.map(value => {
      if (oppId === value['opportunity number']) {
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
  [DASHBOARD_PROPOSAL_DETAIL]: setProposalDetails,
  [UPDATE_DASHBOARD_BID]: updateDashboradBid,
  [UPDATE_DASHBOARD_OPPORTUNITY]: updateDasboardSF
};

export default function(
  state: Map<string, any> = INITIAL_STATE,
  action: ApiAction<any, any>
): Map {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
