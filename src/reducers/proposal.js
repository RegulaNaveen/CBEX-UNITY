// @flow
import { Map, fromJS } from 'immutable';
import {
  PROPOSAL_INFO,
  PROPOSAL_INFO_LOADING,
  PROPOSAL_INFO_ERROR,
  PROPOSAL_ANSWER,
  PROPOSAL_ANSWER_LOADING,
  PROPOSAL_ANSWER_ERROR
} from '../actions/proposal-types';
import type { ApiAction } from '../actions/action-types';

const INITIAL_STATE: Map = fromJS({
  proposalQuestions: Map({}),
  isProposalLoading: false,
  proposalError: undefined,
  proposalAnswer: '',
  isProposalAnswerLoading: false,
  proposalAnswerError: undefined
});

const onProsalInfoLoaded = (state: Map, action: Object): Map => {
  const { proposalQuestions } = action.payload;
  return state
    .set('proposalQuestions', proposalQuestions)
    .set('isProposalLoading', false);
};

const onProposalLoading = (state: Map): Map => {
  return state.set('isProposalLoading', true).set('proposalError', undefined);
};

const onProposalError = (state: Map, action: Object): Map => {
  const { payload } = action;
  return state.set('proposalError', payload).set('isProposalLoading', false);
};

const onProposalAnswer = (state: Map): Map => {
  return state
    .set('proposalAnswer', INITIAL_STATE.proposalAnswer)
    .set('isProposalAnswerLoading', false);
};

const onProposalAnswerLoading = (state: Map): Map => {
  return state
    .set('isProposalAnswerLoading', true)
    .set('proposalAnswerError', undefined);
};

const onProposalAnswerError = (state: Map, action: Object): Map => {
  const { payload } = action;
  return state
    .set('proposalAnswerError', payload)
    .set('isProposalAnswerLoading', false);
};

const actionMap = {
  [PROPOSAL_INFO]: onProsalInfoLoaded,
  [PROPOSAL_INFO_LOADING]: onProposalLoading,
  [PROPOSAL_INFO_ERROR]: onProposalError,
  [PROPOSAL_ANSWER]: onProposalAnswer,
  [PROPOSAL_ANSWER_LOADING]: onProposalAnswerLoading,
  [PROPOSAL_ANSWER_ERROR]: onProposalAnswerError
};

export default function(
  state: Map<string, any> = INITIAL_STATE,
  action: ApiAction<any, any>
): Map {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
