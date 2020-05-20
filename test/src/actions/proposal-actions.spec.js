// @flow
import expect from 'expect';
import { describe, it, beforeEach, afterEach } from 'mocha';
import sinon from 'sinon';
import { Map } from 'immutable';
import {
  getProposal,
  setProposalAnswerData,
  getQuestionSection,
  getAnswerTypesData,
  getRolesInfo
} from '../../../src/actions/proposal-actions';
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
  ROLES_ERROR
} from '../../../src/actions/proposal-types';
import * as proposalApi from '../../../src/api/proposal';

describe('Proposal Action', () => {
  let getProposalInfoStub;
  let setProposalAnswerStub;
  let getQuestionSectionInfoStub;
  let getAnswerTypesStub;
  let getRolesStub;
  let getState;
  let dispatch;

  beforeEach(() => {
    getProposalInfoStub = sinon.stub(proposalApi, 'getProposalInfo');
    setProposalAnswerStub = sinon.stub(proposalApi, 'setProposalAnswer');
    getQuestionSectionInfoStub = sinon.stub(
      proposalApi,
      'getQuestionSectionInfo'
    );
    getAnswerTypesStub = sinon.stub(proposalApi, 'getAnswerTypes');
    getRolesStub = sinon.stub(proposalApi, 'getRoles');
    dispatch = sinon.stub();
    getState = sinon.stub();
  });

  afterEach(() => {
    getProposalInfoStub.restore();
    setProposalAnswerStub.restore();
    getQuestionSectionInfoStub.restore();
    getAnswerTypesStub.restore();
    getRolesStub.restore();
    dispatch.reset();
    getState.reset();
  });

  const proposal = Map({});
  // const response = [Object];

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
    const proposalId = '96098868-889e-4853-a8fa-790c74c514d4';
    const questionId = 'Action List-E8B';
    const answer = 'Fake answer';
    const response = {
      data: '96098868-889e-4853-a8fa-790c74c514d4',
      questionId: 'Action List-E8B'
    };

    setProposalAnswerStub.returns(Promise.resolve(proposalId));

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
    const proposalId = '96098868-889e-4853-a8fa-790c74c514d4';
    const questionId = 'Action List-E8B';
    const answer = '';
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

  it('should create QUESTION_SECTION_INFO', async () => {
    getQuestionSectionInfoStub.returns(Promise.resolve(proposal));

    await getQuestionSection()(dispatch, getState);
    expect(dispatch.calledTwice).toBe(true);
    expect(dispatch.args[0][0].type).toBe(QUESTION_SECTION_LOADING);
    expect(dispatch.args[1][0].type).toBe(QUESTION_SECTION_INFO);
    expect(dispatch.args[1][0].payload).toEqual(proposal);
  });

  it('should create QUESTION_SECTION_ERROR', async () => {
    const errorMessage = 'Error: Fake error message';
    getQuestionSectionInfoStub.returns(Promise.reject(errorMessage));
    await getQuestionSection()(dispatch, getState);
    expect(dispatch.calledTwice).toBe(true);
    expect(dispatch.args[0][0].type).toBe(QUESTION_SECTION_LOADING);
    expect(dispatch.args[1][0].type).toBe(QUESTION_SECTION_ERROR);
    expect(dispatch.args[1][0].payload).toEqual('Error: Fake error message');
  });

  it('should create QUESTION_SECTION_INFO', async () => {
    getAnswerTypesStub.returns(Promise.resolve(proposal));
    await getAnswerTypesData()(dispatch, getState);
    expect(dispatch.calledTwice).toBe(true);
    expect(dispatch.args[0][0].type).toBe(ANSWER_TYPES_LOADING);
    expect(dispatch.args[1][0].type).toBe(ANSWER_TYPES_INFO);
    expect(dispatch.args[1][0].payload).toEqual(proposal);
  });

  it('should create QUESTION_SECTION_ERROR', async () => {
    const errorMessage = 'Error: Fake error message';
    getAnswerTypesStub.returns(Promise.reject(errorMessage));
    await getAnswerTypesData()(dispatch, getState);
    expect(dispatch.calledTwice).toBe(true);
    expect(dispatch.args[0][0].type).toBe(ANSWER_TYPES_LOADING);
    expect(dispatch.args[1][0].type).toBe(ANSWER_TYPES_ERROR);
    expect(dispatch.args[1][0].payload).toEqual('Error: Fake error message');
  });

  it('should create ROLES_INFO', async () => {
    getRolesStub.returns(Promise.resolve(proposal));
    await getRolesInfo()(dispatch, getState);
    expect(dispatch.calledTwice).toBe(true);
    expect(dispatch.args[0][0].type).toBe(ROLES_LOADING);
    expect(dispatch.args[1][0].type).toBe(ROLES_INFO);
    expect(dispatch.args[1][0].payload).toEqual(proposal);
  });

  it('should create ROLES_ERROR', async () => {
    const errorMessage = 'Error: Fake error message';
    getRolesStub.returns(Promise.reject(errorMessage));
    await getRolesInfo()(dispatch, getState);
    expect(dispatch.calledTwice).toBe(true);
    expect(dispatch.args[0][0].type).toBe(ROLES_LOADING);
    expect(dispatch.args[1][0].type).toBe(ROLES_ERROR);
    expect(dispatch.args[1][0].payload).toEqual('Error: Fake error message');
  });
});
