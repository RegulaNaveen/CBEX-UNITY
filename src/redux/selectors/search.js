import { createSelector } from 'reselect';
import { selectApprovalsFetching } from './approvals';
import { isProposalLoading } from './index';

const selectSearch = state => state.search;

export const selectIsOpen = createSelector(
  selectSearch,
  search => search.isOpen
);

export const selectQuery = createSelector(selectSearch, search => search.query);

export const selectSearchResults = createSelector(
  selectSearch,
  search => search.searchResults
);

export const selectTotalResultsFound = createSelector(
  selectSearch,
  search => search.totalResultsFound
);

export const selectCurrentResultIndex = createSelector(
  selectSearch,
  search => search.currentResultIndex
);

export const selectCurrentSearchResult = createSelector(
  selectSearchResults,
  selectCurrentResultIndex,
  (searchResults, index) => {
    if (index > -1 && index < searchResults.length) {
      return searchResults[index];
    } else {
      return null;
    }
  }
);

export const selectPrevSearchResult = createSelector(
  selectSearch,
  search => search.prevResult
);

export const selectAutoNavigatedToCurrentResult = createSelector(
  selectSearch,
  search => search.autoNavigatedToCurrentResult
);

export const selectClearInputFlag = createSelector(
  selectSearch,
  search => search.clearInputFlag
);

export const selectDataPrerequisiteSatisfied = createSelector(
  isProposalLoading,
  selectApprovalsFetching,
  (proposalLoading, approvalLoading) => !proposalLoading && !approvalLoading
);

export const selectSearching = createSelector(
  selectSearch,
  search => search.searching
);
