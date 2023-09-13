import { render } from '@testing-library/react';
import { shouldShowQuestion } from '../utils';

describe('shouldShowQuestion', () => {
  const question = {
    visible: true,
    active: true,
    answers: [
      {
        userName: 'JohnDoe',
        answer: 'Yes'
      }
    ],
    roleNames: ['admin', 'editor'],
    interestedParties: 'admin,editor'
    answerConfiguration: {
      type: 'text'
    }
  };

  it('should return true if question is visible and active', () => {
    const result = shouldShowQuestion(question, [
      { name: 'answered', value: true }
    ]);
    expect(result).toBe(true);
  });

  it('should return false if question is not visible', () => {
    const invisibleQuestion = { ...question, visible: false };
    const result = shouldShowQuestion(invisibleQuestion, [
      { name: 'answered', value: true }
    ]);
    expect(result).toBe(false);
  });

  it('should return false if question is not active', () => {
    const inactiveQuestion = { ...question, active: false };
    const result = shouldShowQuestion(inactiveQuestion, [
      { name: 'answered', value: true }
    ]);
    expect(result).toBe(false);
  });

  it('should return true if responsible filter is applied and user role matches', () => {
    localStorage.setItem('userRole', 'admin');
    const result = shouldShowQuestion(question, [
      { name: 'responsible', value: true }
    ]);
    expect(result).toBe(true);
    localStorage.removeItem('userRole');
  });

  it('should return true if informed filter is applied and user role matches', () => {
    localStorage.setItem('userRole', 'admin');
    const result = shouldShowQuestion(question, [
      { name: 'informed', value: true }
    ]);
    expect(result).toBe(true);
    localStorage.removeItem('userRole');
  });

  it('should return true if answered filter is applied and question has been answered', () => {
    const result = shouldShowQuestion(question, [
      { name: 'answered', value: true }
    ]);
    expect(result).toBe(true);
  });

  it('should return false if answered filter is applied and question has not been answered', () => {
    const unansweredQuestion = { ...question, answers: [] };
    const result = shouldShowQuestion(unansweredQuestion, [
      { name: 'answered', value: true }
    ]);
    expect(result).toBe(false);
  });

  it('should return true if unanswered filter is applied and question has not been answered', () => {
    const unansweredQuestion = { ...question, answers: [] };
    const result = shouldShowQuestion(unansweredQuestion, [
      { name: 'unanswered', value: true }
    ]);
    expect(result).toBe(true);
  });

  it('should return false if unanswered filter is applied and question has been answered', () => {
    const result = shouldShowQuestion(question, [
      { name: 'unanswered', value: true }
    ]);
    expect(result).toBe(false);
  });
});
