// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import { fromJS } from 'immutable';
import { PROPOSAL_INFO } from '../../../../src/actions/proposal-types';
import onProsalInfoLoaded from '../../../../src/reducers/proposal';

describe('proposal reducer', () => {
  const initialState = fromJS({
    proposalQuestions: undefined
  });
  const proposalQuestions = 'Fake proposal info';

  it('onProsalInfoLoaded', () => {
    const action = { type: PROPOSAL_INFO, payload: proposalQuestions };
    const newState = onProsalInfoLoaded(initialState, action);
    const expectState = initialState.set(
      'proposalQuestions',
      proposalQuestions
    );

    expect(newState).toEqual(expectState);
  });
});
