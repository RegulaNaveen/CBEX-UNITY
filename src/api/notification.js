import axios from 'axios';
import { API } from '../constants';
import {
  getAccessTokenFromLocalStorage as getAccessToken,
  getUserEmail
} from '../SessionHandler';

const { API_KEY } = API.PROPOSAL;
const { NOTIFICATION_API_URL } = API.NOTIFICATION;

const tempDummyData = [
  {
    id: '01',
    preference_id: '03',
    user_email: 'ashiq_sultan@iqvia.com',
    created_at: '2022-07-01',
    data: 'This is a demo notification 01',
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
    isSeen: false,
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
  console.log("Fetching notifications")
  const email = getUserEmail();
  const config = {
    headers: {
      'x-api-key': API_KEY,
      'x-access-token': getAccessToken()
    }
  };
  return new Promise((resolve, reject) => {
    // axios
    //   .get(`${NOTIFICATION_API_URL}/useremail`, config)
    //   .then(response => resolve(response.data))
    //   .catch(err => reject(err));
    resolve(tempDummyData);
  });
}

export default { fetchNotifications };
