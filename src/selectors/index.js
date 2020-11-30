// @flow
import { Map } from 'immutable';
import * as proposalsSelectors from './proposals';
import * as proposalSelectors from './proposal';
import * as authSelectors from './auth';
import * as siderbarSelectors from './sidebar';

// Auth selectors
export const getAuthData = (state: Object): Map =>
  authSelectors.getAuthData(state.auth);

export const getUserData = (state: Map): Map =>
  authSelectors.getUserData(state.auth);

export const isAuthLoading = (state: Object): boolean =>
  authSelectors.isAuthLoading(state.auth);

export const authHasErrors = (state: Object): string =>
  authSelectors.authHasErrors(state.auth);

export const getForgotPasswordData = (state: Object): Map =>
  authSelectors.getForgotPasswordData(state.auth);

export const isForgotPasswordLoading = (state: Object): boolean =>
  authSelectors.isForgotPasswordLoading(state.auth);

export const getForgotPasswordError = (state: Object): string =>
  authSelectors.getForgotPasswordError(state.auth);

export const getResetPasswordData = (state: Object): Map =>
  authSelectors.getResetPasswordData(state.auth);

export const isResetPasswordLoading = (state: Object): boolean =>
  authSelectors.isResetPasswordLoading(state.auth);

export const getResetPasswordError = (state: Object): string =>
  authSelectors.getResetPasswordError(state.auth);

export const isLogout = (state: Object): Map =>
  authSelectors.isLogout(state.auth);

export const isLogoutLoading = (state: Object): boolean =>
  authSelectors.isLogoutLoading(state.auth);

export const logoutHasErrors = (state: Object): string =>
  authSelectors.logoutHasErrors(state.auth);

export const getChangeRoleError = (state: Object): string =>
  authSelectors.getChangeRoleError(state.auth);

export const getLookupUsers = (state: Object): Array<Object> =>
  authSelectors.getLookupUsers(state.auth);

export const getLookupUsersError = (state: Object): Array<Object> =>
  authSelectors.getLookupUsersError(state.auth);

// Proposal selectors
export const getSections = (state: Object): Map =>
  proposalSelectors.getSections(state.proposal);

export const getProposalTeamAssignedRoles = (state: Object): Map =>
  proposalSelectors.getProposalTeamAssignedRoles(state.proposal);

export const getFilteredSections = (state: Object): Map =>
  proposalSelectors.getFilteredSections(state.proposal, state.auth);

export const isProposalLoading = (state: Object): Boolean =>
  proposalSelectors.isProposalLoading(state.proposal);

export const hasProposalErrors = (state: Object): string =>
  proposalSelectors.hasProposalErrors(state.proposal);

export const getProposalDetails = (state: Object): Map =>
  proposalSelectors.getProposalDetails(state.proposal);

export const setProposalAnswer = (state: Map): Map =>
  proposalSelectors.setProposalAnswer(state.proposal);

export const getQuestionSectionOrderInfo = (state: Map): Map =>
  proposalSelectors.getQuestionSectionOrderInfo(state.proposal);

export const getQuestionSectionInfo = (state: Map): Map =>
  proposalSelectors.getQuestionSectionInfo(state.proposal);

export const isQuestionSectionInfoLoading = (state: Object): Boolean =>
  proposalSelectors.isQuestionSectionInfoLoading(state.proposal);

export const getAnswerTypeInfo = (state: Map): Map =>
  proposalSelectors.getAnswerTypeInfo(state.proposal);

export const isAnswerTypesInfoLoading = (state: Object): Boolean =>
  proposalSelectors.isAnswerTypesInfoLoading(state.proposal);

export const getRoles = (state: Map): Map =>
  proposalSelectors.getRoles(state.proposal);

export const isRolesInfoLoading = (state: Object): Boolean =>
  proposalSelectors.isRolesInfoLoading(state.proposal);

export const setQuestionData = (state: Object): Map =>
  proposalSelectors.setQuestionData(state.proposal);

export const isSetQuestionLoading = (state: Object): Boolean =>
  proposalSelectors.isSetQuestionLoading(state.proposal);

export const setQuestionError = (state: Object): string =>
  proposalSelectors.setQuestionError(state.proposal);

export const getProposalBoxIdIsLoading = (state: Object): string =>
  proposalSelectors.getProposalBoxIdIsLoading(state.proposal);

export const getProposalBoxIdError = (state: Object): string =>
  proposalSelectors.getProposalBoxIdError(state.proposal);

export const getProposalBoxId = (state: Object): string =>
  proposalSelectors.getProposalBoxId(state.proposal);

export const getValidatedProposalData = (state: Object): Object =>
  proposalSelectors.getValidatedProposalData(state.proposal);

export const getPendingValidatedItems = (state: Object): Object =>
  proposalSelectors.getPendingValidatedItems(state.proposal);

// Tabbar Selectors
export const getProposals = (state: Object): Array<Object> =>
  proposalsSelectors.getProposals(state.proposals);

export const getProposalTypeView = (state: Object): 0 | 1 =>
  proposalsSelectors.getProposalTypeView(state.proposals);

export const getProposalsLoading = (state: Object): boolean =>
  proposalsSelectors.getProposalsLoading(state.proposals);

export const getFilteredProposals = (state: Map): Map =>
  proposalsSelectors.getFilteredProposals(state.proposals);

export const getIsFilteringProposals = (state: Map): boolean =>
  proposalsSelectors.getIsFilteringProposals(state.proposals);

export const getProposalsFilters = (state: Map): Object =>
  proposalsSelectors.getProposalsFilters(state.proposals);

// Sidebar Selectors
export const getSelectedSection = (state: Object): string =>
  siderbarSelectors.getSelectedSectionSelector(state.sidebar);

export const getIsOpen = (state: Object): string =>
  siderbarSelectors.getIsOpen(state.sidebar);
