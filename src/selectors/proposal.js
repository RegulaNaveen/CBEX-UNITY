// @flow
import { Map, fromJS } from 'immutable';
import _ from 'lodash';

const getSections = (questions: Array<Object>) => {
  const sections = [];

  questions.forEach((question: Object) => {
    const { section } = question;
    if (!sections.includes(section.sectionName))
      sections.push(section.sectionName);
  });

  return sections;
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

export const getQuestionSectionInfo = (proposal: Map): Map =>
  getQuestionSections(proposal.get('proposalQuestionSection'));

export const getAnswerTypeInfo = (proposal: Map): Map =>
  proposal.get('proposalAnswerTypes');

export const getRoles = (proposal: Map): Map => proposal.get('proposalRoles');
