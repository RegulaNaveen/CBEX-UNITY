// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import { fromJS, Map } from 'immutable';
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
  ROLES_ERROR,
  PROPOSAL_SET_QUESTION,
  PROPOSAL_SET_QUESTION_LOADING,
  PROPOSAL_SET_QUESTION_ERROR
} from '../../../src/actions/proposal-types';
import proposalReducer from '../../../src/reducers/proposal';

describe('Proposal reducer', () => {
  const initialState = fromJS({});

  it('should load proposal questions', () => {
    const proposalQuestions = ['Fake Question 1', 'Fake Question 2'];
    const isProposalLoading = false;
    const action = {
      type: PROPOSAL_INFO,
      payload: { proposalQuestions, isProposalLoading }
    };
    const newState = proposalReducer(initialState, action);
    const expectedState = Map({ proposalQuestions, isProposalLoading });
    expect(newState).toEqual(expectedState);
  });

  it('should set proposal error state', () => {
    const errorMessage = 'Fake Error Message';
    const action = {
      type: PROPOSAL_INFO_ERROR,
      payload: 'Fake Error Message'
    };
    const newState = proposalReducer(initialState, action);
    const expectedState = initialState
      .set('proposalError', errorMessage)
      .set('isProposalLoading', false);
    expect(newState).toEqual(expectedState);
  });

  it('should set proposal loading state', () => {
    const action = {
      type: PROPOSAL_INFO_LOADING,
      payload: ''
    };
    const newState = proposalReducer(initialState, action);
    const expectedState = initialState
      .set('isProposalLoading', true)
      .set('proposalError', undefined);
    expect(newState).toEqual(expectedState);
  });

  it('should set proposal question answers', () => {
    const proposalQuestions = [
      [
        {
          questionId: 1,
          answers: []
        }
      ],
      [
        {
          questionId: 2,
          answers: []
        }
      ]
    ];
    const isProposalAnswerLoading = false;
    const customInitialState = fromJS({
      proposalQuestions,
      isProposalAnswerLoading
    });

    const data = ['answer1', 'answer2'];
    const questionId = 1;
    const action = {
      type: PROPOSAL_ANSWER,
      payload: { data, questionId }
    };

    const newState = proposalReducer(customInitialState, action);
    const expectedState = fromJS({
      proposalQuestions,
      isProposalAnswerLoading,
      proposalAnswer: undefined
    });
    expect(newState).toEqual(expectedState);
  });

  it('should set proposalAnswer loading state', () => {
    const action = {
      type: PROPOSAL_ANSWER_LOADING,
      payload: ''
    };
    const newState = proposalReducer(initialState, action);
    const expectedState = initialState
      .set('isProposalAnswerLoading', true)
      .set('proposalAnswerError', undefined);
    expect(newState).toEqual(expectedState);
  });

  it('should set proposalAnswer error state', () => {
    const errorMessage = 'Fake Error Message';
    const action = {
      type: PROPOSAL_ANSWER_ERROR,
      payload: 'Fake Error Message'
    };
    const newState = proposalReducer(initialState, action);
    const expectedState = initialState
      .set('proposalAnswerError', errorMessage)
      .set('isProposalAnswerLoading', false);
    expect(newState).toEqual(expectedState);
  });

  it('should load proposal questions sections', () => {
    const sections = [
      {
        sectionOrder: 1,
        sectionName: 'Opportunity Overview'
      },
      {
        sectionOrder: 2,
        sectionName: 'Proposal Team'
      }
    ];
    const isQuestionSectionLoading = false;

    const action = {
      type: QUESTION_SECTION_INFO,
      payload: sections
    };
    const newState = proposalReducer(initialState, action);
    const expectedState = Map({
      proposalQuestionSection: sections,
      isQuestionSectionLoading
    });
    expect(newState).toEqual(expectedState);
  });

  it('should set proposal questions sections error state', () => {
    const errorMessage = 'Fake Error Message';
    const action = {
      type: QUESTION_SECTION_ERROR,
      payload: 'Fake Error Message'
    };
    const newState = proposalReducer(initialState, action);
    const expectedState = initialState
      .set('questionSectionError', errorMessage)
      .set('isQuestionSectionLoading', false);
    expect(newState).toEqual(expectedState);
  });

  it('should set proposal questions sections loading state', () => {
    const action = {
      type: QUESTION_SECTION_LOADING,
      payload: ''
    };
    const newState = proposalReducer(initialState, action);
    const expectedState = initialState
      .set('isQuestionSectionLoading', true)
      .set('questionSectionError', undefined);
    expect(newState).toEqual(expectedState);
  });

  it('should load answer types', () => {
    const answerTypes = [
      'text',
      'date',
      'y/n',
      'currency',
      'select',
      'number',
      'picklist',
      'multi-picklist'
    ];
    const isAnswerTypesLoading = false;

    const action = {
      type: ANSWER_TYPES_INFO,
      payload: answerTypes
    };
    const newState = proposalReducer(initialState, action);
    const expectedState = Map({
      proposalAnswerTypes: answerTypes,
      isAnswerTypesLoading
    });
    expect(newState).toEqual(expectedState);
  });

  it('should set answer types error state', () => {
    const errorMessage = 'Fake Error Message';
    const action = {
      type: ANSWER_TYPES_ERROR,
      payload: 'Fake Error Message'
    };
    const newState = proposalReducer(initialState, action);
    const expectedState = initialState
      .set('AnswerTypesError', errorMessage)
      .set('isAnswerTypesLoading', false);
    expect(newState).toEqual(expectedState);
  });

  it('should set answer types loading state', () => {
    const action = {
      type: ANSWER_TYPES_LOADING,
      payload: ''
    };
    const newState = proposalReducer(initialState, action);
    const expectedState = initialState
      .set('isAnswerTypesLoading', true)
      .set('AnswerTypesError', undefined);
    expect(newState).toEqual(expectedState);
  });

  it('should load roles', () => {
    const roles = [
      'Autocomplete',
      'Autocomplete + edit',
      'PD',
      'BD',
      'TSL',
      'Strategic pricing',
      'Autocomplete + flag',
      'Medical',
      'Medic',
      'Autocomplete + edit ',
      'DM',
      'Clinical',
      'Automated',
      'All'
    ];
    const isRolesLoading = false;

    const action = {
      type: ROLES_INFO,
      payload: roles
    };

    const newState = proposalReducer(initialState, action);
    const expectedState = Map({ proposalRoles: roles, isRolesLoading });
    expect(newState).toEqual(expectedState);
  });

  it('should set roles error state', () => {
    const errorMessage = 'Fake Error Message';
    const action = {
      type: ROLES_ERROR,
      payload: 'Fake Error Message'
    };
    const newState = proposalReducer(initialState, action);
    const expectedState = initialState
      .set('rolesError', errorMessage)
      .set('isRolesLoading', false);
    expect(newState).toEqual(expectedState);
  });

  it('should set roles loading state', () => {
    const action = {
      type: ROLES_LOADING,
      payload: ''
    };
    const newState = proposalReducer(initialState, action);
    const expectedState = initialState
      .set('isRolesLoading', true)
      .set('rolesError', undefined);
    expect(newState).toEqual(expectedState);
  });

  it('should set question', () => {
    const data = {
      answerType: 'text',
      options: [],
      proposalId: '4d5ef185-56b0-4919-955d-b08046739fb5',
      questionText: 'This is the text for a custom question',
      roleName: 'BD',
      section: { sectionName: 'Key stakeholders', sectionOrder: 3 }
    };
    const isSetQuestionLoading = false;
    const action = {
      type: PROPOSAL_SET_QUESTION,
      payload: { data, isSetQuestionLoading }
    };
    const newState = proposalReducer(initialState, action);
    const expectedState = Map({ data, isSetQuestionLoading });
    expect(newState).toEqual(expectedState);
  });

  it('should set question error state', () => {
    const errorMessage = 'Fake Error Message';
    const action = {
      type: PROPOSAL_SET_QUESTION_ERROR,
      payload: 'Fake Error Message'
    };
    const newState = proposalReducer(initialState, action);
    const expectedState = initialState
      .set('setQuestionError', errorMessage)
      .set('isSetQuestionLoading', false);
    expect(newState).toEqual(expectedState);
  });

  it('should set question loading state', () => {
    const action = {
      type: PROPOSAL_SET_QUESTION_LOADING,
      payload: ''
    };
    const newState = proposalReducer(initialState, action);
    const expectedState = initialState
      .set('isSetQuestionLoading', true)
      .set('setQuestionError', undefined);
    expect(newState).toEqual(expectedState);
  });
});
