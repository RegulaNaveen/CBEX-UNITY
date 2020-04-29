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

const getQuestionsbySections = (questions: Array<Object>) => {
  const questionsList = _.mapValues(
    _.groupBy(questions, 'section.sectionName'),
    sections => sections.map(question => _.omit(question, 'section'))
  );

  return questionsList;
};

export const getQuestions = (proposal: Map): Map =>
  fromJS(getSections(proposal.get('proposalQuestions')));

export const getQuestionsList = (proposal: Map): Map =>
  getQuestionsbySections(proposal.get('proposalQuestions'));

export const isProposalLoading = (proposal: Map): Map =>
  proposal.get('isProposalLoading');

export const hasProposalErrors = (proposal: Map): Map =>
  proposal.get('proposalError');
