// @flow
import { Map } from 'immutable';
import * as proposalSelectors from './proposal';
import * as authSelectors from './auth';

// Auth selectors
export const getLoginData = (state: Object): Map =>
  authSelectors.getLoginData(state.auth);

export const getLoginLoading = (state: Object): boolean =>
  authSelectors.getLoginLoading(state.auth);

export const getLoginError = (state: Object): string =>
  authSelectors.getLoginError(state.auth);

// Proposal selectors
export const getQuestions = (state: Object): Map =>
  proposalSelectors.getQuestions(state.proposal);

export const getQuestionsList = (state: Object): Map =>
  proposalSelectors.getQuestionsList(state.proposal);

export const isProposalLoading = (state: Object): Boolean =>
  proposalSelectors.isProposalLoading(state.proposal);

export const hasProposalErrors = (state: Object): string =>
  proposalSelectors.hasProposalErrors(state.proposal);
