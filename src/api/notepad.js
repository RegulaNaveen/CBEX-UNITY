import axios from 'axios';
import { API } from '../constants';
import { getAccessToken } from '../SessionHandler';

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
    axios
      .get(`${NOTEPAD_API_URL}/${proposalID}`, config)
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
    axios
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
    axios
      .post(`${NOTEPAD_API_URL}/${proposalID}`, note, config)
      .then(response => resolve(response.data))
      .catch(err => reject(err));
  });
}