import { API } from '../constants';
import { getAccessTokenFromLocalStorage as getAccessToken } from '../SessionHandler';

const { USER_API_URL, API_KEY } = API.PROPOSAL;

/**
 * Queries Active directory users API
 * Returns empty array on error
 */
export default async (query: string): Promise<Array<any>> => {
  try {
    if (query.length < 1) {
      return [];
    }
    const fetchUsers = await fetch(`${USER_API_URL}/${query}`, {
      headers: {
        'x-api-key': API_KEY,
        'x-access-token': getAccessToken()
      }
    });
    const response = await fetchUsers.json();
    if (response.data && Array.isArray(response.data)) {
      // Sort firstname and lastname based on query
      const firstNameMatches = [];
      const lastNameMatches = [];
      response.data.forEach(user => {
        if (user.first_name?.toLowerCase().startsWith(query)) {
          firstNameMatches.push(user);
        } else {
          lastNameMatches.push(user);
        }
      });
      return [...firstNameMatches, ...lastNameMatches];
    }
    return [];
  } catch (error) {
    console.log('error in fetching users data from AD');
    console.error(error);
    return [];
  }
};
