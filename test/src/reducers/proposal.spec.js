// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import { fromJS } from 'immutable';
import { PROPOSAL_INFO } from '../../../src/actions/proposal-types';
import proposalReducer from '../../../src/reducers/proposal';

describe('proposal reducer', () => {
  const initialState = fromJS({
    proposalQuestions: undefined
  });

  it('onProsalInfoLoaded', () => {
    const proposalQuestions = Map({});
    const action = { type: PROPOSAL_INFO, payload: proposalQuestions };
    const newState = proposalReducer(initialState, action);
    const expectedState = initialState.set(
      'proposalQuestions',
      proposalQuestions
    );
    expect(newState).toEqual(expectedState);
  });
});
