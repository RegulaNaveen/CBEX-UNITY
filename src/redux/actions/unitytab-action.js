import {
  deleteUnityTabApi,
  duplicateUnityTabApi,
  getUnityTabApi
} from '../../api/approvals';
import { DEFAULT, SEARCH as SEARCH_CONSTANTS } from '../../constants/app';
import { UNITY_TABS, SEARCH } from '../../constants/types';
import { getErrorMessage, getApprovalCount } from '../../utils/utils';
import { getQuestionsFilters } from '../selectors';
import { selectQuery } from '../selectors/search';
import { doSearchAction } from './search-actions';

export const setAllUnityTab = data => ({
  type: UNITY_TABS.SET_UNITY_TABS,
  payload: data
});

export const fetchAllUnityTab = (proposalId, questions) => async dispatch => {
  try {
    dispatch({ type: UNITY_TABS.FETCH_UNITY_TABS });
    // Api Response
    const response = await getUnityTabApi(proposalId, questions);
    let { data } = response.data;
    const { approvalCount, finalunityTab } = await getApprovalCount(
      data,
      questions
    );
    if (approvalCount && approvalCount === 0) {
      data = [];
    } else {
      data = finalunityTab;
    }
    dispatch(setAllUnityTab(data));
    return { status: true, title: DEFAULT.SUCCESS, data };
  } catch (error) {
    dispatch(setAllUnityTab([]));
    // Error
    const message = getErrorMessage(error);
    return { status: false, title: DEFAULT.ALERT, message };
  }
};

export const deleteUnityTabAction = approvalId => ({
  type: UNITY_TABS.DELETE_UNITY_TABS,
  payload: approvalId
});

export const deleteUnityTab = (proposalId, sectionId) => async (
  dispatch,
  getState
) => {
  try {
    const proposalDetails = getState().proposal?.get('proposalDetails');
    // Api Response
    const response = await deleteUnityTabApi(
      proposalId,
      sectionId,
      proposalDetails['CRM #']
    );
    dispatch(deleteUnityTabAction(sectionId));
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { status: true, title: DEFAULT.SUCCESS, data: response.data };
  } catch (error) {
    // Error
    console.log(error.response);
    const message = getErrorMessage(error);
    return { status: false, title: DEFAULT.ALERT, message };
  }
};

export const duplicateUnityTab = (sectionId, proposalId, data) => ({
  type: UNITY_TABS.DUPLICATE_UNITY_TABS,
  payload: { sectionId, proposalId, data }
});

export const duplicateUnityTabs = (proposalId, sectionId) => async dispatch => {
  try {
    // Api Response
    const response = await duplicateUnityTabApi(proposalId, sectionId);
    dispatch(duplicateUnityTab(sectionId, proposalId, response.data.data));
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { status: true, title: DEFAULT.SUCCESS, data: response.data.data };
  } catch (error) {
    // Error
    const message = getErrorMessage(error);
    return { status: false, title: DEFAULT.ALERT, message };
  }
};

export const setCanSendEmailInUnityTab = can => {
  return dispatch => {
    dispatch({
      type: UNITY_TABS.SET_CAN_SEND_EMAIL_IN_UNITY_TABS,
      payload: can
    });
  };
};

export const fetchUnityTabSendEmailFlag = val => {
  return async dispatch => {
    dispatch(setCanSendEmailInUnityTab(val));
  };
};

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
    if (searchQuery !== null && searchQuery.length >= 3) {
      dispatch(doSearchAction());
    }
  };
};

export function resetFiltersAction() {
  return async (dispatch, getState) => {
    const searchQuery = selectQuery(getState());
    dispatch({ type: UNITY_TABS.RESET_FILTERS });
    if (searchQuery !== null && searchQuery.length >= 3) {
      dispatch(doSearchAction());
    }
  };
}
