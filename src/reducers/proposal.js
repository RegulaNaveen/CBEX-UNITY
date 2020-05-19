// @flow
import { Map, fromJS } from 'immutable';
import {
  PROPOSAL_INFO,
  PROPOSAL_INFO_LOADING,
  PROPOSAL_INFO_ERROR,
  PROPOSAL_ANSWER,
  PROPOSAL_ANSWER_LOADING,
  PROPOSAL_ANSWER_ERROR,
  QUESTION_SECTION_INFO,
  QUESTION_SECTION_LOADING,
  QUESTION_SECTION_ERROR,
  ANSWER_TYPES_INFO,
  ANSWER_TYPES_LOADING,
  ANSWER_TYPES_ERROR,
  ROLES_INFO,
  ROLES_LOADING,
  ROLES_ERROR
} from '../actions/proposal-types';
import type { ApiAction } from '../actions/action-types';

const INITIAL_STATE: Map = fromJS({
  proposalQuestions: Map({}),
  isProposalLoading: false,
  proposalError: undefined,
  proposalAnswer: '',
  isProposalAnswerLoading: false,
  proposalAnswerError: undefined,
  proposalQuestionSection: Map({}),
  isQuestionSectionLoading: false,
  questionSectionError: undefined,
  proposalAnswerTypes: Map({}),
  isAnswerTypesLoading: false,
  AnswerTypesError: undefined,
  proposalRoles: Map({}),
  isRolesLoading: false,
  rolesError: undefined
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

const onProposalAnswer = (state: Map, action: Object): Map => {
  const {
    payload: { data, questionId: referenceId }
  } = action;

  let newState = fromJS({});

  const indexOfListToUpdate = state
    .get('proposalQuestions')
    .findIndex(listItem => {
      return listItem.questionId === referenceId;
    });

  newState = state.setIn(
    ['proposalQuestions', indexOfListToUpdate, 'answers'],
    data
  );

  const proposalQuestions = newState.get('proposalQuestions');

  return state
    .set('proposalQuestions', proposalQuestions)
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

const onQuestionSectionInfoLoaded = (state: Map, action: Object): Map => {
  const sections = action.payload;
  console.log('REDUCEr', sections);
  return state
    .set('proposalQuestionSection', sections)
    .set('isQuestionSectionLoading', false);
};

const onQuestionSectionLoading = (state: Map): Map => {
  return state
    .set('isQuestionSectionLoading', true)
    .set('questionSectionError', undefined);
};

const onQuestionSectionError = (state: Map, action: Object): Map => {
  const { payload } = action;
  return state
    .set('questionSectionError', payload)
    .set('isQuestionSectionLoading', false);
};

const onAnswerTypesLoaded = (state: Map, action: Object): Map => {
  const answertypes = action.payload;
  return state
    .set('proposalAnswerTypes', answertypes)
    .set('isAnswerTypesLoading', false);
};

const onAnswerTypesLoading = (state: Map): Map => {
  return state
    .set('isAnswerTypesLoading', true)
    .set('AnswerTypesError', undefined);
};

const onAnswerTypesError = (state: Map, action: Object): Map => {
  const { payload } = action;
  return state
    .set('AnswerTypesError', payload)
    .set('isAnswerTypesLoading', false);
};

const onRolesLoaded = (state: Map, action: Object): Map => {
  const roles = action.payload;
  return state.set('proposalRoles', roles).set('isRolesLoading', false);
};

const onRolesLoading = (state: Map): Map => {
  return state.set('isRolesLoading', true).set('rolesError', undefined);
};

const onRolesError = (state: Map, action: Object): Map => {
  const { payload } = action;
  return state.set('rolesError', payload).set('isRolesLoading', false);
};

const actionMap = {
  [PROPOSAL_INFO]: onProsalInfoLoaded,
  [PROPOSAL_INFO_LOADING]: onProposalLoading,
  [PROPOSAL_INFO_ERROR]: onProposalError,
  [PROPOSAL_ANSWER]: onProposalAnswer,
  [PROPOSAL_ANSWER_LOADING]: onProposalAnswerLoading,
  [PROPOSAL_ANSWER_ERROR]: onProposalAnswerError,
  [QUESTION_SECTION_INFO]: onQuestionSectionInfoLoaded,
  [QUESTION_SECTION_LOADING]: onQuestionSectionLoading,
  [QUESTION_SECTION_ERROR]: onQuestionSectionError,
  [ANSWER_TYPES_INFO]: onAnswerTypesLoaded,
  [ANSWER_TYPES_LOADING]: onAnswerTypesLoading,
  [ANSWER_TYPES_ERROR]: onAnswerTypesError,
  [ROLES_INFO]: onRolesLoaded,
  [ROLES_LOADING]: onRolesLoading,
  [ROLES_ERROR]: onRolesError
};

export default function(
  state: Map<string, any> = INITIAL_STATE,
  action: ApiAction<any, any>
): Map {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
