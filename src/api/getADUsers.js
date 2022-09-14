import { API } from '../constants';
import { getAccessTokenFromLocalStorage as getAccessToken } from '../SessionHandler';

const { USER_API_URL, API_KEY } = API.PROPOSAL;

/**
 * Queries Active directory users API
 * Returns empty array on error
 */
export default async (query): Promise<Array<any>> => {
  try {
    const fetchUsers = await fetch(`${USER_API_URL}/${query}`, {
      headers: {
        'x-api-key': API_KEY,
        'x-access-token': getAccessToken()
      }
    });
    const response = await fetchUsers.json();
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.log('error in fetching users data from AD');
    console.error(error);
    return [];
  }
};
