import { axiosInstance } from '../store';
import { getAccessTokenFromLocalStorage as getAccessToken } from '../SessionHandler';
import { API } from '../constants';

const { CHATBOT } = API;
const { API_KEY } = API.PROPOSAL;

const config = {
  headers: {
    'x-api-key': API_KEY,
    'x-access-token': getAccessToken()
  }
};

export function fetchChatBotReplyApi(query, oppurtunity_no) {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`${CHATBOT.CHAT_ENDPOINT}`, { query, oppurtunity_no }, config)
      .then(response => resolve(response.data))
      .catch(err => reject(err));
  });
}

export function submitFeedbackApi(feedback) {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`${CHATBOT.FEEDBACK_ENDPOINT}`, feedback, config)
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
}