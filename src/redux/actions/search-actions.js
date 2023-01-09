import { SEARCH } from '../../constants/types';
import { getSearchResults } from '../../utils/searchUtils';
import { selectAllApprovals } from '../selectors/approvals';
import {
  getSelectedBid,
  selectActiveTabIndex,
  selectProposal,
  selectProposalQuestions,
  selectSections
} from '../selectors/proposal';
import {
  selectCurrentResultIndex,
  selectCurrentSearchResult,
  selectQuery,
  selectSearchResults
} from '../selectors/search';
import { setActiveTabIndexAction } from './proposal-actions';

export const openSearchAction = () => ({ type: SEARCH.OPEN });

export const closeSearchAction = () => ({ type: SEARCH.CLOSE });

export const clearSearchAction = () => {
  return (dispatch, getState) => {
    const currentSearchResult = selectCurrentSearchResult(getState());
    dispatch({
      type: SEARCH.CLEAR_ACTIVE_SEARCH_HIGHLIGHT,
      payload: currentSearchResult
    });
    dispatch({ type: SEARCH.CLEAR });
  };
};

export const updateQuerySearchAction = query => ({
  type: SEARCH.UPDATE_QUERY,
  payload: query
});

export const navigateNextSearchAction = () => {
  return async (dispatch, getState) => {
    const currentState = getState();
    const searchResults = selectSearchResults(currentState);
    const currentResultIndex = selectCurrentResultIndex(currentState);
    const activeTab = selectActiveTabIndex(currentState);
    if (
      currentResultIndex > -1 &&
      currentResultIndex < searchResults.length - 1
    ) {
      const newResult = searchResults[currentResultIndex + 1];
      if (newResult.tab !== activeTab) {
        await dispatch(setActiveTabIndexAction(newResult.tab));
      }
      dispatch({
        type: SEARCH.NAVIGATE_NEXT,
        payload: { prevResult: searchResults[currentResultIndex] }
      });
    }
  };
};

export const navigatePrevSearchAction = () => {
  return async (dispatch, getState) => {
    const currentState = getState();
    const searchResults = selectSearchResults(currentState);
    const currentResultIndex = selectCurrentResultIndex(currentState);
    const activeTab = selectActiveTabIndex(currentState);
    if (currentResultIndex > 0 && currentResultIndex < searchResults.length) {
      const newResult = searchResults[currentResultIndex - 1];
      if (newResult.tab !== activeTab) {
        await dispatch(setActiveTabIndexAction(newResult.tab));
      }
      dispatch({
        type: SEARCH.NAVIGATE_PREVIOUS,
        payload: { prevResult: searchResults[currentResultIndex] }
      });
    }
  };
};

export const autoNavigationCompletedAction = () => ({
  type: SEARCH.AUTO_NAVIGATION_DONE
});

export const doSearchAction = () => {
  return async (dispatch, getState) => {
    dispatch({ type: SEARCH.DO_SEARCH });
    const currentState = getState();
    const query = selectQuery(currentState);
    const activeTab = selectActiveTabIndex(currentState);
    const prevSearchResults = selectSearchResults(currentState);
    const prevActiveSearchIndex = selectCurrentResultIndex(currentState);
    const sections = selectSections(currentState);
    const questions = selectProposalQuestions(currentState);
    const selectedBid = getSelectedBid(currentState).toJS();
    const isApprovalCount = selectedBid?.isApprovalCountPresent || false;
    const allFlags = currentState.proposal.get('eventflag');
    const shouldCheckApprovals = isApprovalCount && allFlags.approvalsFlag;
    const approvals = selectAllApprovals(currentState);
    let searchResults = await getSearchResults(
      questions,
      sections.toJS(),
      shouldCheckApprovals ? approvals : [],
      query
    );
    if (searchResults.count > 0) {
      searchResults.newCurrentResultIndex = 0;
      searchResults.autoNavigatedToCurrentResult = false;
      const newResult = searchResults.results[0];
      if (newResult.tab !== activeTab) {
        await dispatch(setActiveTabIndexAction(newResult.tab));
      }
    } else {
      searchResults.newCurrentResultIndex = -1;
      searchResults.autoNavigatedToCurrentResult = true;
    }

    if (prevSearchResults.length > 0 && prevActiveSearchIndex > -1) {
      searchResults.prevResult = prevSearchResults[prevActiveSearchIndex];
    } else {
      searchResults.prevResult = null;
    }
    dispatch({ type: SEARCH.UPDATE_SEARCH_RESULTS, payload: searchResults });
  };
};
