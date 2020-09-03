// @flow
import { Map, fromJS } from 'immutable';
import { REDUX_TYPES } from '../constants';
import type { ApiAction } from '../actions/action-types';

const {
  SET_PROPOSAL_VIEW_TYPE,
  ON_GET_PROPOSALS,
  ERROR_ON_GET_PROPOSALS
} = REDUX_TYPES.PROPOSALS;

const INITIAL_STATE: Map = fromJS({
  selectedViewType: 0,
  proposals: undefined,
  proposalsError: undefined
});

const setProposals = (state: Map, action: Object): Map => {
  const { proposals } = action.payload;
  return state.set('proposals', proposals);
};

const setProposalsError = (state: Map, action: Object): Map => {
  const { error } = action.payload;
  return state.set('proposalsError', error);
};

const setProposalViewType = (state: Map, action: Object): Map => {
  const { payload } = action;
  return state.set('selectedViewType', payload.typeView);
};

const actionMap = {
  [SET_PROPOSAL_VIEW_TYPE]: setProposalViewType,
  [ON_GET_PROPOSALS]: setProposals,
  [ERROR_ON_GET_PROPOSALS]: setProposalsError
};

export default function(
  state: Map<string, any> = INITIAL_STATE,
  action: ApiAction<any, any>
): Map {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
