import * as Y from 'yjs';
import { yDocToProsemirrorJSON } from 'y-prosemirror';
import { NOTES_SOCKET_URL } from '../../constants/api';
import { SEARCH } from '../../constants/types';
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
  selectSections
} from '../selectors/proposal';
import {
  selectCurrentResultIndex,
  selectCurrentSearchResult,
  selectQuery,
  selectSearchResults
} from '../selectors/search';
import {
  setActiveTabIndexAction,
  setVTabActiveIndexAction
} from './proposal-actions';

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
      if (newResult.vTab !== null && newResult.vTab !== activeVTab) {
        await dispatch(setVTabActiveIndexAction(newResult.vTab));
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
      if (newResult.vTab !== null && newResult.vTab !== activeVTab) {
        await dispatch(setVTabActiveIndexAction(newResult.vTab));
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

export const checkDataPrerequisiteAction = () => {
  return async (dispatch, getState) => {};
};

export const doSearchAction = () => {
  return async (dispatch, getState) => {
    dispatch({ type: SEARCH.DO_SEARCH });
    const currentState = getState();
    const allFlags = currentState.proposal.get('eventflag');
    const query = selectQuery(currentState);
    const sections = selectSections(currentState);
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
              notepadData = extractTextFromProseMirrorJSON(proseMirrorData);
              dispatch(
                resumeSearchAction({
                  query,
                  questions,
                  sections: sections.toJS(),
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
                  sections: sections.toJS(),
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
                sections: sections.toJS(),
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
            sections: sections.toJS(),
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
          sections: sections.toJS(),
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
    console.log('Notepad data', notepadData);
    const currentState = getState();
    const activeTab = selectActiveTabIndex(currentState);
    const activeVTab = selectActiveVTabIndex(currentState);
    const prevSearchResults = selectSearchResults(currentState);
    const prevActiveSearchIndex = selectCurrentResultIndex(currentState);
    let searchResults = await getSearchResults(
      query,
      questions,
      sections,
      approvals,
      notepadData
    );
    console.log(searchResults);
    if (searchResults.count > 0) {
      searchResults.newCurrentResultIndex = 0;
      searchResults.autoNavigatedToCurrentResult = false;
      const newResult = searchResults.results[0];
      if (newResult.tab !== activeTab) {
        await dispatch(setActiveTabIndexAction(newResult.tab));
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
  };
};
