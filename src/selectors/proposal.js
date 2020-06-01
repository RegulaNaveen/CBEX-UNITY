// @flow
import { Map, fromJS } from 'immutable';

// Returns the user Role from local storage
const getUserRole = () => {
  return localStorage.getItem('userRole');
};

// Creates a order section map where questions are sorted too
const generateSections = (proposalQuestions: Object, filter: boolean): Map => {
  let sections = Map();
  const userRole = getUserRole();
  proposalQuestions.forEach(question => {
    const { questionId, roleName } = question;
    const { sectionName, sectionOrder } = question.section;
    // Sections are unique so a map is created
    let section = Map({});
    // let questions = Map({});
    if (filter && userRole) {
      // TODO: Replace BD for user role
      if (roleName === userRole) {
        // Create new map if no questions map is found
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
      }
    } else {
      // Create new map if no questions map is found
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
    }
  });
  // Sort sections
  sections = sections.sortBy(section => section.get('sectionOrder'));
  return sections;
};

const getQuestionSections = (items: Array<Object>) => {
  const sections = [];
  let index = -1;
  items.forEach((section: Object) => {
    const { sectionName } = section;
    if (!sections.includes(sectionName)) sections.push(sectionName);
  });
  if (sections.includes('Details')) {
    index = sections.indexOf('Details');
    if (index > -1) sections.splice(index, 1);
  }
  return sections;
};

export const getSections = (proposal: Map): Map =>
  generateSections(proposal.get('proposalQuestions'), false);

export const getFilteredSections = (proposal: Map): Map =>
  generateSections(proposal.get('proposalQuestions'), true);

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

export const isQuestionSectionInfoLoading = (proposal: Map): Map =>
  proposal.get('isQuestionSectionLoading');

export const getAnswerTypeInfo = (proposal: Map): Map =>
  proposal.get('proposalAnswerTypes');

export const isAnswerTypesInfoLoading = (proposal: Map): Map =>
  proposal.get('isAnswerTypesLoading');

export const getRoles = (proposal: Map): Map => proposal.get('proposalRoles');

export const isRolesInfoLoading = (proposal: Map): Map =>
  proposal.get('isRolesLoading');

export const setQuestionData = (proposal: Map): Map =>
  proposal.get('setQuestionData');

export const isSetQuestionLoading = (proposal: Map): Map =>
  proposal.get('isSetQuestionLoading');

export const setQuestionError = (proposal: Map): Map =>
  proposal.get('setQuestionError');
