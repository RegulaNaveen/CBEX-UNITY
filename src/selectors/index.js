// @flow
import { Map } from 'immutable';
import * as proposalSelectors from './proposal';

// Proposal selectors
export const getQuestions = (state: Object): Map =>
  proposalSelectors.getQuestions(state.proposal);

export const DummyForExport = (state: Map): string =>
  proposalSelectors.DummyForExport(state.proposal);
