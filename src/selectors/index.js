// @flow
import { Map } from 'immutable';
import * as proposalSelectors from './proposal';

// Proposal selectors
export const getTestingData = (state: Map): string =>
  proposalSelectors.getTestingData(state.proposal);

export const DummyForExport = (state: Map): string =>
  proposalSelectors.DummyForExport(state.proposal);
