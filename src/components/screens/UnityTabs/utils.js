// @flow
/* eslint no-param-reassign: 0 */
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';
import { store } from '../../../store';
import { verificationRequiredFilter } from '../Approvals/utils';

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

// answeredFilter => Only answered
const answeredFilter: Boolean = question => {
  const lastAnswer = getLastAnswer(question);
  return !isAnswerEmpty(lastAnswer.answer) && !isUnityPredicted(lastAnswer);
};
// UnansweredFilter => No Answers, Indetermined Answers and Unity Predicted Answers
const unansweredFilter: Boolean = question => {
  const lastAnswer = getLastAnswer(question);
  return isAnswerEmpty(lastAnswer.answer) || isUnityPredicted(lastAnswer);
};
const responsibleFilter: Boolean = question => {
  const userRole = localStorage.getItem('userRole') || '';
  return (
    Array.isArray(question.roleNames) && question.roleNames.includes(userRole)
  );
};

const milestoneFilters: Boolean = (question, filter) => {
  return filter.some(v => v.displayName === question.milestone);
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

export const shouldShowQuestion = (question = {}, unityTabfilters): Boolean => {
  try {
    const filterAnswers = [];
    const alltabFilter = unityTabfilters;
    const appliedFilters = unityTabfilters
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
          filterAnswers.push(answeredFilter(question));
        }
        if (appliedFilters.includes('unanswered')) {
          filterAnswers.push(unansweredFilter(question));
        }
      }
      const milestonefilter = alltabFilter.filter(
        v => v.value === true && v.group === 'milestone'
      );
      // console.log(`milestonefilter`, milestonefilter);

      if (milestonefilter && milestonefilter.length > 0) {
        for (let index = 0; index < milestonefilter.length; index += 1) {
          filterAnswers.push(milestoneFilters(question, milestonefilter));
        }
      }

      if (appliedFilters.includes('verificationRequired')) {
        filterAnswers.push(verificationRequiredFilter(question));
      }
      // console.log(`filterAnswers`, filterAnswers);
    }
    return filterAnswers.length > 0 && filterAnswers.every(i => i === true);
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const shouldShowSection = (sectionId, tabId) => {
  try {
    const state = store.getState();
    let tab = state.unitytab.allTabs[tabId];
    tab = sortBy(tab, [
      o => {
        return o.UnityTabSectionOrder;
      }
    ]);
    const unityFilters = state.unitytab.filters;
    const unityTabSection =
      tab.find(i => i.UnityTabSectionId === sectionId) || {};
    const leftQuestions = unityTabSection.UnityTabSectionQuestions || [];
    const questionIds = leftQuestions;
    const visibilityArr = [];
    const proposalQuestions = state.proposal.get('proposalQuestions');
    questionIds.forEach(questionId => {
      const questionObj =
        proposalQuestions.find(i => i.questionId === questionId) || {};
      const isQuestionVisible = shouldShowQuestion(questionObj, unityFilters);
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

export const checkTabRender = (question, OT) => {
  try {
    const state = store.getState();
    const proposalQuestions = state.proposal.get('proposalQuestions');
    const arr = [];
    if (question && question.length > 0) {
      question.forEach(questionId => {
        const questionObj =
          proposalQuestions.find(i => i.questionId === questionId) || {};
        if (
          questionObj.active &&
          questionObj.visible &&
          questionObj.opportunityType.split(',').includes(OT)
        ) {
          arr.push(true);
        }
      });
    }
    return arr.some(v => v === true);
  } catch (error) {
    console.error(error);
    return true;
  }
};
