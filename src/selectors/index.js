// @flow
import { Map } from 'immutable';
import * as proposalSelectors from './proposal';
import * as authSelectors from './auth';

// Auth selectors
export const getAuthData = (state: Object): Map =>
  authSelectors.getAuthData(state.auth);

export const isAuthLoading = (state: Object): boolean =>
  authSelectors.isAuthLoading(state.auth);

export const authHasErrors = (state: Object): string =>
  authSelectors.authHasErrors(state.auth);

export const isLogout = (state: Object): Map =>
  authSelectors.isLogout(state.auth);

export const isLogoutLoading = (state: Object): boolean =>
  authSelectors.isLogoutLoading(state.auth);

export const logoutHasErrors = (state: Object): string =>
  authSelectors.logoutHasErrors(state.auth);

export const getChangeRoleError = (state: Object): string =>
  authSelectors.getChangeRoleError(state.auth);

// Proposal selectors
export const getSections = (state: Object): Map =>
  proposalSelectors.getSections(state.proposal);

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
