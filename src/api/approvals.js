import { axiosInstance } from '../store';
import { getAccessTokenFromLocalStorage as getAccessToken } from '../SessionHandler';
import { APPROVALS_URL, PROPOSAL } from '../constants/api';

/**
 * Get Approvals List Api call
 */
export const getApprovalsApi = proposalId => {
  return axiosInstance.get(`${APPROVALS_URL}?proposal_id=${proposalId}`, {
    headers: {
      'x-api-key': PROPOSAL.API_KEY,
      'x-access-token': getAccessToken()
    }
  });
};

/**
 * Delete Approval Api call
 */
export const deleteApprovalsApi = (proposalId, sectionId, oppId) => {
  return axiosInstance.delete(
    `${APPROVALS_URL}/one?proposal_id=${proposalId}&section_id=${sectionId}&opp_id=${oppId}`,
    {
      headers: {
        'x-api-key': PROPOSAL.API_KEY,
        'x-access-token': getAccessToken()
      }
    }
  );
};

/**
 * Duplicate Approval Api call
 */
export const duplicateApprovalApi = (proposalId, sectionId) => {
  return axiosInstance.put(
    `${APPROVALS_URL}/duplicate?proposal_id=${proposalId}&section_id=${sectionId}`,
    {
      headers: {
        'x-api-key': PROPOSAL.API_KEY,
        'x-access-token': getAccessToken()
      }
    }
  );
};
