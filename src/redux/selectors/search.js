import { createSelector } from 'reselect';

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
