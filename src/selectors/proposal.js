// @flow
import { Map, fromJS } from 'immutable';

// Creates a order section map where questions are sorted too
const generateSections = (proposalQuestions: Object): Map => {
  let sections = Map();
  proposalQuestions.forEach(question => {
    const { questionId } = question;
    const { sectionName, sectionOrder } = question.section;
    // Sections are unique so a map is created
    let section = Map({});
    // Create new map is no questions map is find
    let questions = sections.getIn([sectionName, 'questions']) || Map({});
    // Add new question
    questions = questions.set(questionId, fromJS(question));
    // Sort questions
    questions = questions.sortBy(item => item.get('questionOrder'));
    section = section
      .set('sectionOrder', sectionOrder)
      .set('sectionName', sectionName)
      .set('questions', questions);
    sections = sections.set(sectionName, section);
  });
  // Sort sections
  sections = sections.sortBy(section => section.get('sectionOrder'));
  return sections;
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

export const getProposalDetails = (proposal: Map): Map =>
  proposal.get('proposalDetails');

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
