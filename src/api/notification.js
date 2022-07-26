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
    created_at: '2022-07-26T14:30:30',
    data:
      "You've been assigned to Opportunity UZA85791 Bid 03. View the opportunity overview and prepare for upcoming calls in Unity.",
    isSeen: false,
    proposal_id: '32bc1cf9-66ed-4c10-9c72-f1195c4b1668',
    opportunity_no: 'UZA85791',
    action_url: 'http://localhost:8080/opportunities/UZA85791'
  },
  {
    id: '02',
    preference_id: '04',
    user_email: 'ashiq_sultan@iqvia.com',
    created_at: '2022-07-26T08:10:30',
    data:
      "You've been assigned to Opportunity UZA85791 Bid 03. View the opportunity overview and prepare for upcoming calls in Unity.",
    isSeen: true,
    proposal_id: '32bc1cf9-66ed-4c10-9c72-f1195c4b1668',
    opportunity_no: 'UZA85791',
    action_url: 'http://localhost:8080/opportunities/UZA85791'
  },
  {
    id: '03',
    preference_id: '05',
    user_email: 'ashiq_sultan@iqvia.com',
    created_at: '2022-07-26T10:10:30',
    data:
      "You've been assigned to Opportunity UZA85791 Bid 03. View the opportunity overview and prepare for upcoming calls in Unity.",
    isSeen: false,
    proposal_id: '32bc1cf9-66ed-4c10-9c72-f1195c4b1668',
    opportunity_no: 'UZA85791',
    action_url: 'http://localhost:8080/opportunities/UZA85791'
  },
  {
    id: '04',
    preference_id: '05',
    user_email: 'ashiq_sultan@iqvia.com',
    created_at: '2022-07-24T08:10:30',
    data:
      "You've been assigned to Opportunity UZA85857 Bid 03. View the opportunity overview and prepare for upcoming calls in Unity.",
    isSeen: false,
    proposal_id: '32bc1cf9-66ed-4c10-9c72-f1195c4b1668',
    opportunity_no: 'UZA85857',
    action_url: 'http://localhost:8080/opportunities/UZA85857'
  },
  {
    id: '05',
    preference_id: '05',
    user_email: 'ashiq_sultan@iqvia.com',
    created_at: '2022-07-24T08:10:30',
    data:
      "You've been assigned to Opportunity UZA82669 Bid 03. View the opportunity overview and prepare for upcoming calls in Unity.",
    isSeen: false,
    proposal_id: '32bc1cf9-66ed-4c10-9c72-f1195c4b1668',
    opportunity_no: 'UZA82669',
    action_url: 'http://localhost:8080/opportunities/UZA82669'
  },
  {
    id: '06',
    preference_id: '05',
    user_email: 'ashiq_sultan@iqvia.com',
    created_at: '2022-07-24T08:10:30',
    data:
      "You've been assigned to Opportunity UZA84603 Bid 03. View the opportunity overview and prepare for upcoming calls in Unity.",
    isSeen: false,
    proposal_id: '32bc1cf9-66ed-4c10-9c72-f1195c4b1668',
    opportunity_no: 'UZA84603',
    action_url: 'http://localhost:8080/opportunities/UZA84603'
  },
  {
    id: '07',
    preference_id: '05',
    user_email: 'ashiq_sultan@iqvia.com',
    created_at: '2022-07-24T08:10:30',
    data:
      "You've been assigned to Opportunity UZA84603 Bid 03. View the opportunity overview and prepare for upcoming calls in Unity.",
    isSeen: false,
    proposal_id: '32bc1cf9-66ed-4c10-9c72-f1195c4b1668',
    opportunity_no: 'UZA84603',
    action_url: 'http://localhost:8080/opportunities/UZA84603'
  },
  {
    id: '08',
    preference_id: '05',
    user_email: 'ashiq_sultan@iqvia.com',
    created_at: '2022-07-24T08:10:30',
    data:
      "You've been assigned to Opportunity UZA82770 Bid 03. View the opportunity overview and prepare for upcoming calls in Unity.",
    isSeen: false,
    proposal_id: '32bc1cf9-66ed-4c10-9c72-f1195c4b1668',
    opportunity_no: 'UZA82770',
    action_url: 'http://localhost:8080/opportunities/UZA82770'
  },
  {
    id: '09',
    preference_id: '05',
    user_email: 'ashiq_sultan@iqvia.com',
    created_at: '2022-07-24T08:10:30',
    data:
      "You've been assigned to Opportunity UZA82457 Bid 03. View the opportunity overview and prepare for upcoming calls in Unity.",
    isSeen: false,
    proposal_id: '32bc1cf9-66ed-4c10-9c72-f1195c4b1668',
    opportunity_no: 'UZA82457',
    action_url: 'http://localhost:8080/opportunities/UZA82457'
  },
  {
    id: '10',
    preference_id: '05',
    user_email: 'ashiq_sultan@iqvia.com',
    created_at: '2022-07-23T08:10:30',
    data:
      "You've been assigned to Opportunity UZA85793 Bid 03. View the opportunity overview and prepare for upcoming calls in Unity.",
    isSeen: false,
    proposal_id: '32bc1cf9-66ed-4c10-9c72-f1195c4b1668',
    opportunity_no: 'UZA85793',
    action_url: 'http://localhost:8080/opportunities/UZA85793'
  }
];

function fetchNotifications() {
  const email = getUserEmail();
  const config = getAxiosConfig();
  return new Promise((resolve, reject) => {
    // TODO
    // Make API call to get all notifications
    resolve(tempDummyData);
  });
}

function updateSeenOne(notificationId) {
  const config = getAxiosConfig();
  return new Promise((resolve, reject) => {
    // TODO
    // Make API call to update one notification as seen
    resolve([]);
  });
}

function updateSeenBatch(notificationIds: Array<string>) {
  const config = getAxiosConfig();
  const data = { notificationIds };
  return new Promise((resolve, reject) => {
    // TODO
    // Add api call to update all notifiaction of an user as seen
    resolve([]);
  });
}

export default { fetchNotifications, updateSeenOne, updateSeenBatch };
