// @flow
import { Map } from 'immutable';

// eslint-disable-next-line import/prefer-default-export
export const getProposalTypeView = (proposals: Map): 0 | 1 =>
  proposals.get('selectedViewType');
