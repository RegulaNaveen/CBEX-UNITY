// @flow
import expect from 'expect';
import { describe, it, beforeEach, afterEach } from 'mocha';
import sinon from 'sinon';
import { getProposal } from '../../../../src/actions/proposal-actions';
import { PROPOSAL_INFO } from '../../../../src/actions/proposal-types';

describe('proposal actions', () => {
  let getState;
  let dispatch;

  beforeEach(() => {
    dispatch = sinon.stub();
    getState = sinon.stub();
  });

  afterEach(() => {
    dispatch.reset();
    getState.reset();
  });

  it('getProposal', async () => {
    const id = 'dsadasdsa';
    await getProposal({ id })(dispatch, getState);
    expect(dispatch.calledTwice).toBe(true);
    expect(dispatch.args[0][0].type).toBe(PROPOSAL_INFO);
  });
});
