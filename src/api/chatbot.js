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

export function fetchChatBotReplyApi(params) {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`${CHATBOT.CHAT_ENDPOINT}`, params, config)
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject({ error: true, message: response });
        }
      })
      .catch(err => reject({ error: true, message: err }));
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
