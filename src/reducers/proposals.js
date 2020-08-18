// @flow
import { Map, fromJS } from 'immutable';
import { REDUX_TYPES } from '../constants';
import type { ApiAction } from '../actions/action-types';

const { SET_PROPOSAL_VIEW_TYPE } = REDUX_TYPES.PROPOSALS;

const INITIAL_STATE: Map = fromJS({
  selectedViewType: 0
});

const setProposalViewType = (state: Map, action: Object): Map => {
  const { payload } = action;
  return state.set('selectedViewType', payload.typeView);
};

const actionMap = {
  [SET_PROPOSAL_VIEW_TYPE]: setProposalViewType
};

export default function(
  state: Map<string, any> = INITIAL_STATE,
  action: ApiAction<any, any>
): Map {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
