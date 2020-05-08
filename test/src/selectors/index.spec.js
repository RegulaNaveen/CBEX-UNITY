// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import { Map, List } from 'immutable';
import {
  getAuthData,
  isAuthLoading,
  authHasErrors,
  getQuestions,
  getQuestionsList,
  isProposalLoading,
  hasProposalErrors,
  sortQuestions
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

  const authData = {
    data: { email: 'fake@mail.com', password: 'fakepassword' }
  };

  const authError = { error: 'Fake Error Message' };

  const state = {
    auth: Map({
      authData,
      isAuthLoading: true,
      authError
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
        section: {
          sectionName: 'Action List'
        },
        answerConfiguration: [],
        answers: 'answers'
      }
    ]
  };

  it('should return authData', () => {
    expect(getAuthData(state)).toEqual(authData);
  });

  it('should return isAuthLoading', () => {
    expect(isAuthLoading(state)).toEqual(true);
  });

  it('should return authError', () => {
    expect(authHasErrors(state)).toEqual(authError);
  });

  it('should return proposal questions', () => {
    expect(getQuestions(state)).toEqual(getQuestionsResponse);
  });

  it('should return proposal questions list', () => {
    expect(getQuestionsList(state)).toEqual(getQuestionsListReponse);
  });

  it('should return sort proposal question by orderquestion property', () => {
    expect(sortQuestions(state)).toEqual(getQuestionsListReponse);
  });

  it('should return isProposalLoading value', () => {
    expect(isProposalLoading(state)).toBe(true);
  });

  it('should return proposalError value', () => {
    expect(hasProposalErrors(state)).toEqual(proposalError);
  });
});
