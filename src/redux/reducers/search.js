import { SEARCH } from '../../constants/types';

export const INITIAL_STATE = {
  query: null,
  isOpen: false,
  currentResultIndex: -1,
  prevResult: null,
  totalResultsFound: 0,
  searching: false,
  searchResults: [],
  autoNavigatedToCurrentResult: true,
  clearInputFlag: false,
  showModal: false,
  modalTitle: '',
  modalContent: ''
};

export default function searchReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SEARCH.OPEN: {
      return { ...state, isOpen: true };
    }
    case SEARCH.CLOSE: {
      return { ...state, isOpen: false };
    }
    case SEARCH.UPDATE_QUERY: {
      return { ...state, query: action.payload };
    }
    case SEARCH.CLEAR: {
      return {
        ...state,
        query: null,
        searchResults: [],
        totalResultsFound: 0,
        currentResultIndex: -1,
        autoNavigatedToCurrentResult: true
      };
    }
    case SEARCH.NAVIGATE_NEXT: {
      return {
        ...state,
        prevResult: action.payload.prevResult,
        currentResultIndex: action.payload.newIndex,
        autoNavigatedToCurrentResult: false
      };
    }
    case SEARCH.NAVIGATE_PREVIOUS: {
      return {
        ...state,
        prevResult: action.payload.prevResult,
        currentResultIndex: action.payload.newIndex,
        autoNavigatedToCurrentResult: false
      };
    }
    case SEARCH.DO_SEARCH: {
      return { ...state, searching: true };
    }
    case SEARCH.AUTO_NAVIGATION_DONE: {
      return { ...state, autoNavigatedToCurrentResult: true };
    }
    case SEARCH.UPDATE_SEARCH_RESULTS: {
      return {
        ...state,
        searching: false,
        searchResults: action.payload.results,
        totalResultsFound: action.payload.count,
        prevResult: action.payload.prevResult,
        currentResultIndex: action.payload.newCurrentResultIndex,
        autoNavigatedToCurrentResult:
          action.payload.autoNavigatedToCurrentResult
      };
    }
    case SEARCH.CLEAR_ACTIVE_SEARCH_HIGHLIGHT: {
      return {
        ...state,
        prevResult: action.payload,
        autoNavigatedToCurrentResult: true
      };
    }
    case SEARCH.SET_CLEAR_INPUT_FLAG: {
      return {
        ...state,
        clearInputFlag: true
      };
    }
    case SEARCH.RESET_CLEAR_INPUT_FLAG: {
      return {
        ...state,
        clearInputFlag: false
      };
    }
    case SEARCH.SHOW_MODAL: {
      return {
        ...state,
        showModal: true,
        modalTitle: action.payload.modalTitle,
        modalContent: action.payload.modalContent
      };
    }
    case SEARCH.HIDE_MODAL: {
      return {
        ...state,
        showModal: false,
        modalTitle: '',
        modalContent: ''
      };
    }
    default:
      return state;
  }
}
