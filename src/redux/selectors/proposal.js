// @flow
import { Map, fromJS } from 'immutable';
import { last, uniq } from 'lodash';
import { createSelector } from 'reselect';

const generateMilestone = (proposalQuestions: Object) => {
  const flag = proposalQuestions.filter(question => question?.milestone);
  if (flag && flag.length) {
    return true;
  }
  return false;
};

const generateSections = (
  proposalQuestions: Object,
  filter: boolean,
  role: string
): Map => {
 try {
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
 } catch (error) {
   console.log(error)
 }
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

function getRecentAnswer(answers) {
  const recentAnswer = last(answers);
  if (
    recentAnswer &&
    recentAnswer.answer &&
    String(recentAnswer.answer).trim().length
  ) {
    return String(recentAnswer.answer).trim().length > 0
      ? recentAnswer.answer
      : 'Not defined yet.';
  }
  return 'Not defined yet.';
}

export const getSections = (proposal: Map): Map =>
  generateSections(proposal.get('proposalQuestions'), false, '');

export const getProposalTeamAssignedRoles = (proposal: Map): Map => {
  const proposalTeamSectionAnswers = proposal
    .get('proposalQuestions')
    .filter(value => value.section.sectionName === 'Proposal Team')
    .map(({ questionText, answers }) => {
      return {
        role: questionText,
        responsable: getRecentAnswer(answers)
      };
    });

  return proposalTeamSectionAnswers;
};

export const getFilteredSections = (proposal: Map, auth: Map): Map =>
  generateSections(proposal.get('proposalQuestions'), true, auth.get('role'));

export const getMilestoneSections = (proposal: Map, auth: Map): Map =>
  generateMilestone(proposal.get('proposalQuestions'));

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

export const getValidatedProposalData = (proposal: Map): Object => ({
  isLoading: proposal.get('fetchingValidatedProposalData'),
  data: proposal.get('validatedProposalData'),
  error: proposal.get('validatedProposalDataError')
});

export const getPendingValidatedItems = (propoal: Map): number => {
  const pendingItems = propoal
    .get('validatedProposalData')
    .toJS()
    .filter(({ status }) => status === 'warning').length;

  return pendingItems;
};

function createSectionsFromQuestions(questions) {
  try {
    return generateSections(questions, false, false);
  } catch (error) {
    console.log(error)
  }
}

export function getUniqueMilestones(questions) {
  const milestones = [];
  fromJS(questions)
    .valueSeq()
    .forEach(question => {
      if (question.get('milestone')) {
        milestones.push(question.get('milestone'));
      }
    });

  return uniq(milestones);
}

export function selectProposal(state) {
  return state.proposal;
}

export const selectProposalQuestions = createSelector(
  selectProposal,
  proposal => proposal.get('proposalQuestions', Map({}))
);

export const selectFilteredProposalQuestions = createSelector(
  selectProposal,
  proposal => proposal.get('filteredProposalQuestions', Map({}))
);

export const selectQuestionsFilters = createSelector(selectProposal, proposal =>
  proposal.get('questionsFilter', Map({}))
);

export const selectActiveQuestionsFilters = createSelector(
  selectQuestionsFilters,
  questionsFilters => questionsFilters.filter(filter => filter.get('checked'))
);

export const selectIsQuestionsFilterEnabled = createSelector(
  selectQuestionsFilters,
  questionsFilters =>
    questionsFilters.some(filter => filter.get('checked', false))
);

export const selectSections = createSelector(
  selectProposalQuestions,
  proposalQuestions => createSectionsFromQuestions(proposalQuestions)
);

export const selectSectionNames = createSelector(selectSections, sections =>
  sections
    .valueSeq()
    .map(section => section.get('sectionName'))
    .toJS()
);

export const selectSectionOrderInfo = createSelector(selectSections, sections =>
  sections.valueSeq().map(section => ({
    sectionName: section.get('sectionName'),
    sectionOrder: section.get('sectionOrder')
  }))
);

export const selectFilteredSections = createSelector(
  selectFilteredProposalQuestions,
  proposalQuestions => createSectionsFromQuestions(proposalQuestions)
);

export const selectActiveQuestionsFilterCount = createSelector(
  selectActiveQuestionsFilters,
  filters => filters.size
);

export const selectUniqueMilestones = createSelector(
  selectProposalQuestions,
  questions => getUniqueMilestones(questions)
);

export const selectAreAllSectionsExpanded = createSelector(
  selectProposal,
  proposal => proposal.get('areAllSectionsExpanded')
);

export const getEditQuestionData = createSelector(selectProposal, proposal =>
  proposal.get('editQuestionsData', Map({}))
);
