import { axiosInstance } from '../store';
import { getAccessTokenFromLocalStorage as getAccessToken } from '../SessionHandler';
import { APPROVALS_URL, PROPOSAL } from '../constants/api';

/**
 * Get Opportunity Type List
 */
const getApprovals = proposalId => {
  return axiosInstance.get(`${APPROVALS_URL}?proposal_id=${proposalId}`, {
    headers: {
      'x-api-key': PROPOSAL.API_KEY,
      'x-access-token': getAccessToken()
    }
  });
};

export default getApprovals;
