import axios from 'axios';
import { API } from '../constants';
import { getAccessTokenFromLocalStorage as getAccessToken } from '../SessionHandler';

const { PROFILE_API_URL } = API.PROFILE;
const { API_KEY } = API.PROPOSAL;

export function fetchUserPreferenceApi() {
  const config = {
    headers: {
      'x-api-key': API_KEY,
      'x-access-token': getAccessToken()
    }
  };

  return new Promise((resolve, reject) => {
    axios
      .get(`${PROFILE_API_URL}`, config)
      .then(response => resolve(response.data))
      .catch(err => reject(err));
  });
}

export function updateUserPreferenceApi(preferenceID, preferenceSelected) {
  const config = {
    headers: {
      'x-api-key': API_KEY,
      'x-access-token': getAccessToken()
    }
  };

  return new Promise((resolve, reject) => {
    axios
      .put(`${PROFILE_API_URL}/${preferenceID}`, preferenceSelected, config)
      .then(response => {
        console.log('after update API', response.data);
        resolve(response.data);
      })
      .catch(err => reject(err));
  });
}
