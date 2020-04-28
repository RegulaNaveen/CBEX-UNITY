// @flow
import { Map, fromJS } from 'immutable';
import {
  PROPOSAL_INFO,
  PROPOSAL_INFO_LOADING,
  PROPOSAL_INFO_ERROR
} from '../actions/proposal-types';
import type { ApiAction } from '../actions/action-types';

const INITIAL_STATE: Map = fromJS({
  proposalQuestions: Map({}),
  isProposalLoading: false,
  proposalError: undefined
});

const onProsalInfoLoaded = (state: Map, action: Object): Map => {
  const { proposalQuestions } = action.payload;
  return state.set('proposalQuestions', proposalQuestions);
};

const onProposalLoading = (state: Map): Map => {
  return state.set('isProposalLoading', true).set('proposalError', undefined);
};

const onProposalError = (state: Map, action: Object): Map => {
  const { payload } = action;
  return state.set('proposalError', payload).set('isProposalLoading', false);
};

const actionMap = {
  [PROPOSAL_INFO]: onProsalInfoLoaded,
  [PROPOSAL_INFO_LOADING]: onProposalLoading,
  [PROPOSAL_INFO_ERROR]: onProposalError
};

export default function(
  state: Map<string, any> = INITIAL_STATE,
  action: ApiAction<any, any>
): Map {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
