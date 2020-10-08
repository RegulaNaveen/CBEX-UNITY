// @flow
import { Map, fromJS } from 'immutable';
import { last } from 'lodash';

const generateSections = (
  proposalQuestions: Object,
  filter: boolean,
  role: string
): Map => {
  let sections = Map();
  const userRole = role !== '' ? role : false;

  proposalQuestions.forEach(question => {
    const {
      questionId,
      roleNames,
      section: { sectionName, sectionOrder }
    } = question;

    const roles = roleNames || [];

    const createSections = () => {
      let section = Map({});
      let questions = sections.getIn([sectionName, 'questions']) || Map({});

      questions = questions.set(questionId, fromJS(question));
      questions = questions.sortBy(item => item.get('questionOrder'));

      section = section
        .set('sectionOrder', sectionOrder)
        .set('sectionName', sectionName)
        .set('questions', questions);

      sections = sections.set(sectionName, section);
    };

    if (filter && userRole) {
      if (roles.includes(userRole)) createSections();
    } else createSections();
  });

  sections = sections.sortBy(section => section.get('sectionOrder'));

  return sections;
};

const getQuestionSections = (items: Array<Object>) => {
  const sections = [];
  let index = -1;

  items.forEach(({ sectionName }: Object) => {
    if (!sections.includes(sectionName)) sections.push(sectionName);
  });

  if (sections.includes('Details')) {
    index = sections.indexOf('Details');

    if (index > -1) sections.splice(index, 1);
  }

  return sections;
};

export const getSections = (proposal: Map): Map =>
  generateSections(proposal.get('proposalQuestions'), false, '');

export const getProposalTeamAssignedRoles = (proposal: Map): Map => {
  const proposalTeamSectionAnswers = proposal
    .get('proposalQuestions')
    .filter(value => value.section.sectionName === 'Proposal Team')
    .map(({ questionText, answers }) => {
      return {
        role: questionText,
        responsable: last(answers) ? last(answers).answer : 'Not defined yet.'
      };
    });

  return proposalTeamSectionAnswers;
};

export const getFilteredSections = (proposal: Map, auth: Map): Map =>
  generateSections(
    proposal.get('proposalQuestions'),
    true,
    auth.getIn(['authData', 'data', 'authService', 'role'])
  );

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

export const getProposalBoxIdIsLoading = (proposal: Map): Map =>
  proposal.get('isGettingBoxId');

export const getProposalBoxIdError = (proposal: Map): Map =>
  proposal.get('onGettingBoxIdError');

export const getProposalBoxId = (proposal: Map): Map => proposal.get('boxId');
