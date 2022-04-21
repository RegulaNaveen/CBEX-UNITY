// @flow
import { Map } from 'immutable';
import { isEmpty } from 'lodash';

export const getProposals = (proposals: Map): Array<Object> => {
  const notEmptyProposals = !isEmpty(proposals.get('proposals'))
    ? proposals.get('proposals').filter(proposal => !isEmpty(proposal))
    : [];

  return notEmptyProposals;
};

export const getProposalsLoading = (proposals: Map): boolean =>
  proposals.get('proposalsLoading');

export const getProposalTypeView = (proposals: Map): 0 | 1 =>
  proposals.get('selectedViewType');

export const getFilteredProposals = (proposals: Map): Map => {
  const notEmptyProposals = !isEmpty(proposals.get('filteredProposals'))
    ? proposals.get('filteredProposals').filter(proposal => !isEmpty(proposal))
    : [];

  return notEmptyProposals;
};

export const getIsFilteringProposals = (proposals: Map): boolean =>
  proposals.get('isFiltering');

export const getProposalsFilters = (proposals: Map): Object =>
  proposals.get('proposalsFilters');

export const getPage = (proposals: Map): Object => proposals.get('page');

export const getNumOfRows = (proposals: Map): Object =>
  proposals.get('numRows');

export const getnoneditableField = (proposals: Map): Object =>
  proposals.get('nonEditableSF');
