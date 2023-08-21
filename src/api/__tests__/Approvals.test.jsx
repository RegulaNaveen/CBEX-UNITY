import { axiosInstance } from '../../store';
import { APPROVALS_URL, PROPOSAL } from '../../constants/api';
import {
  getApprovalsApi,
  deleteApprovalsApi,
  duplicateApprovalApi
} from '../approvals';

jest.mock('../../SessionHandler', () => ({
  getAccessTokenFromLocalStorage: jest.fn(() => 'valid_access_token')
}));

describe('getApprovalsApi', () => {
  const proposalId = 123;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should make an axios GET request with the correct URL and headers', async () => {
    const axiosGetMock = jest.spyOn(axiosInstance, 'get');
    const expectedUrl = `${APPROVALS_URL}?proposal_id=${proposalId}`;
    const expectedHeaders = {
      'x-api-key': PROPOSAL.API_KEY,
      'x-access-token': 'valid_access_token'
    };

    axiosGetMock.mockResolvedValueOnce({ data: {} });

    await getApprovalsApi(proposalId);

    expect(axiosGetMock).toHaveBeenCalledTimes(1);
    expect(axiosGetMock).toHaveBeenCalledWith(expectedUrl, {
      headers: expectedHeaders
    });
  });
});
