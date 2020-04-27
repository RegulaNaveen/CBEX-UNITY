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

  // const proposal = {
  //   proposal: {
  //     proposalId: '18bffbde-d1f4-4848-8b8e-62e05a11be56',
  //     accountName: 'test2',
  //     opportunityName: 'test2',
  //     agreementName: 'agreementName',
  //     proposalDate: '2020-04-22',
  //     linkToOpportunity: 'https://test2.com'
  //   },
  //   proposalQuestions: [
  //     {
  //       proposalId: '18bffbde-d1f4-4848-8b8e-62e05a11be56',
  //       questionId: 'Action List-E8B',
  //       section: 'Action List',
  //       teamName: 'all',
  //       questionText:
  //         'What actions are needed to lock down the strategy; who is the owner and what is the deadline?',
  //       answerConfiguration: [],
  //       answers: 'answers'
  //     }
  //   ],
  //   proposalUsers: [
  //     {
  //       proposalId: '18bffbde-d1f4-4848-8b8e-62e05a11be56',
  //       userEmail: 'user1@test2.com',
  //       teamName: 'user1',
  //       userName: 'team1'
  //     },
  //     {
  //       proposalId: '18bffbde-d1f4-4848-8b8e-62e05a11be56',
  //       userEmail: 'user2@test2.com',
  //       teamName: 'user2',
  //       userName: 'team2'
  //     }
  //   ]
  // };

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
