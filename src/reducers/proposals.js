// @flow
import { Map, fromJS } from 'immutable';
import { REDUX_TYPES } from '../constants';
import type { ApiAction } from '../actions/action-types';

const {
  SET_PROPOSAL_VIEW_TYPE,
  ON_GET_PROPOSALS,
  ERROR_ON_GET_PROPOSALS,
  ON_PROPOSALS_LOADING
} = REDUX_TYPES.PROPOSALS;

const INITIAL_STATE: Map = fromJS({
  proposals: undefined,
  proposalsError: undefined,
  proposalsLoading: false,
  selectedViewType: 1
});

const setProposals = (state: Map, action: Object): Map => {
  const { proposals } = action.payload;
  return state.set('proposals', proposals).set('proposalsLoading', false);
};

const setProposalsError = (state: Map, action: Object): Map => {
  const { error } = action.payload;
  return state.set('proposalsError', error).set('proposalsLoading', false);
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
  [ON_PROPOSALS_LOADING]: onProposalsLoading
};

export default function(
  state: Map<string, any> = INITIAL_STATE,
  action: ApiAction<any, any>
): Map {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
