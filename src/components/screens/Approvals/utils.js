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

const answeredFilter = questions => {
  return questions.filter(item => !isEmpty(item.answers));
};
const unansweredFilter = questions => {
  return questions.filter(item => isEmpty(item.answers));
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
  if (appliedFilters.includes('responsible')) {
    questions = responsibleFilter(questions);
  }
  if (appliedFilters.includes('informed')) {
    questions = informedFilter(questions);
  }
  if (
    appliedFilters.includes('answered') &&
    appliedFilters.includes('unanswered')
  ) {
    return questions;
  }
  if (appliedFilters.includes('answered')) {
    questions = answeredFilter(questions);
  }
  if (appliedFilters.includes('responsible')) {
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
      // Filter questions on the current template
      const templateQuestions = proposalQuestions.filter(item => item.active);
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
