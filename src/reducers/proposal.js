// @flow
import { Map, fromJS } from 'immutable';
import { PROPOSAL_ACTION_TESTING } from '../actions/proposal-types';
import type { ApiAction } from '../actions/action-types';

const INITIAL_STATE: Map = fromJS({
  testingData: undefined
});

const onGetTestingData = (state, action): Map => {
  const { payload } = action;
  return state.set('testingData', payload);
};

const actionMap = {
  [PROPOSAL_ACTION_TESTING]: onGetTestingData
};

export default function(
  state: Map<string, any> = INITIAL_STATE,
  action: ApiAction<any, any>
): Map {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
