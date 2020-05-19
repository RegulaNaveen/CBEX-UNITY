// @flow
import expect from 'expect';
import { describe, it, beforeEach, afterEach } from 'mocha';
import sinon from 'sinon';
import { Map } from 'immutable';
import {
  getProposal,
  setProposalAnswerData
} from '../../../src/actions/proposal-actions';
import {
  PROPOSAL_INFO,
  PROPOSAL_INFO_LOADING,
  PROPOSAL_INFO_ERROR,
  PROPOSAL_ANSWER,
  PROPOSAL_ANSWER_LOADING,
  PROPOSAL_ANSWER_ERROR
} from '../../../src/actions/proposal-types';
import * as proposalApi from '../../../src/api/proposal';

describe('Proposal Action', () => {
  let getProposalInfoStub;
  let setProposalAnswerStub;
  let getState;
  let dispatch;

  beforeEach(() => {
    getProposalInfoStub = sinon.stub(proposalApi, 'getProposalInfo');
    setProposalAnswerStub = sinon.stub(proposalApi, 'setProposalAnswer');
    dispatch = sinon.stub();
    getState = sinon.stub();
  });

  afterEach(() => {
    getProposalInfoStub.restore();
    setProposalAnswerStub.restore();
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
    const errorMessage = 'Error: Fake error message';

    getProposalInfoStub.returns(Promise.reject(errorMessage));

    await getProposal(id)(dispatch, getState);
    expect(dispatch.calledTwice).toBe(true);
    expect(dispatch.args[0][0].type).toBe(PROPOSAL_INFO_LOADING);
    expect(dispatch.args[1][0].type).toBe(PROPOSAL_INFO_ERROR);
    expect(dispatch.args[1][0].payload).toEqual('Error: Fake error message');
  });

  it('should create PROPOSAL_ANSWER', async () => {
    const proposalId = '72f54264-5154-4899-ac6c-95dea210156d';
    const questionId = 'Question-ONE';
    const answer = 'FakeAnswer';

    setProposalAnswerStub.returns(Promise.resolve(proposal));

    const response = { data: proposal, questionId };

    await setProposalAnswerData(
      proposalId,
      questionId,
      answer
    )(dispatch, getState);
    expect(dispatch.calledTwice).toBe(true);
    expect(dispatch.args[0][0].type).toBe(PROPOSAL_ANSWER_LOADING);
    expect(dispatch.args[1][0].type).toBe(PROPOSAL_ANSWER);
    expect(dispatch.args[1][0].payload).toEqual(response);
  });

  it('should create PROPOSAL_ANSWER_ERROR', async () => {
    const proposalId = '72f54264-5154-4899-ac6c-95dea210156d';
    const questionId = 'Question-ONE';
    const answer = 'FakeAnswer';
    const errorMessage = 'Error: Fake error message';

    setProposalAnswerStub.returns(Promise.reject(errorMessage));

    await setProposalAnswerData(
      proposalId,
      questionId,
      answer
    )(dispatch, getState);
    expect(dispatch.calledTwice).toBe(true);
    expect(dispatch.args[0][0].type).toBe(PROPOSAL_ANSWER_LOADING);
    expect(dispatch.args[1][0].type).toBe(PROPOSAL_ANSWER_ERROR);
    expect(dispatch.args[1][0].payload).toEqual('Error: Fake error message');
  });
});
