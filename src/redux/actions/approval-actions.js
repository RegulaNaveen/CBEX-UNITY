import getApprovals from '../../api/approvals';
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
    const response = await getApprovals(proposalId);
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
