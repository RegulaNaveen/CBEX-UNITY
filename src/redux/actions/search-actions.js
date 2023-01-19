import * as Y from 'yjs';
import { yDocToProsemirrorJSON } from 'y-prosemirror';
import { NOTES_SOCKET_URL } from '../../constants/api';
import { SEARCH, UI } from '../../constants/types';
import { WebsocketProvider } from '../../context/y-websocket';
import {
  extractTextFromProseMirrorJSON,
  getSearchResults
} from '../../utils/searchUtils';
import { selectAllApprovals } from '../selectors/approvals';
import {
  getSelectedBid,
  selectActiveTabIndex,
  selectActiveVTabIndex,
  selectProposal,
  selectProposalQuestions,
  selectSections,
  selectAreAllSectionsExpanded
} from '../selectors/proposal';
import {
  selectCurrentResultIndex,
  selectCurrentSearchResult,
  selectQuery,
  selectSearchResults,
  selectAutoNavigatedToCurrentResult
} from '../selectors/search';
import {
  expandAllSectionsAction,
  setActiveTabIndexAction,
  setVTabActiveIndexAction
} from './proposal-actions';
import {
  selectFilteredSections,
  selectIsQuestionsFilterEnabled
} from '../selectors';

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
    const activeVTab = selectActiveVTabIndex(currentState);
    if (currentResultIndex > -1) {
      const newIndex =
        currentResultIndex < searchResults.length - 1
          ? currentResultIndex + 1
          : 0;
      const newResult = searchResults[newIndex];
      if (newResult.tab !== activeTab) {
        await dispatch(setActiveTabIndexAction(newResult.tab));
        dispatch({
          type: UI.SET_SNACKBAR_MSG,
          payload: `Switched to ${
            newResult.tab === 0 ? 'Strategy Development' : 'Approvals'
          } Tab`
        });
        dispatch({
          type: UI.SHOW_SNACKBAR
        });
      }
      if (newResult.vTab !== null && newResult.vTab !== activeVTab) {
        await dispatch(setVTabActiveIndexAction(newResult.vTab));
      }
      dispatch({
        type: SEARCH.NAVIGATE_NEXT,
        payload: { prevResult: searchResults[currentResultIndex], newIndex }
      });
      dispatch(resetAutoNavigatedStateAfterDelay());
    }
  };
};

export const navigatePrevSearchAction = () => {
  return async (dispatch, getState) => {
    const currentState = getState();
    const searchResults = selectSearchResults(currentState);
    const currentResultIndex = selectCurrentResultIndex(currentState);
    const activeTab = selectActiveTabIndex(currentState);
    const activeVTab = selectActiveVTabIndex(currentState);
    if (currentResultIndex > -1) {
      const newIndex =
        currentResultIndex > 0 && currentResultIndex < searchResults.length
          ? currentResultIndex - 1
          : searchResults.length - 1;
      const newResult = searchResults[newIndex];
      if (newResult.tab !== activeTab) {
        await dispatch(setActiveTabIndexAction(newResult.tab));
        dispatch({
          type: UI.SET_SNACKBAR_MSG,
          payload: `Switched to ${
            newResult.tab === 0 ? 'Strategy Development' : 'Approvals'
          } Tab`
        });
        dispatch({
          type: UI.SHOW_SNACKBAR
        });
      }
      if (newResult.vTab !== null && newResult.vTab !== activeVTab) {
        await dispatch(setVTabActiveIndexAction(newResult.vTab));
      }
      dispatch({
        type: SEARCH.NAVIGATE_PREVIOUS,
        payload: { prevResult: searchResults[currentResultIndex], newIndex }
      });
      dispatch(resetAutoNavigatedStateAfterDelay());
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
    const allSectionsExpanded = selectAreAllSectionsExpanded(currentState);
    if (allSectionsExpanded) {
      dispatch(expandAllSectionsAction(false));
    }
    const allFlags = currentState.proposal.get('eventflag');
    const query = selectQuery(currentState);
    const sections = selectSections(currentState);
    const filteredSections = selectFilteredSections(currentState);
    const isQuestionsFilterEnabled = selectIsQuestionsFilterEnabled(
      currentState
    );
    const questions = selectProposalQuestions(currentState);
    const selectedBid = getSelectedBid(currentState).toJS();
    const shouldCheckNotepad =
      (allFlags.notepad || false) && (allFlags.verticalTab || false);
    let notepadData = [];
    const isApprovalCount = selectedBid?.isApprovalCountPresent || false;
    const shouldCheckApprovals = isApprovalCount && allFlags.approvalsFlag;
    const approvals = selectAllApprovals(currentState);
    if (shouldCheckNotepad) {
      try {
        if (selectedBid.id) {
          const yDoc = new Y.Doc();
          const storedValue = `doc-${selectedBid.id}`;
          let wsProvider = new WebsocketProvider(
            NOTES_SOCKET_URL,
            `?=${storedValue}&`,
            yDoc
          );
          wsProvider.on('sync', async isSynced => {
            if (isSynced) {
              const proseMirrorData = yDocToProsemirrorJSON(yDoc, 'default');
              console.log('proseMirrorData', proseMirrorData);
              notepadData = extractTextFromProseMirrorJSON(proseMirrorData);
              dispatch(
                resumeSearchAction({
                  query,
                  questions,
                  sections: isQuestionsFilterEnabled
                    ? filteredSections.toJS()
                    : sections.toJS(),
                  approvals: shouldCheckApprovals ? approvals : [],
                  notepadData
                })
              );
            }
          });
          wsProvider.on('connection-close', () => {
            if (wsProvider.wsUnsuccessfulReconnects >= 3) {
              wsProvider = null;
              dispatch(
                resumeSearchAction({
                  query,
                  questions,
                  sections: isQuestionsFilterEnabled
                    ? filteredSections.toJS()
                    : sections.toJS(),
                  approvals: shouldCheckApprovals ? approvals : [],
                  notepadData
                })
              );
            }
          });
          wsProvider.on('connection-error', () => {
            wsProvider = null;
            dispatch(
              resumeSearchAction({
                query,
                questions,
                sections: isQuestionsFilterEnabled
                  ? filteredSections.toJS()
                  : sections.toJS(),
                approvals: shouldCheckApprovals ? approvals : [],
                notepadData
              })
            );
          });
        }
      } catch (e) {
        console.error('Error in retrieving and processing notepad data: ', e);
        dispatch(
          resumeSearchAction({
            query,
            questions,
            sections: isQuestionsFilterEnabled
              ? filteredSections.toJS()
              : sections.toJS(),
            approvals: shouldCheckApprovals ? approvals : [],
            notepadData
          })
        );
      }
    } else {
      dispatch(
        resumeSearchAction({
          query,
          questions,
          sections: isQuestionsFilterEnabled
            ? filteredSections.toJS()
            : sections.toJS(),
          approvals: shouldCheckApprovals ? approvals : [],
          notepadData
        })
      );
    }
  };
};

export const resumeSearchAction = ({
  query,
  questions,
  sections,
  approvals,
  notepadData
}) => {
  return async (dispatch, getState) => {
    const currentState = getState();
    const activeTab = selectActiveTabIndex(currentState);
    const activeVTab = selectActiveVTabIndex(currentState);
    const prevSearchResults = selectSearchResults(currentState);
    const prevActiveSearchIndex = selectCurrentResultIndex(currentState);
    const isQuestionsFilterEnabled = selectIsQuestionsFilterEnabled(
      currentState
    );
    const approvalFilters = currentState.approvals.filters;
    let searchResults = await getSearchResults({
      query: query !== null ? query : '',
      questions,
      sections,
      approvals,
      notepadData,
      activeTab,
      isQuestionsFilterEnabled,
      approvalFilters
    });
    if (searchResults.count > 0) {
      searchResults.newCurrentResultIndex = 0;
      searchResults.autoNavigatedToCurrentResult = false;
      const newResult = searchResults.results[0];
      if (newResult.tab !== activeTab) {
        await dispatch(setActiveTabIndexAction(newResult.tab));
        dispatch({
          type: UI.SET_SNACKBAR_MSG,
          payload: `Switched to ${
            newResult.tab === 0 ? 'Strategy Development' : 'Approvals'
          } Tab`
        });
        dispatch({
          type: UI.SHOW_SNACKBAR
        });
      }
      if (newResult.vTab !== null && newResult.vTab !== activeVTab) {
        await dispatch(setVTabActiveIndexAction(newResult.vTab));
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
    dispatch(resetAutoNavigatedStateAfterDelay());
  };
};

const resetAutoNavigatedStateAfterDelay = () => {
  return async (dispatch, getState) => {
    await new Promise(resolve => {
      setTimeout(() => resolve(), 5000);
    });
    const autoNavigated = selectAutoNavigatedToCurrentResult(getState());
    if (!autoNavigated) {
      dispatch(autoNavigationCompletedAction());
    }
  };
};
