// @flow
/* eslint no-param-reassign: 0 */
import isEmpty from 'lodash/isEmpty';
import { store } from '../../../store';

/**
 * Function to get the last answer object from a proposal question object
 * @param question Proposal Question
 * @returns Object
 */
export const getLastAnswer = question => {
  let lastAnswer = {};
  try {
    if (Array.isArray(question?.answers) && question?.answers?.length > 0) {
      const answersArr = question.answers;
      lastAnswer = answersArr[answersArr.length - 1];
    }
    return lastAnswer;
  } catch (error) {
    console.error(error);
    return lastAnswer;
  }
};

// Empty Answers are stored with a spaces
const isAnswerEmpty = answer => isEmpty(answer) || answer === ' ';
const isUnityPredicted = (lastAnswer = {}) =>
  lastAnswer?.userName === 'UnityPredictedAnswer';
const isCarryForwarded = (answer = {}) =>
  answer.userName === 'CarryForwardAnswer';

// answeredFilter => Only answered
const answeredFilter: Boolean = (question, flags) => {
  const lastAnswer = getLastAnswer(question);
  if (flags['carryForwardAnswerFlag']) {
    return (
      !isAnswerEmpty(lastAnswer.answer) &&
      !isUnityPredicted(lastAnswer) &&
      !isCarryForwarded(lastAnswer)
    );
  }
  return !isAnswerEmpty(lastAnswer.answer) && !isUnityPredicted(lastAnswer);
};
// UnansweredFilter => No Answers, Indetermined Answers and Unity Predicted Answers
const unansweredFilter: Boolean = (question, flags) => {
  const lastAnswer = getLastAnswer(question);
  if (flags['carryForwardAnswerFlag']) {
    return (
      isAnswerEmpty(lastAnswer.answer) ||
      isUnityPredicted(lastAnswer) ||
      isCarryForwarded(lastAnswer)
    );
  }
  return isAnswerEmpty(lastAnswer.answer) || isUnityPredicted(lastAnswer);
};
const responsibleFilter: Boolean = question => {
  const userRole = localStorage.getItem('userRole') || '';
  return (
    Array.isArray(question.roleNames) && question.roleNames.includes(userRole)
  );
};
const informedFilter: Boolean = question => {
  const userRole = localStorage.getItem('userRole') || '';
  if (question.interestedParties) {
    const interestedPartiesArr = question.interestedParties.split(',');
    return (
      Array.isArray(interestedPartiesArr) &&
      interestedPartiesArr.includes(userRole)
    );
  }
  return false;
};

export const verificationRequiredFilter = (question, flags) => {
  const lastAnswer = getLastAnswer(question);
  if (flags['carryForwardAnswerFlag']) {
    return isUnityPredicted(lastAnswer) || isCarryForwarded(lastAnswer);
  }
  return isUnityPredicted(lastAnswer);
};

export const shouldShowQuestion = (
  question = {},
  approvalfilters,
  flags = {}
): Boolean => {
  try {
    const filterAnswers = [];
    const appliedFilters = approvalfilters
      .filter(i => i.value)
      .map(i => i.name);
    if (question.visible && question.active) {
      filterAnswers.push(true);

      // Filters for roles group
      if (appliedFilters.includes('responsible')) {
        filterAnswers.push(responsibleFilter(question));
      }
      if (appliedFilters.includes('informed')) {
        filterAnswers.push(informedFilter(question));
      }

      // Filters For answer group
      if (
        appliedFilters.includes('answered') &&
        appliedFilters.includes('unanswered')
      ) {
        filterAnswers.push(true);
      } else {
        if (appliedFilters.includes('answered')) {
          filterAnswers.push(answeredFilter(question, flags));
        }
        if (appliedFilters.includes('unanswered')) {
          filterAnswers.push(unansweredFilter(question, flags));
        }
      }

      if (appliedFilters.includes('verificationRequired')) {
        filterAnswers.push(verificationRequiredFilter(question, flags));
      }
    }
    return filterAnswers.length > 0 && filterAnswers.every(i => i === true);
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const shouldShowSection = (sectionId, flags) => {
  try {
    const state = store.getState();
    const allApprovals = state.approvals.allApprovals;
    const approvalsFilters = state.approvals.filters;
    const proposalQuestions = state.proposal.get('proposalQuestions');
    const approvalSection =
      allApprovals.find(i => i.ApprovalSectionId === sectionId) || {};
    const leftQuestions = approvalSection.ApprovalSectionLeftQuestions || [];
    const rightQuestions = approvalSection.ApprovalSectionRightQuestions || [];
    const questionIds = [...leftQuestions, ...rightQuestions];
    const visibilityArr = [];
    questionIds.forEach(questionId => {
      const questionObj =
        proposalQuestions.find(i => i.questionId === questionId) || {};
      const isQuestionVisible = shouldShowQuestion(
        questionObj,
        approvalsFilters,
        flags
      );
      visibilityArr.push(isQuestionVisible);
    });
    const returnValue =
      visibilityArr.length > 0 && visibilityArr.some(i => i === true);
    return returnValue;
  } catch (error) {
    console.error(error);
    return true;
  }
};
