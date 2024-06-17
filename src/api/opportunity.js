import { axiosInstance } from '../store';
import { getAccessTokenFromLocalStorage } from '../SessionHandler';
import { API } from '../constants';

const { API_KEY, PROPOSAL_API_ALL } = API.PROPOSAL;

class OpportunityApi {
  constructor() {
    this.abortController = new AbortController();
  }

  async getOpportunities(from = 0, size = 15, filter = {}) {
    const response = await axiosInstance.post(
      PROPOSAL_API_ALL,
      {
        from,
        size,
        filter
      },
      {
        headers: {
          'x-api-key': API_KEY,
          'x-access-token': getAccessTokenFromLocalStorage()
        },
        signal: this.abortController.signal
      }
    );
    return response;
  }
}

export default new OpportunityApi();
