// @flow
import { Map } from 'immutable';
import * as proposalSelectors from './proposal';

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
