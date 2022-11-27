import {
  deleteApprovalsApi,
  duplicateApprovalApi,
  getApprovalsApi
} from '../../api/approvals';
import { DEFAULT } from '../../constants/app';
import { APPROVALS } from '../../constants/types';
import { getErrorMessage } from '../../utils/utils';

export const setAllApprovals = data => ({
  type: APPROVALS.SET_APPROVALS,
  payload: data
});

export const fetchAllApprovals = proposalId => async dispatch => {
  try {
    // Api Response
    const response = await getApprovalsApi(proposalId);
    console.log('fetch all Approval response: ', response.data.data);
    dispatch(setAllApprovals(response.data.data));
    return { status: true, title: DEFAULT.SUCCESS, data: response.data.data };
  } catch (error) {
    // Error
    console.log(error.response);
    const msg = getErrorMessage(error);
    return { status: false, title: DEFAULT.ALERT, msg };
  }
};

export const setLoadingAction = isLoading => ({
  type: APPROVALS.SET_LOADING,
  payload: isLoading
});

export const setQuestionHashAction = data => ({
  type: APPROVALS.SET_QUES_HASH,
  payload: data
});

export const deleteApprovalAction = approvalId => ({
  type: APPROVALS.DELETE_APPROVALS,
  payload: approvalId
});

export const deleteApproval = (proposalId, sectionId) => async dispatch => {
  try {
    // Api Response
    const response = await deleteApprovalsApi(proposalId, sectionId);
    console.log('Delete Approval response: ', response.data);
    dispatch(deleteApprovalAction(sectionId));
    return { status: true, title: DEFAULT.SUCCESS, data: response.data };
  } catch (error) {
    // Error
    console.log(error.response);
    const msg = getErrorMessage(error);
    return { status: false, title: DEFAULT.ALERT, msg };
  }
};

export const duplicateApprovalAction = (
  sectionId,
  proposalId,
  quesHashData
) => ({
  type: APPROVALS.DUPLICATE_APPROVALS,
  payload: { sectionId, proposalId, quesHashData }
});

export const duplicateApproval = (proposalId, sectionId) => async (
  dispatch,
  getState
) => {
  try {
    const { quesHashData } = getState().approvals;
    // Api Response
    const response = await duplicateApprovalApi(proposalId, sectionId);
    console.log('Duplicate Approval response: ', response.data);
    dispatch(duplicateApprovalAction(sectionId, proposalId, quesHashData));
    return { status: true, title: DEFAULT.SUCCESS, data: response.data.data };
  } catch (error) {
    // Error
    console.log(error.response);
    const msg = getErrorMessage(error);
    return { status: false, title: DEFAULT.ALERT, msg };
  }
};
