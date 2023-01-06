import axios from 'axios';
import { API } from '../constants';
import { getAccessTokenFromLocalStorage as getAccessToken } from '../SessionHandler';
import { axiosInstance } from '../store';

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

export class CancelableADRequestApi {
  static cancel = null;

  // Use with CAUTION
  // If this function is required in multiple places,
  // it is suggested to duplicate to avoid cancelling previously triggered request
  static getUsersByQuery(query = '') {
    try {
      if (typeof query !== 'string' || query.length === 0) {
        return [];
      } else {
        if (typeof this.cancel === 'function') {
          this.cancel();
        }
        return axiosInstance
          .get(`${USER_API_URL}/${query}`, {
            cancelToken: new axios.CancelToken(function executor(c) {
              CancelableADRequestApi.cancel = c;
            }),
            headers: {
              'x-api-key': API_KEY,
              'x-access-token': getAccessToken()
            }
          })
          .then(res => res.data)
          .then(response => {
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
          });
      }
    } catch (error) {
      console.log('error in fetching users data from AD');
      console.error(error);
      return [];
    }
  }
}
