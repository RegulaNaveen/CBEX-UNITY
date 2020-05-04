// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import { Map, List } from 'immutable';
import {
  getLoginData,
  getLoginLoading,
  getLoginError,
  getQuestions,
  getQuestionsList,
  isProposalLoading,
  hasProposalErrors
} from '../../../src/selectors';

describe('Selectors', () => {
  const proposalQuestions = [
    {
      proposalId: '18bffbde-d1f4-4848-8b8e-62e05a11be56',
      questionId: 'Action List-E8B',
      teamName: 'all',
      section: {
        sectionName: 'Action List'
      },
      questionText:
        'What actions are needed to lock down the strategy; who is the owner and what is the deadline?',
      answerConfiguration: [],
      answers: 'answers'
    }
  ];

  const proposalError = 'Fake Error';

  const loginData = { email: 'fake@email.com', password: 'fakepassword' };

  const loginError = 'Fake Error Message';

  const state = {
    auth: Map({
      loginData,
      isLoginLoading: true,
      loginError
    }),
    proposal: Map({
      proposalQuestions,
      isProposalLoading: true,
      proposalError
    })
  };

  const getQuestionsResponse = List(['Action List']);

  const getQuestionsListReponse = {
    'Action List': [
      {
        proposalId: '18bffbde-d1f4-4848-8b8e-62e05a11be56',
        questionId: 'Action List-E8B',
        teamName: 'all',
        questionText:
          'What actions are needed to lock down the strategy; who is the owner and what is the deadline?',
        answerConfiguration: [],
        answers: 'answers'
      }
    ]
  };

  it('should return loginData', () => {
    expect(getLoginData(state)).toEqual(loginData);
  });

  it('should return isLoginLoading', () => {
    expect(getLoginLoading(state)).toEqual(true);
  });

  it('should return loginError', () => {
    expect(getLoginError(state)).toEqual(loginError);
  });

  it('should return proposal questions', () => {
    expect(getQuestions(state)).toEqual(getQuestionsResponse);
  });

  it('should return proposal questions list', () => {
    expect(getQuestionsList(state)).toEqual(getQuestionsListReponse);
  });

  it('should return isProposalLoading value', () => {
    expect(isProposalLoading(state)).toBe(true);
  });

  it('should return proposalError value', () => {
    expect(hasProposalErrors(state)).toEqual(proposalError);
  });
});
