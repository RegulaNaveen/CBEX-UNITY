import { axiosInstance } from '../store';
import { getAccessTokenFromLocalStorage as getAccessToken } from '../SessionHandler';
import { API } from '../constants';

const { CHATBOT } = API;
const { API_KEY } = API.PROPOSAL;

export function fetchChatBotReplyApi(text, opportunityNumber) {
  const config = {
    headers: {
      'x-api-key': API_KEY,
      'x-access-token': getAccessToken()
    }
  };

  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`${CHATBOT.CHAT_ENDPOINT}`, { text, opportunityNumber }, config)
      .then(response => resolve(response.data))
      .catch(err => reject(err));
  });
}
