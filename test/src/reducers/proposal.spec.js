// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import { fromJS, Map } from 'immutable';
import {
  PROPOSAL_INFO,
  PROPOSAL_INFO_LOADING,
  PROPOSAL_INFO_ERROR
} from '../../../src/actions/proposal-types';
import proposalReducer from '../../../src/reducers/proposal';

describe('Proposal', () => {
  const initialState = fromJS({});

  it('should load proposal questions', () => {
    const proposalQuestions = ['Fake Question 1', 'Fake Question 2'];
    const action = { type: PROPOSAL_INFO, payload: { proposalQuestions } };
    const newState = proposalReducer(initialState, action);
    const expectedState = Map({ proposalQuestions });
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
});
