// @flow
import expect from 'expect';
import { describe, it, beforeEach, afterEach } from 'mocha';
import sinon from 'sinon';
import { Map } from 'immutable';
import { getProposal } from '../../../src/actions/proposal-actions';
import {
  PROPOSAL_INFO,
  PROPOSAL_INFO_LOADING,
  PROPOSAL_INFO_ERROR
} from '../../../src/actions/proposal-types';
import * as proposalApi from '../../../src/api/proposal';

describe('Proposal Action', () => {
  let getProposalInfoStub;
  let getState;
  let dispatch;

  beforeEach(() => {
    getProposalInfoStub = sinon.stub(proposalApi, 'getProposalInfo');
    dispatch = sinon.stub();
    getState = sinon.stub();
  });

  afterEach(() => {
    getProposalInfoStub.restore();
    dispatch.reset();
    getState.reset();
  });

  const proposal = Map({});

  it('should create PROPOSAL_INFO', async () => {
    const id = '72f54264-5154-4899-ac6c-95dea210156d';

    getProposalInfoStub.returns(Promise.resolve(proposal));

    await getProposal(id)(dispatch, getState);
    expect(dispatch.calledTwice).toBe(true);
    expect(dispatch.args[0][0].type).toBe(PROPOSAL_INFO_LOADING);
    expect(dispatch.args[1][0].type).toBe(PROPOSAL_INFO);
    expect(dispatch.args[1][0].payload).toEqual(proposal);
  });

  it('should create PROPOSAL_INFO_ERROR', async () => {
    const id = '';
    const errorMessage = 'error message';

    getProposalInfoStub.returns(Promise.reject(new Error(errorMessage)));

    await getProposal(id)(dispatch, getState);
    expect(dispatch.calledTwice).toBe(true);
    expect(dispatch.args[0][0].type).toBe(PROPOSAL_INFO_LOADING);
    expect(dispatch.args[1][0].type).toBe(PROPOSAL_INFO_ERROR);
    expect(dispatch.args[1][0].payload).toEqual(['Error: error message']);
  });
});
