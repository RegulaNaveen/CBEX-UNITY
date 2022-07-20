import axios from 'axios';
import { API } from '../constants';
import {
  getAccessTokenFromLocalStorage as getAccessToken,
  getUserEmail
} from '../SessionHandler';

const { API_KEY } = API.PROPOSAL;
const { NOTIFICATION_API_URL } = API.NOTIFICATION;

const getAxiosConfig = () => ({
  headers: {
    'x-api-key': API_KEY,
    'x-access-token': getAccessToken()
  }
});

const tempDummyData = [
  {
    id: '01',
    preference_id: '03',
    user_email: 'ashiq_sultan@iqvia.com',
    created_at: '2022-07-01',
    data: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    isSeen: false,
    proposal_id: '32bc1cf9-66ed-4c10-9c72-f1195c4b1668',
    opportunity_no: 'UZA85791',
    action_url: 'http://localhost:8080/opportunities/UZA85791'
  },
  {
    id: '02',
    preference_id: '04',
    user_email: 'ashiq_sultan@iqvia.com',
    created_at: '2022-07-01',
    data: 'foo bar 02',
    isSeen: true,
    proposal_id: '32bc1cf9-66ed-4c10-9c72-f1195c4b1668',
    opportunity_no: 'UZA85791',
    action_url: 'http://localhost:8080/opportunities/UZA85791'
  },
  {
    id: '03',
    preference_id: '05',
    user_email: 'ashiq_sultan@iqvia.com',
    created_at: '2022-07-03',
    data: 'lorem ipsum 03',
    isSeen: false,
    proposal_id: '32bc1cf9-66ed-4c10-9c72-f1195c4b1668',
    opportunity_no: 'UZA85791',
    action_url: 'http://localhost:8080/opportunities/UZA85791'
  }
];

function fetchNotifications() {
  const email = getUserEmail();
  const config = getAxiosConfig();
  return new Promise((resolve, reject) => {
    // axios
    //   .get(`${NOTIFICATION_API_URL}/useremail`, config)
    //   .then(response => resolve(response.data))
    //   .catch(err => reject(err));
    resolve(tempDummyData);
  });
}

function updateSeenOne(notificationId) {
  const config = getAxiosConfig();
  return new Promise((resolve, reject) => {
    // axios
    //   .patch(`${NOTIFICATION_API_URL}/notificationId`, { isSeen: true }, config)
    //   .then(response => resolve(response.data))
    //   .catch(err => reject(err));
    resolve([]);
  });
}

function updateSeenBatch(notificationIds: Array<string>) {
  const config = getAxiosConfig();
  const data = { notificationIds };
  return new Promise((resolve, reject) => {
    // axios
    //   .post(`${NOTIFICATION_API_URL}/batch-update-isseen`, data, config)
    //   .then(response => resolve(response.data))
    //   .catch(err => reject(err));
    resolve([]);
  });
}

export default { fetchNotifications, updateSeenOne, updateSeenBatch };
