import { axiosInstance } from '../store';
import { API } from '../constants';
import { getAccessTokenFromLocalStorage as getAccessToken } from '../SessionHandler';

const { PROFILE_API_URL, PROPOSAL_API_ENDPOINT } = API.PROFILE;
const { API_KEY } = API.PROPOSAL;

export function fetchUserPreferenceApi() {
  const config = {
    headers: {
      'x-api-key': API_KEY,
      'x-access-token': getAccessToken()
    }
  };

  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${PROFILE_API_URL}/preference`, config)
      .then(response => resolve(response.data))
      .catch(err => reject(err));
  });
}

export function fetchTimezoneApi() {
  const config = {
    headers: {
      'x-api-key': API_KEY,
      'x-access-token': getAccessToken()
    }
  };

  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${PROPOSAL_API_ENDPOINT}/api/timezone`, config)
      .then(response => {
        resolve(response.data);
      })
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
    axiosInstance
      .put(
        `${PROFILE_API_URL}/preference/${preferenceID}`,
        preferenceSelected,
        config
      )
      .then(response => {
        resolve(response.data);
      })
      .catch(err => reject(err));
  });
}

export function updateUserTimezoneApi(timezoneID) {
  const data = {
    time_zone_id: timezoneID
  };
  const config = {
    headers: {
      'x-api-key': API_KEY,
      'x-access-token': getAccessToken()
    }
  };

  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`${PROFILE_API_URL}/updateusertimezone`, data, config)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => reject(err));
  });
}
