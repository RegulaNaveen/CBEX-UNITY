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

// Proposal selectors
export const getQuestions = (state: Object): Map =>
  proposalSelectors.getQuestions(state.proposal);

export const getQuestionsList = (state: Object): Map =>
  proposalSelectors.getQuestionsList(state.proposal);

export const isProposalLoading = (state: Object): Boolean =>
  proposalSelectors.isProposalLoading(state.proposal);

export const hasProposalErrors = (state: Object): string =>
  proposalSelectors.hasProposalErrors(state.proposal);

export const sortQuestions = (state: Object): Map =>
  proposalSelectors.sortQuestions(state.proposal);

export const setProposalAnswer = (state: Map): Map =>
  state.get('proposalAnswer');
