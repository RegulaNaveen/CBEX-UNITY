import {
  deleteApprovalsApi,
  duplicateApprovalApi,
  getApprovalsApi
} from '../../api/approvals';
import { DEFAULT } from '../../constants/app';
import featureFlags from '../../constants/featureFlags';
import { APPROVALS } from '../../constants/types';
import { getErrorMessage, getApprovalCount } from '../../utils/utils';
import launchDarkly from '../../utils/launchDarkly';

export const setAllApprovals = data => ({
  type: APPROVALS.SET_APPROVALS,
  payload: data
});

export const fetchAllApprovals = (proposalId, questions) => async dispatch => {
  try {
    // Api Response
    const response = await getApprovalsApi(proposalId, questions);
    let { data } = response.data;
    const finalApproval = await getApprovalCount(data, questions);
    if (finalApproval === 0) {
      data = [];
    }
    console.log('fetch all Approval response: ', data);
    dispatch(setAllApprovals(data));
    return { status: true, title: DEFAULT.SUCCESS, data };
  } catch (error) {
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
    console.log('Delete Approval response: ', response.data);
    dispatch(deleteApprovalAction(sectionId));
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
    console.log('Duplicate Approval response: ', response.data);
    dispatch(
      duplicateApprovalAction(sectionId, proposalId, response.data.data)
    );
    return { status: true, title: DEFAULT.SUCCESS, data: response.data.data };
  } catch (error) {
    // Error
    console.log(error.response);
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

export const fetchApprovalSendEmailFlag = () => {
  return async dispatch => {
    const approvalSendEmailFlagValue = await launchDarkly(
      featureFlags.APPROVAL_SEND_EMAIL
    );
    dispatch(setCanSendEmailInApprovals(approvalSendEmailFlagValue));
  };
};

export const updateFilters = (name, value) => ({
  type: APPROVALS.UPDATE_FILTERS,
  payload: { name, value }
});
