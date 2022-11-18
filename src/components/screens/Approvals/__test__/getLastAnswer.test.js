import getLastAnswer from '../getLastAnswer';
import { dummyQuestions } from './data';

describe('Test getLastAnswer function', () => {
  it('Should return the last asnwer object given a question object argument', () => {
    const question = dummyQuestions.find(
      i => i.answerConfiguration.type === 'picklist-lookup'
    );
    const expectedLastAnswer = question.answers[question.answers.length - 1];
    const lastAnswer = getLastAnswer(question);
    expect(lastAnswer).toEqual(expectedLastAnswer);
  });
  it('Should return empty object incase of error', () => {
    const question = dummyQuestions.find(
      i => i.answerConfiguration.type === 'picklist-lookup'
    );
    const expectedLastAnswer = {};
    // Passing undefined as param
    const lastAnswer = getLastAnswer(undefined);
    // Passing question without answers property
    delete question.answers;
    const lastAnswer02 = getLastAnswer(question);
    // Passing string as a param
    const lastAnswer03 = getLastAnswer('thisisastring');
    expect(lastAnswer).toEqual(expectedLastAnswer);
    expect(lastAnswer02).toEqual(expectedLastAnswer);
    expect(lastAnswer03).toEqual(expectedLastAnswer);
  });
});
