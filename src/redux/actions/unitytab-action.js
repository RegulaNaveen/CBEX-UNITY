import { DEFAULT, SEARCH as SEARCH_CONSTANTS } from '../../constants/app';
import { UNITY_TABS, SEARCH } from '../../constants/types';
import { getErrorMessage } from '../../utils/utils';
import { getQuestionsFilters } from '../selectors';
import { selectQuery } from '../selectors/search';
import { doSearchAction } from './search-actions';
import {
  setUnityQuestionData,
  editUnityQuestionData,
  deleteUnityQuestionData
} from '../../api/unityTab';
import { REDUX_TYPES, API } from '../../constants';

const {
  PROPOSAL_SET_QUESTION_LOADING,
  PROPOSAL_SET_QUESTION_ERROR,
  PROPOSAL_DELETE_QUESTION,
  PROPOSAL_EDIT_QUESTION,
  PROPOSAL_CUSTOM_TAB_SET_QUESTION,
  PROPOSAL_CUSTOM_TAB_SET_QUESTION_LOAD
} = REDUX_TYPES.PROPOSAL;
const {
  SET_APPROVAL_QUESTION_APPROVALS_TAB,
  UPDATE_APPROVAL_QUESTION_CUSTOM_TAB,
  DELETE_APPROVAL_QUESTION_CUSTOM_TAB
} = REDUX_TYPES.APPROVALS;

export const setAllUnityTab = data => ({
  type: UNITY_TABS.SET_UNITY_TABS,
  payload: data
});

export const setTabRefresh = data => ({
  type: UNITY_TABS.SET_TAB_REFRESH,
  payload: data
});

export const updateNewFilters = data => ({
  type: UNITY_TABS.UPDATE_NEW_FILTER,
  payload: data
});

export const updateFilters = (name, value) => {
  return async (dispatch, getState) => {
    const state = getState();
    const searchQuery = selectQuery(state);
    const questionsFilter = getQuestionsFilters(state);
    const unityTabFilters = state.unitytab.filters;
    if (searchQuery !== null && searchQuery.length >= 3 && value) {
      let totalFiltersApplied = 0;
      questionsFilter.entrySeq().forEach(([groupName, group]) => {
        group
          .entrySeq()
          .filter(value => value[0] !== 'logic')
          .forEach(([key, filter]) => {
            if (filter.get('checked')) {
              totalFiltersApplied++;
            }
          });
      });
      totalFiltersApplied += unityTabFilters.filter(item => item.value).length;
      if (totalFiltersApplied === 0) {
        dispatch({
          type: SEARCH.SHOW_MODAL,
          payload: {
            modalTitle: SEARCH_CONSTANTS.TITLE_SEARCH_ACTIVE,
            modalContent: SEARCH_CONSTANTS.CONTENT_SEARCH_ACTIVE
          }
        });
      }
    }
    await dispatch({
      type: UNITY_TABS.UPDATE_FILTERS,
      payload: { name, value }
    });
  };
};

export function resetFiltersAction() {
  return async (dispatch, getState) => {
    dispatch({ type: UNITY_TABS.RESET_FILTERS });
  };
}
export function resetSingleTabFiltersAction() {
  return async (dispatch, getState) => {
    dispatch({ type: UNITY_TABS.RESET_SINGLE_TAB_FILTERS });
  };
}

export const setUnityQuestion = (
  proposalId: string,
  questionData: Object,
  socketContext
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: PROPOSAL_SET_QUESTION_LOADING,
      payload: {}
    });
    try {
      const data = await setUnityQuestionData(proposalId, questionData);
      if (data) {
        dispatch({ type: PROPOSAL_CUSTOM_TAB_SET_QUESTION, payload: data });
        if (questionData.type == 'customTab') {
          dispatch({
            type: UNITY_TABS.SET_CUSTOM_QUESTION_CUSTOM_TAB,
            payload: data
          });

          dispatch({
            type: PROPOSAL_CUSTOM_TAB_SET_QUESTION_LOAD,
            payload: data
          });
        } else {
          dispatch({
            type: SET_APPROVAL_QUESTION_APPROVALS_TAB,
            payload: data
          });

          dispatch({
            type: PROPOSAL_CUSTOM_TAB_SET_QUESTION_LOAD,
            payload: data
          });
        }
        if (socketContext) await socketContext?.addQuestionWrapper(data);
        return data;
      }
    } catch (err) {
      dispatch({ type: PROPOSAL_SET_QUESTION_ERROR, payload: err });
    }
  };
};

export const editUnityQuestion = (
  proposalId: string,
  questionId: string,
  questionData: Object,
  socketContext
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: PROPOSAL_SET_QUESTION_LOADING,
      payload: {}
    });
    try {
      const data = await editUnityQuestionData(
        proposalId,
        questionId,
        questionData
      );

      dispatch({ type: PROPOSAL_EDIT_QUESTION, payload: data });

      if (questionData.type == 'customTab') {
        dispatch({
          type: UNITY_TABS.UPDATE_CUSTOM_QUESTION_CUSTOM_TAB,
          payload: data
        });
      } else {
        dispatch({
          type: UPDATE_APPROVAL_QUESTION_CUSTOM_TAB,
          payload: data
        });
      }
      if (socketContext) await socketContext?.questionTextUpdateWrapper(data);
      return data;
    } catch (err) {
      dispatch({ type: PROPOSAL_SET_QUESTION_ERROR, payload: err });
    }
  };
};

export const deleteUnityQuestion = (
  questionData: Object,
  socketContext
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: PROPOSAL_SET_QUESTION_LOADING,
      payload: {}
    });
    try {
      const data = await deleteUnityQuestionData(questionData);
      dispatch({
        type: PROPOSAL_DELETE_QUESTION,
        payload: questionData.questionId
      });
      if (questionData.type == 'customTab') {
        dispatch({
          type: UNITY_TABS.DELETE_CUSTOM_QUESTION_CUSTOM_TAB,
          payload: {
            questionId: questionData.questionId,
            sectionName: questionData.sectionName,
            tabId: questionData.tabId
          }
        });
        if (socketContext)
          await socketContext?.customQuestionDeleteWrapper(
            questionData.questionId,
            questionData.sectionName,
            questionData.tabId
          );
      } else {
        dispatch({
          type: DELETE_APPROVAL_QUESTION_CUSTOM_TAB,
          payload: {
            questionId: questionData.questionId,
            approvalSectionName: questionData.sectionName
          }
        });
        if (socketContext)
          await socketContext?.ApprovalCustomQuestionDeleteWrapper(
            questionData.questionId,
            questionData.type,
            questionData.sectionName
          );
      }
    } catch (err) {
      console.log(`err`, err);
      dispatch({ type: PROPOSAL_SET_QUESTION_ERROR, payload: err });
    }
  };
};
