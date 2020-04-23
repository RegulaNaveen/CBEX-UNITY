// @flow
import { Map, fromJS } from 'immutable';
import { PROPOSAL_INFO } from '../actions/proposal-types';
import type { ApiAction } from '../actions/action-types';

const INITIAL_STATE: Map = fromJS({
  proposalQuestions: Map({})
});

const onProsalInfoLoaded = (state: Map, action: Object): Map => {
  const { proposalQuestions } = action.payload;
  debugger;
  return state.set('proposalQuestions', proposalQuestions);
};

const actionMap = {
  [PROPOSAL_INFO]: onProsalInfoLoaded
};

export default function(
  state: Map<string, any> = INITIAL_STATE,
  action: ApiAction<any, any>
): Map {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
