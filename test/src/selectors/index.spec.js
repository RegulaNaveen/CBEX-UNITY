// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import { Map, fromJS } from 'immutable';
import { getQuestions, getQuestionsList } from '../../../src/selectors';

describe('index selectors', () => {
  const proposalQuestionss = [
    {
      proposalId: '18bffbde-d1f4-4848-8b8e-62e05a11be56',
      questionId: 'Action List-E8B',
      sectionName: 'Action List',
      teamName: 'all',
      questionText:
        'What actions are needed to lock down the strategy; who is the owner and what is the deadline?',
      answerConfiguration: [],
      answers: 'answers'
    }
  ];

  const state = {
    proposal: Map({
      proposalQuestions: proposalQuestionss
    })
  };

  const getQuestionsRespnse = Map([]);

  const getQuestionsListReponse = {
    undefined: [
      {
        proposalId: '18bffbde-d1f4-4848-8b8e-62e05a11be56',
        questionId: 'Action List-E8B',
        teamName: 'all',
        sectionName: 'Action List',
        questionText:
          'What actions are needed to lock down the strategy; who is the owner and what is the deadline?',
        answerConfiguration: [],
        answers: 'answers'
      }
    ]
  };

  it('should return proposal questions', () => {
    console.log(getQuestions(state));
    expect(getQuestions(state)).toBe(getQuestionsRespnse);
  });

  it('should return proposal questions list', () => {
    expect(getQuestionsList(state)).toEqual(getQuestionsListReponse);
  });
});
