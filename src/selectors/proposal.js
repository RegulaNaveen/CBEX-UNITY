// @flow
import { Map, fromJS } from 'immutable';
import _ from 'lodash';

const getSections = (questions: Array<Object>) => {
  const sections = [];
  const orderedSections = [];

  questions.forEach((question: Object) => {
    const { section } = question;
    let willAdd = true;

    if (sections.length === 0) sections.push(section);
    else {
      for (let i = 0; i < sections.length; i += 1) {
        if (sections[i].sectionName === section.sectionName) {
          willAdd = false;
          break;
        }
      }
      if (willAdd) sections.push(section);
    }
  });

  for (let i = 1; i < sections.length + 1; i += 1) {
    sections.forEach((section: Object) => {
      if (section.sectionOrder === i) orderedSections.push(section.sectionName);
    });
  }

  return orderedSections;
};

const sortData = (questions: Array<Object>) => {
  const questionsData = Object.entries(questions);
  // eslint-disable-next-line array-callback-return
  questionsData.map((question: Object) => {
    const mappedQuestions = _.map(_.orderBy(question[1], 'questionOrder'));
    // eslint-disable-next-line no-param-reassign
    question[1] = mappedQuestions;
  });

  const sortedQuestion = Object.fromEntries(questionsData);
  return sortedQuestion;
};

const getQuestionsbySections = (questions: Array<Object>) => {
  const questionsList = _.mapValues(
    _.groupBy(questions, 'section.sectionName')
  );

  return questionsList;
};

const getQuestionSections = (items: Array<Object>) => {
  const sections = [];
  items.forEach((section: Object) => {
    const { sectionName } = section;
    if (!sections.includes(sectionName)) sections.push(sectionName);
  });
  return sections;
};

export const getQuestions = (proposal: Map): Map =>
  fromJS(getSections(proposal.get('proposalQuestions')));

export const getQuestionsList = (proposal: Map): Map =>
  getQuestionsbySections(proposal.get('proposalQuestions'));

export const isProposalLoading = (proposal: Map): Map =>
  proposal.get('isProposalLoading');

export const hasProposalErrors = (proposal: Map): Map =>
  proposal.get('proposalError');

export const sortQuestions = (proposal: Map): Map =>
  sortData(getQuestionsbySections(proposal.get('proposalQuestions')));

export const setProposalAnswer = (proposal: Map): Map =>
  proposal.get('proposalAnswer');

export const getQuestionSectionOrderInfo = (proposal: Map): Map =>
  proposal.get('proposalQuestionSection');

export const getQuestionSectionInfo = (proposal: Map): Map =>
  getQuestionSections(proposal.get('proposalQuestionSection'));

export const getAnswerTypeInfo = (proposal: Map): Map =>
  proposal.get('proposalAnswerTypes');

export const getRoles = (proposal: Map): Map => proposal.get('proposalRoles');
