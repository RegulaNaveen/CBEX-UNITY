// @flow
import { cloneDeep } from 'lodash';
import { Map, fromJS } from 'immutable';
import { REDUX_TYPES } from '../../constants';
import type { ApiAction } from '../actions/action-types';

const {
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
  ROLES_ERROR,
  PROPOSAL_SET_QUESTION,
  PROPOSAL_SET_QUESTION_LOADING,
  PROPOSAL_SET_QUESTION_ERROR,
  PROPOSAL_BOX_ID,
  PROPOSAL_BOX_ID_LOADING,
  PROPOSAL_BOX_ID_ERROR,
  UPDATE_MODIFIED_QUESTION,
  ON_FETCHING_VALIDATED_PROPOSAL_DATA,
  VALIDATED_PROPOSAL_DATA,
  VALIDATED_PROPOSAL_DATA_ERROR,
  ON_APPLY_QUESTIONS_FILTER,
  ON_QUESTIONS_FILTERED,
  RESET_QUESTIONS_FILTER,
  CLEAR_QUESTIONS_FILTER,
  EXPAND_ALL_SECTIONS,
  SET_EDIT_QUESTION_DATA,
  PROPOSAL_EDIT_QUESTION,
  PROPOSAL_DELETE_QUESTION
} = REDUX_TYPES.PROPOSAL;

const INITIAL_STATE: Map = fromJS({
  proposalDetails: Map({}),
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
  proposalRoles: undefined,
  isRolesLoading: false,
  rolesError: undefined,
  setQuestionData: Map({}),
  isSetQuestionLoading: false,
  setQuestionError: undefined,
  isGettingBoxId: false,
  onGettingBoxIdError: undefined,
  boxId: '',
  fetchingValidatedProposalData: false,
  validatedProposalData: [],
  validatedProposalDataError: undefined,
  questionsFilter: fromJS({
    myUserRole: {
      checked: false,
      label: 'My User Role',
      className: 'questions-filter__row1-col1'
    },
    interestedParty: {
      checked: false,
      label: 'Interested Party',
      className: 'questions-filter__row2-col1'
    }
  }),
  filteredProposalQuestions: Map({}),
  areAllSectionsExpanded: false,
  editQuestionsData: Map({})
});

const onProsalInfoLoaded = (state: Map, action: Object): Map => {
  const {
    proposalQuestions,
    proposal: { proposalDetails },
    milestones
  } = action.payload;

  // Add agreementId as well in proposal details
  proposalDetails.agreementId = action.payload.proposal.agreementId || '';

  // Adding milestones to Questions Filter
  let questionsFilter = state.get('questionsFilter');
  milestones.forEach(milestone => {
    questionsFilter = questionsFilter.set(
      milestone,
      Map({
        checked: false,
        label: milestone,
        className: 'questions-filter__item'
      })
    );
  });

  return state
    .set('proposalDetails', proposalDetails)
    .set('proposalQuestions', proposalQuestions)
    .set('questionsFilter', questionsFilter)
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
    payload: { data, questionId: referenceId, hasDifferentSFanswer }
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
  newState = newState.setIn(
    ['proposalQuestions', indexOfListToUpdate, 'hasDifferentSFanswer'],
    hasDifferentSFanswer
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

const onSetQuestion = (state: Map, action: Object): Map => {
  const data = action.payload;
  const updatedProposalQuestions = state.get('proposalQuestions');
  updatedProposalQuestions.push(data);

  return state
    .set('proposalQuestions', cloneDeep(updatedProposalQuestions))
    .set('setQuestionData', data)
    .set('isSetQuestionLoading', false);
};

const onSetQuestionLoading = (state: Map): Map => {
  return state
    .set('isSetQuestionLoading', true)
    .set('setQuestionError', undefined);
};

const onSetQuestionError = (state: Map, action: Object): Map => {
  const { payload } = action;
  return state
    .set('setQuestionError', payload)
    .set('isSetQuestionLoading', false);
};

const onGettingProposalBoxId = (state: Map): Map => {
  return state
    .set('isGettingBoxId', true)
    .set('boxId', '')
    .set('onGettingBoxIdError', undefined);
};

const onGetProposalBoxId = (state: Map, action: Object): Map => {
  const { boxId } = action.payload;
  return state
    .set('isGettingBoxId', false)
    .set('boxId', boxId)
    .set('onGettingBoxIdError', undefined);
};

const onGettingBoxIdError = (state: Map, action: Object): Map => {
  const { error } = action.payload;
  return state
    .set('isGettingBoxId', false)
    .set('boxId', '')
    .set('onGettingBoxIdError', error);
};

const onUpdateModifiedQuestion = (state: Map, action: Object): Map => {
  const { question } = action.payload;

  let newState = fromJS({});

  const indexOfQuestionToUpdate = state
    .get('proposalQuestions')
    .findIndex(listItem => listItem.questionId === question.questionId);

  newState = state.setIn(
    ['proposalQuestions', indexOfQuestionToUpdate],
    question
  );

  const proposalQuestions = newState.get('proposalQuestions');

  return state.set('proposalQuestions', proposalQuestions);
};

const onFetchingValidatedProposaData = (state: Map): Map => {
  return state
    .set('fetchingValidatedProposalData', true)
    .set('validatedProposalDataError', undefined);
};

const onGetValidatedProposaData = (state: Map, action: Object): Map => {
  const { data } = action.payload;

  return state
    .set('fetchingValidatedProposalData', false)
    .set('validatedProposalData', fromJS(data));
};

const onValidatedProposaDataError = (state: Map, action: Object): Map => {
  const { error } = action.payload;

  return state
    .set('fetchingValidatedProposalData', false)
    .set('validatedProposalDataError', error);
};

const onApplyQuestionsFilter = (state, action) => {
  const { questionsFilter } = action.payload;
  return state.set('questionsFilter', questionsFilter);
};

const onQuestionsFiltered = (state, action) => {
  const { filteredQuestions } = action.payload;
  return state.set('filteredProposalQuestions', filteredQuestions);
};

const resetQuestionsFilter = state => {
  return state.set('questionsFilter', INITIAL_STATE.get('questionsFilter'));
};

const clearQuestionsFilter = (state, action) => {
  const { questionsFilter } = action.payload;
  return state.set('questionsFilter', questionsFilter);
};

const onExpandAllSections = (state, action) => {
  return state.set('areAllSectionsExpanded', action.payload);
};

const onSetEditQuestionData = (state, action) => {
  return state.set('editQuestionsData', fromJS(action.payload));
};

const onEditQuestion = (state, action) => {
  const { payload: data } = action;
  const questions = state.get('proposalQuestions');
  const questionIndex = questions.findIndex(
    item => item.questionId === data.questionId
  );

  const updatedQuestions = [
    ...questions.slice(0, questionIndex),
    data,
    ...questions.slice(questionIndex + 1, questions.length)
  ];

  return state
    .set('proposalQuestions', cloneDeep(updatedQuestions))
    .set('setQuestionData', data)
    .set('isSetQuestionLoading', false);
};

const onDeleteQuestion = (state, action) => {
  const { payload: questionId } = action;
  const questions = state.get('proposalQuestions');

  const questionIndex = questions.findIndex(
    item => item.questionId === questionId
  );

  const updatedQuestions = [
    ...questions.slice(0, questionIndex),
    ...questions.slice(questionIndex + 1, questions.length)
  ];

  return state
    .set('proposalQuestions', cloneDeep(updatedQuestions))
    .set('setQuestionData', questionId)
    .set('isSetQuestionLoading', false);
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
  [ROLES_ERROR]: onRolesError,
  [PROPOSAL_SET_QUESTION]: onSetQuestion,
  [PROPOSAL_SET_QUESTION_LOADING]: onSetQuestionLoading,
  [PROPOSAL_SET_QUESTION_ERROR]: onSetQuestionError,
  [PROPOSAL_BOX_ID_LOADING]: onGettingProposalBoxId,
  [PROPOSAL_BOX_ID]: onGetProposalBoxId,
  [PROPOSAL_BOX_ID_ERROR]: onGettingBoxIdError,
  [UPDATE_MODIFIED_QUESTION]: onUpdateModifiedQuestion,
  [ON_FETCHING_VALIDATED_PROPOSAL_DATA]: onFetchingValidatedProposaData,
  [VALIDATED_PROPOSAL_DATA]: onGetValidatedProposaData,
  [VALIDATED_PROPOSAL_DATA_ERROR]: onValidatedProposaDataError,
  [ON_APPLY_QUESTIONS_FILTER]: onApplyQuestionsFilter,
  [ON_QUESTIONS_FILTERED]: onQuestionsFiltered,
  [RESET_QUESTIONS_FILTER]: resetQuestionsFilter,
  [CLEAR_QUESTIONS_FILTER]: clearQuestionsFilter,
  [EXPAND_ALL_SECTIONS]: onExpandAllSections,
  [SET_EDIT_QUESTION_DATA]: onSetEditQuestionData,
  [PROPOSAL_EDIT_QUESTION]: onEditQuestion,
  [PROPOSAL_DELETE_QUESTION]: onDeleteQuestion
};

export default function(
  state: Map<string, any> = INITIAL_STATE,
  action: ApiAction<any, any>
): Map {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
