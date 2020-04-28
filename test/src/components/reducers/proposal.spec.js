// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import { fromJS } from 'immutable';
import { PROPOSAL_INFO } from '../../../../src/actions/proposal-types';
import proposalReducer from '../../../../src/reducers/proposal';

describe('proposal reducer', () => {
  const initialState = fromJS({
    proposalQuestions: undefined
  });

  it('onProsalInfoLoaded', () => {
    const proposalQuestions = 'Fake proposal info';
    const action = { type: PROPOSAL_INFO, payload: proposalQuestions };
    const newState = proposalReducer(initialState, action);
    console.log(newState);
    
    const expectState = initialState.set(
      'proposalQuestions',
      proposalQuestions
    );

    console.log(expectState);
    
    expect(newState).toEqual(expectState);
  });
});
