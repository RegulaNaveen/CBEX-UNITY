// @flow
import { Map } from 'immutable';

export const getProposals = (proposals: Map): Array<Object> =>
  proposals.get('proposals');

export const getProposalsLoading = (proposals: Map): boolean =>
  proposals.get('proposalsLoading');

export const getProposalTypeView = (proposals: Map): 0 | 1 =>
  proposals.get('selectedViewType');

export const getFilteredProposals = (proposals: Map): Map =>
  proposals.get('filteredProposals');

export const getIsFilteringProposals = (proposals: Map): boolean =>
  proposals.get('isFiltering');

export const getProposalsFilters = (proposals: Map): Object =>
  proposals.get('proposalsFilters');
