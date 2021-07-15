// @flow
import { Map, fromJS } from 'immutable';
import { REDUX_TYPES } from '../../constants';
import type { ApiAction } from '../actions/action-types';

const {
  SET_PROPOSAL_VIEW_TYPE,
  ON_GET_PROPOSALS,
  ERROR_ON_GET_PROPOSALS,
  ON_PROPOSALS_LOADING,
  ON_FILTER_PROPOSALS,
  ON_SET_PROPOSALS_FILTERS,
} = REDUX_TYPES.PROPOSALS;

const INITIAL_STATE: Map = fromJS({
  filteredProposals: undefined,
  isFiltering: false,
  proposals: undefined,
  proposalsError: undefined,
  proposalsFilters: undefined,
  proposalsLoading: false,
  selectedViewType: 1,
});

const setProposals = (state: Map, action: Object): Map => {
  const { proposals } = action.payload;
  return state.set('proposals', proposals).set('proposalsLoading', false);
};

const setProposalsError = (state: Map, action: Object): Map => {
  const { error } = action.payload;
  return state.set('proposalsError', error).set('proposalsLoading', false);
};

const onSetFilteringProposals = (state: Map, action: Object): Map => {
  const { filteredProposals, isFiltering } = action.payload;
  return state
    .set('filteredProposals', filteredProposals)
    .set('isFiltering', isFiltering);
};

const onSetProposalsFilters = (state: Map, action: Object): Map => {
  const { proposalsFilters } = action.payload;
  return state.set('proposalsFilters', proposalsFilters);
};

const setProposalViewType = (state: Map, action: Object): Map => {
  const { payload } = action;
  return state.set('selectedViewType', payload.typeView);
};

const onProposalsLoading = (state: Map): Map =>
  state.set('proposalsLoading', true).set('proposalsError', undefined);

const actionMap = {
  [SET_PROPOSAL_VIEW_TYPE]: setProposalViewType,
  [ON_GET_PROPOSALS]: setProposals,
  [ERROR_ON_GET_PROPOSALS]: setProposalsError,
  [ON_PROPOSALS_LOADING]: onProposalsLoading,
  [ON_FILTER_PROPOSALS]: onSetFilteringProposals,
  [ON_SET_PROPOSALS_FILTERS]: onSetProposalsFilters,
};

export default function (
  state: Map<string, any> = INITIAL_STATE,
  action: ApiAction<any, any>
): Map {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
