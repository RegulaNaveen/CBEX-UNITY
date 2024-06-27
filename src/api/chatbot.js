import { axiosInstance } from '../store';
import { getAccessTokenFromLocalStorage as getAccessToken } from '../SessionHandler';
import { API } from '../constants';

const { CHATBOT } = API;
const { API_KEY } = API.PROPOSAL;

export function fetchChatBotReplyApi({
  query,
  oppurtunity_no,
  bidNo,
  bidType
}) {
  const config = {
    headers: {
      'x-api-key': API_KEY,
      'x-access-token': getAccessToken()
    }
  };

  return new Promise((resolve, reject) => {
    axiosInstance
      .post(
        `${CHATBOT.CHAT_ENDPOINT}`,
        { query, oppurtunity_no, bidNo, bidType },
        config
      )
      .then(response => resolve(response.data))
      .catch(err => reject({ error: true, message: err }));
  });
}
