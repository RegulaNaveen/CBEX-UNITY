import {
  deleteApprovalsApi,
  duplicateApprovalApi,
  getApprovalsApi
} from '../../api/approvals';
import { DEFAULT } from '../../constants/app';
import { APPROVALS } from '../../constants/types';
import { getErrorMessage, getApprovalCount } from '../../utils/utils';

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

export const updateFilters = (name, value) => ({
  type: APPROVALS.UPDATE_FILTERS,
  payload: { name, value }
});
