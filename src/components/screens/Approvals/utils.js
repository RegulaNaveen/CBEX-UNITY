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
const answeredFilter = questions => {
  return questions.filter(question => {
    const lastAnswer = getLastAnswer(question);
    return !isAnswerEmpty(lastAnswer.answer);
  });
};
// UnansweredFilter => No Answers and Indetermined Answers
const unansweredFilter = questions => {
  return questions.filter(question => {
    const lastAnswer = getLastAnswer(question);
    return isAnswerEmpty(lastAnswer.answer);
  });
};
const responsibleFilter = questions => {
  return questions.filter(item => {
    const userRole = localStorage.getItem('userRole') || '';
    return Array.isArray(item.roleNames) && item.roleNames.includes(userRole);
  });
};
const informedFilter = questions => {
  return questions.filter(item => {
    const userRole = localStorage.getItem('userRole') || '';
    if (item.interestedParties) {
      const interestedPartiesArr = item.interestedParties.split(',');
      return (
        Array.isArray(interestedPartiesArr) &&
        interestedPartiesArr.includes(userRole)
      );
    }
    return false;
  });
};

/**
 * Function to apply filter logic for questions to be rendered in Approval page
 * @param {*} questions
 * @param {Array<object>} appliedFilters - Redux store value of state.approvals.filters
 */
const filteredQuestions = (questions, approvalfilters) => {
  const appliedFilters = approvalfilters.filter(i => i.value).map(i => i.name);
  console.log({ appliedFilters });
  // Filters for roles group
  if (appliedFilters.includes('responsible')) {
    questions = responsibleFilter(questions);
  }
  if (appliedFilters.includes('informed')) {
    questions = informedFilter(questions);
  }
  // Filters For answer group
  // Note: The questions object is getting mutated, add future filters which are not related to answers above this logic.
  if (
    appliedFilters.includes('answered') &&
    appliedFilters.includes('unanswered')
  ) {
    return questions;
  }
  if (appliedFilters.includes('answered')) {
    questions = answeredFilter(questions);
  }
  if (appliedFilters.includes('unanswered')) {
    questions = unansweredFilter(questions);
  }
  return questions;
};

/**
 * Function to generate new Questions object with key as question id and value as question data
 * @param proposalQuestions Array of proposal questions
 * @returns Object
 */
export const generateQuestionsHash = (proposalQuestions, approvalfilters) => {
  try {
    const hash = {};
    if (Array.isArray(proposalQuestions)) {
      // Visible Questions
      const visibleQuestions = proposalQuestions.filter(item => item.visible);
      // Filter questions on the current template
      const templateQuestions = visibleQuestions.filter(item => item.active);
      let questions = templateQuestions;
      questions = filteredQuestions(questions, approvalfilters);
      if (Array.isArray(questions) && questions.length > 0) {
        questions.forEach(question => {
          hash[question.questionId] = question;
        });
      }
    }
    return hash;
  } catch (error) {
    console.error(error);
    return {};
  }
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

export const shouldShowQuestion = question => {
  return question.visible && question.active;
};
