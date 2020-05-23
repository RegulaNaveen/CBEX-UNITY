// @flow
import { Map, fromJS } from 'immutable';

const generateSections = (proposalQuestions: Object): Map => {
  let questions = Map({});
  proposalQuestions.forEach(question => {
    const { questionId } = question;
    const { sectionName, sectionOrder } = question.section;
    questions = questions
      .setIn([sectionOrder], fromJS({ sectionName }))
      .setIn([sectionOrder, sectionName, questionId], fromJS(question));
  });
  return questions;
};

const getQuestionSections = (items: Array<Object>) => {
  const sections = [];
  items.forEach((section: Object) => {
    const { sectionName } = section;
    if (!sections.includes(sectionName)) sections.push(sectionName);
  });
  return sections;
};

export const getSections = (proposal: Map): Map =>
  generateSections(proposal.get('proposalQuestions'));

export const isProposalLoading = (proposal: Map): Map =>
  proposal.get('isProposalLoading');

export const hasProposalErrors = (proposal: Map): Map =>
  proposal.get('proposalError');

export const setProposalAnswer = (proposal: Map): Map =>
  proposal.get('proposalAnswer');

export const getQuestionSectionOrderInfo = (proposal: Map): Map =>
  proposal.get('proposalQuestionSection');

export const getQuestionSectionInfo = (proposal: Map): Map =>
  getQuestionSections(proposal.get('proposalQuestionSection'));

export const getAnswerTypeInfo = (proposal: Map): Map =>
  proposal.get('proposalAnswerTypes');

export const getRoles = (proposal: Map): Map => proposal.get('proposalRoles');

export const setQuestionData = (proposal: Map): Map =>
  proposal.get('setQuestionData');

export const isSetQuestionLoading = (proposal: Map): Map =>
  proposal.get('isSetQuestionLoading');

export const setQuestionError = (proposal: Map): Map =>
  proposal.get('setQuestionError');
