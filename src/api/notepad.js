import { axiosInstance } from '../store';
import { API } from '../constants';
import { getAccessTokenFromLocalStorage as getAccessToken } from '../SessionHandler';

const { NOTEPAD_API_URL } = API.NOTEPAD;
const { API_KEY } = API.PROPOSAL;

export function fetchNotesApi(proposalID) {
  const config = {
    headers: {
      'x-api-key': API_KEY,
      'x-access-token': getAccessToken()
    }
  };

  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${NOTEPAD_API_URL}/${proposalID}`, config)
      .then(response => resolve(response.data))
      .catch(err => reject(err));
  });
}

export function websocketNotesApi(proposalID) {
  const config = {
    headers: {
      'x-api-key': API_KEY,
      'x-access-token': getAccessToken()
    }
  };

  return new Promise((resolve, reject) => {
    axiosInstance
      .put(`${NOTEPAD_API_URL}/v2/${proposalID}`, {}, config)
      .then(response => resolve(response.data))
      .catch(err => reject(err));
  });
}

export function addNoteApi(proposalID, note) {
  const config = {
    headers: {
      'x-api-key': API_KEY,
      'x-access-token': getAccessToken()
    }
  };

  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`${NOTEPAD_API_URL}/${proposalID}`, note, config)
      .then(response => resolve(response.data))
      .catch(err => reject(err));
  });
}

export function updateNoteApi(proposalID, note) {
  const config = {
    headers: {
      'x-api-key': API_KEY,
      'x-access-token': getAccessToken()
    }
  };

  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`${NOTEPAD_API_URL}/${proposalID}`, note, config)
      .then(response => resolve(response.data))
      .catch(err => reject(err));
  });
}

export function getMentions(proposalID) {
  const config = {
    headers: {
      'x-api-key': API_KEY,
      'x-access-token': getAccessToken()
    }
  };

  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${NOTEPAD_API_URL}/v2/${proposalID}/mentions`, config)
      .then(response => resolve(response.data))
      .catch(err => reject(err));
  });
}

export function updateMentions(proposalID, email: string, emp_id: string) {
  const config = {
    headers: {
      'x-api-key': API_KEY,
      'x-access-token': getAccessToken()
    }
  };
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(
        `${NOTEPAD_API_URL}/v2/${proposalID}/mentions`,
        { email, emp_id },
        config
      )
      .then(response => resolve(response.data))
      .catch(err => reject(err));
  });
}
