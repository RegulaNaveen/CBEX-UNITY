import { generateQuestionsHash } from '../Section';
import { dummyQuestions } from './data';

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
