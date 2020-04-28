// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import { Map, fromJS } from 'immutable';
import { getQuestions, getQuestionsList } from '../../../src/selectors';

describe('index selectors', () => {
  const proposalInfo = {
    proposal: {
      proposalId: '18bffbde-d1f4-4848-8b8e-62e05a11be56',
      accountName: 'test2',
      opportunityName: 'test2',
      agreementName: 'agreementName',
      proposalDate: '2020-04-22',
      linkToOpportunity: 'https://test2.com'
    },
    proposalQuestions: [
      {
        proposalId: '18bffbde-d1f4-4848-8b8e-62e05a11be56',
        questionId: 'Action List-E8B',
        section: 'Action List',
        teamName: 'all',
        questionText:
          'What actions are needed to lock down the strategy; who is the owner and what is the deadline?',
        answerConfiguration: [],
        answers: 'answers'
      }
    ],
    proposalUsers: [
      {
        proposalId: '18bffbde-d1f4-4848-8b8e-62e05a11be56',
        userEmail: 'user1@test2.com',
        teamName: 'user1',
        userName: 'team1'
      },
      {
        proposalId: '18bffbde-d1f4-4848-8b8e-62e05a11be56',
        userEmail: 'user2@test2.com',
        teamName: 'user2',
        userName: 'team2'
      }
    ]
  };

  const state = {
    proposal: fromJS({
      proposalQuestions: Map({
        proposalQuestions: proposalInfo.proposalQuestions
      })
    })
  };

  const dummy = ['Action List'];

  const getQuestionsRes = fromJS(dummy);

  it('should return proposal questions', () => {
    const dasdasd = getQuestions(state);
    console.log(dasdasd);
    expect(getQuestions(state)).toBe(getQuestionsRes);
  });

  it('should return proposal questions list', () => {
    expect(getQuestionsList(state)).toBe(
      state.proposal.get('proposalQuestions')
    );
  });
});
