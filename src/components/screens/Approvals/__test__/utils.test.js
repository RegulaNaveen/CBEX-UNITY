import { generateQuestionsHash, getLastAnswer } from '../utils';
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

describe('Test generateQuestionsHash for approvals', () => {
  it('Should return question hash only with active propoerty as true', () => {
    const activeQuestions = dummyQuestions.filter(i => i.active === true);
    const expectedHash = {};
    activeQuestions.forEach(i => {
      expectedHash[i.questionId] = i;
    });
    const receivedHash = generateQuestionsHash(dummyQuestions);
    expect(receivedHash).toEqual(expectedHash);
  });
  it('Should handle error gracefully by returning empty object incase of error', () => {
    const expectedHash = {};
    const receivedHash = generateQuestionsHash(undefined);
    expect(receivedHash).toEqual(expectedHash);
  });
});
