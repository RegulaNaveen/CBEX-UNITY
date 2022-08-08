// import axios from 'axios';
import axios from './axios-config';
import { API } from '../constants';
// import {
//   getAccessTokenFromLocalStorage as getAccessToken,
//   getUserEmail
// } from '../SessionHandler';

const { API_KEY } = API.PROPOSAL;
const { NOTIFICATION_API_URL } = API.NOTIFICATION;
const ENDPOINT_MARK_READ = 'read';
const ENDPOINT_MARK_ALL_READ = 'mark-all-read';

// const getAxiosConfig = () => ({
//   headers: {
//     'x-api-key': API_KEY,
//     'x-access-token': getAccessToken()
//   }
// });

function fetchNotifications() {
  const email = getUserEmail();
  // const config = getAxiosConfig();
  return new Promise((resolve, reject) => {
    axios
      .get(`${NOTIFICATION_API_URL}`)
      .then(response => resolve(response.data?.data))
      .catch(err => reject(err));
  });
}

function updateSeenOne(notificationId) {
  // const config = getAxiosConfig();
  return new Promise((resolve, reject) => {
    axios
      .patch(
        `${NOTIFICATION_API_URL}/${notificationId}/${ENDPOINT_MARK_READ}`,
        {}
      )
      .then(response => resolve(response.data?.data))
      .catch(err => reject(err));
  });
}

function updateSeenBatch() {
  // const config = getAxiosConfig();
  return new Promise((resolve, reject) => {
    axios
      .patch(`${NOTIFICATION_API_URL}/${ENDPOINT_MARK_ALL_READ}`, {})
      .then(response => resolve(response.data?.data))
      .catch(err => reject(err));
  });
}

export default { fetchNotifications, updateSeenOne, updateSeenBatch };
