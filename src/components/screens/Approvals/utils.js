// @flow
/* eslint no-param-reassign: 0 */
import isEmpty from 'lodash/isEmpty';

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

// answeredFilter => Only answered
const answeredFilter: Boolean = question => {
  const lastAnswer = getLastAnswer(question);
  return !isAnswerEmpty(lastAnswer.answer);
};
// UnansweredFilter => No Answers and Indetermined Answers
const unansweredFilter: Boolean = question => {
  const lastAnswer = getLastAnswer(question);
  return isAnswerEmpty(lastAnswer.answer);
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

/**
 * Function used to decide whether to show or hide an Approval Section
 * The questionHash changes based on filters applied on the UI
 * When an Approval Section doesn't contain any questions matching the applied filters then the Section should be hidden
 * @param {*} questionHash Redux approvals.quesHashData or return value of `generateQuestionsHash` function
 * @param {*} approvalSection - A single Approval Section data from redux i.e approval item from allApprovals array `approvals.allApprovals[0]`
 * @returns
 */
export const shouldShowSection = (
  questionHash = {},
  approvalSection = {}
): Boolean => {
  try {
    const questionIds = Object.keys(questionHash) || [];
    const leftQuestions = approvalSection?.ApprovalSectionLeftQuestions || [];
    const rightQuestions = approvalSection?.ApprovalSectionRightQuestions || [];
    const approvalQuestionIds = [...leftQuestions, ...rightQuestions];
    const intersectingQuestions = questionIds.filter(i =>
      approvalQuestionIds.includes(i)
    );
    // If intersectingQuestions length is 0 it means
    // the filtered questionHash does not contain any questionId which is present in the current approval section
    return intersectingQuestions.length > 0;
  } catch (error) {
    console.error(error);
    return true;
  }
};

export const shouldShowQuestion = (question = {}, approvalfilters): Boolean => {
  const filterAnswers = [];
  const appliedFilters = approvalfilters.filter(i => i.value).map(i => i.name);
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
        filterAnswers.push(answeredFilter(question));
      }
      if (appliedFilters.includes('unanswered')) {
        filterAnswers.push(unansweredFilter(question));
      }
    }
  }
  console.log('======START========');
  console.log({ questionText: question.questionText });
  console.log({ answeredFilter: answeredFilter(question) });
  console.log({ filterAnswers });
  console.log(filterAnswers.length > 0 && filterAnswers.every(i => i === true));
  console.log('======END========');
  return filterAnswers.length > 0 && filterAnswers.every(i => i === true);
};
