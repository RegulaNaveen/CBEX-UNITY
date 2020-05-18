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
  PROPOSAL_ANSWER_ERROR
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
});
