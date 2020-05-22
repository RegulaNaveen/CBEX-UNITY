// @flow
import expect from 'expect';
import { describe, it, beforeEach, afterEach } from 'mocha';
import sinon from 'sinon';
import { Map } from 'immutable';
import {
  getProposal,
  setProposalAnswerData,
  getQuestionSection,
  getAnswerTypesInfo,
  getRolesInfo,
  setProposalQuestion
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
  ROLES_ERROR,
  PROPOSAL_SET_QUESTION,
  PROPOSAL_SET_QUESTION_LOADING,
  PROPOSAL_SET_QUESTION_ERROR
} from '../../../src/actions/proposal-types';
import * as proposalApi from '../../../src/api/proposal';

describe('Proposal Action', () => {
  let getProposalInfoStub;
  let setProposalAnswerStub;
  let getQuestionSectionInfoStub;
  let getAnswerTypesStub;
  let getRolesStub;
  let setProposalQuestionStub;
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
    setProposalQuestionStub = sinon.stub(
      proposalApi,
      'setProposalQuestionData'
    );
    dispatch = sinon.stub();
    getState = sinon.stub();
  });

  afterEach(() => {
    getProposalInfoStub.restore();
    setProposalAnswerStub.restore();
    getQuestionSectionInfoStub.restore();
    getAnswerTypesStub.restore();
    getRolesStub.restore();
    setProposalQuestionStub.restore();
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
    await getAnswerTypesInfo()(dispatch, getState);
    expect(dispatch.calledTwice).toBe(true);
    expect(dispatch.args[0][0].type).toBe(ANSWER_TYPES_LOADING);
    expect(dispatch.args[1][0].type).toBe(ANSWER_TYPES_INFO);
    expect(dispatch.args[1][0].payload).toEqual(proposal);
  });

  it('should create QUESTION_SECTION_ERROR', async () => {
    const errorMessage = 'Error: Fake error message';
    getAnswerTypesStub.returns(Promise.reject(errorMessage));
    await getAnswerTypesInfo()(dispatch, getState);
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

  it('should create PROPOSAL_SET_QUESTION', async () => {
    const proposalId = '4d5ef185-56b0-4919-955d-b08046739fb5';
    const questionData = {
      answerType: 'text',
      options: [],
      proposalId: '4d5ef185-56b0-4919-955d-b08046739fb5',
      questionText: 'This is the text for a custom question',
      roleName: 'BD',
      section: { sectionOrder: 22, sectionName: 'Action List' }
    };

    const response = {
      proposalId: '4d5ef185-56b0-4919-955d-b08046739fb5',
      questionId: '6f318bba-b0d0-4c21-9798-378a4d133c07',
      section: { sectionOrder: 22, sectionName: 'Action List' },
      questionText: 'This is the text for a custom question',
      answerConfiguration: { type: 'text', options: [] },
      roleName: 'BD',
      answers: [],
      questionOrder: 6
    };

    setProposalQuestionStub.returns(Promise.resolve(response));
    await setProposalQuestion(proposalId, questionData)(dispatch, getState);
    expect(dispatch.calledTwice).toBe(true);
    expect(dispatch.args[0][0].type).toBe(PROPOSAL_SET_QUESTION_LOADING);
    expect(dispatch.args[1][0].type).toBe(PROPOSAL_SET_QUESTION);
    expect(dispatch.args[1][0].payload).toEqual(response);
  });

  it('should create PROPOSAL_SET_QUESTION_ERROR', async () => {
    const proposalId = '4d5ef185-56b0-4919-955d-b08046739fb5';
    const questionData = {};
    const errorMessage = 'Error: Fake error message';
    setProposalQuestionStub.returns(Promise.reject(errorMessage));
    await setProposalQuestion(proposalId, questionData)(dispatch, getState);
    expect(dispatch.calledTwice).toBe(true);
    expect(dispatch.args[0][0].type).toBe(PROPOSAL_SET_QUESTION_LOADING);
    expect(dispatch.args[1][0].type).toBe(PROPOSAL_SET_QUESTION_ERROR);
    expect(dispatch.args[1][0].payload).toEqual('Error: Fake error message');
  });
});
