import { cloneDeep } from 'lodash';
import {
  deleteApprovalsApi,
  duplicateApprovalApi,
  getApprovalsApi
} from '../../api/approvals';
import { DEFAULT, SEARCH as SEARCH_CONSTANTS } from '../../constants/app';
import { APPROVALS, SEARCH } from '../../constants/types';
import { getUserEmail } from '../../SessionHandler';
import { getErrorMessage, getApprovalCount } from '../../utils/utils';
import { getQuestionsFilters } from '../selectors';
import { selectAllApprovals } from '../selectors/approvals';
import { selectQuery } from '../selectors/search';
import { doSearchAction } from './search-actions';

export const setAllApprovals = data => ({
  type: APPROVALS.SET_APPROVALS,
  payload: data
});

export const fetchAllApprovals = (proposalId, questions) => async dispatch => {
  try {
    dispatch({ type: APPROVALS.FETCH_APPROVALS });
    // Api Response
    const response = await getApprovalsApi(proposalId, questions);
    let { data } = response.data;
    const { approvalCount, finalapproval } = await getApprovalCount(
      data,
      questions
    );
    if (approvalCount && approvalCount === 0) {
      data = [];
    } else {
      data = finalapproval;
    }
    dispatch(setAllApprovals(data));
    return { status: true, title: DEFAULT.SUCCESS, data };
  } catch (error) {
    dispatch(setAllApprovals([]));
    // Error
    const message = getErrorMessage(error);
    return { status: false, title: DEFAULT.ALERT, message };
  }
};

export const deleteApprovalAction = approvalId => ({
  type: APPROVALS.DELETE_APPROVALS,
  payload: approvalId
});

export const deleteApproval = (proposalId, sectionId) => async (
  dispatch,
  getState
) => {
  try {
    const proposalDetails = getState().proposal?.get('proposalDetails');
    // Api Response
    const response = await deleteApprovalsApi(
      proposalId,
      sectionId,
      proposalDetails['CRM #']
    );
    dispatch(deleteApprovalAction(sectionId));
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { status: true, title: DEFAULT.SUCCESS, data: response.data };
  } catch (error) {
    // Error
    console.log(error.response);
    const message = getErrorMessage(error);
    return { status: false, title: DEFAULT.ALERT, message };
  }
};

export const duplicateApprovalAction = (sectionId, proposalId, data) => ({
  type: APPROVALS.DUPLICATE_APPROVALS,
  payload: { sectionId, proposalId, data }
});

export const duplicateApproval = (proposalId, sectionId) => async dispatch => {
  try {
    // Api Response
    const response = await duplicateApprovalApi(proposalId, sectionId);
    dispatch(
      duplicateApprovalAction(sectionId, proposalId, response.data.data)
    );
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { status: true, title: DEFAULT.SUCCESS, data: response.data.data };
  } catch (error) {
    // Error
    const message = getErrorMessage(error);
    return { status: false, title: DEFAULT.ALERT, message };
  }
};

export const setCanSendEmailInApprovals = can => {
  return dispatch => {
    dispatch({
      type: APPROVALS.SET_CAN_SEND_EMAIL_IN_APPROVALS,
      payload: can
    });
  };
};

export const fetchApprovalSendEmailFlag = val => {
  return async dispatch => {
    dispatch(setCanSendEmailInApprovals(val));
  };
};

export const updateFilters = (name, value) => {
  return async (dispatch, getState) => {
    const state = getState();
    const searchQuery = selectQuery(state);
    const questionsFilter = getQuestionsFilters(state);
    const approvalFilters = state.approvals.filters;
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
      totalFiltersApplied += approvalFilters.filter(item => item.value).length;
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
      type: APPROVALS.UPDATE_FILTERS,
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
    dispatch({ type: APPROVALS.RESET_FILTERS });
    if (searchQuery !== null && searchQuery.length >= 3) {
      dispatch(doSearchAction());
    }
  };
}

export function onApprovalSectionDuplicatingAction(info) {
  return async (dispatch, getState) => {
    if (info.userEmail !== getUserEmail()) {
      const currentState = getState();
      const prevApprovals = selectAllApprovals(currentState);
      let newApprovals = cloneDeep(prevApprovals);
      const approvalIndex = newApprovals.findIndex(
        approval => approval.ApprovalSectionId === info.sectionId
      );
      if (approvalIndex > -1) {
        newApprovals[approvalIndex]['duplicating'] = info.duplicating;
        dispatch(setAllApprovals(newApprovals));
      }
    }
  };
}

export function onApprovalSectionDuplicatedAction({
  proposalId,
  sectionId,
  approvalData,
  userEmail
}) {
  return async dispatch => {
    if (userEmail !== getUserEmail()) {
      dispatch(duplicateApprovalAction(sectionId, proposalId, approvalData));
    }
  };
}

export function onApprovalSectionDeletingAction(info) {
  return async (dispatch, getState) => {
    if (info.userEmail !== getUserEmail()) {
      const currentState = getState();
      const prevApprovals = selectAllApprovals(currentState);
      let newApprovals = cloneDeep(prevApprovals);
      const approvalIndex = newApprovals.findIndex(
        approval => approval.ApprovalSectionId === info.sectionId
      );
      if (approvalIndex > -1) {
        newApprovals[approvalIndex]['deleting'] = info.deleting;
        dispatch(setAllApprovals(newApprovals));
      }
    }
  };
}

export function onApprovalSectionDeletedAction({ sectionId, userEmail }) {
  return async dispatch => {
    if (userEmail !== getUserEmail()) {
      dispatch(deleteApprovalAction(sectionId));
    }
  };
}
