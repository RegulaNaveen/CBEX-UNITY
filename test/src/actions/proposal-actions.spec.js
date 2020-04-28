// @flow
import expect from 'expect';
import { describe, it, beforeEach, afterEach } from 'mocha';
import sinon from 'sinon';
import { Map } from 'immutable';
import { getProposal } from '../../../src/actions/proposal-actions';
import { PROPOSAL_INFO } from '../../../src/actions/proposal-types';
import * as proposalApi from '../../../src/api/proposal';

describe('proposal actions', () => {
  let getProposalInfoStub;
  let getState;
  let dispatch;

  beforeEach(() => {
    getProposalInfoStub = sinon.stub(proposalApi, 'getProposalInfo');
    dispatch = sinon.stub();
    getState = sinon.stub();
  });

  afterEach(() => {
    dispatch.reset();
    getState.reset();
  });

  const proposal = Map({});

  it('getProposal', async () => {
    const id = '18bffbde-d1f4-4848-8b8e-62e05a11be56';

    getProposalInfoStub.returns(Promise.resolve(proposal));

    await getProposal(id)(dispatch, getState);
    expect(dispatch.calledOnce).toBe(true);
    expect(dispatch.args[0][0].type).toBe(PROPOSAL_INFO);
    expect(dispatch.args[0][0].payload).toEqual(proposal);
  });
});
