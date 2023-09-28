import { axiosInstance } from "../store";
import { API } from "../constants";
import { getAccessTokenFromLocalStorage as getAccessToken } from "../SessionHandler";

const { EMAILTEMPLATES_API_URL } = API.EMAILTEMPLATES;
const { API_KEY } = API.PROPOSAL;

export function fetchEmailTemplatesApi() {
  const config = {
    headers: {
      "x-api-key": API_KEY,
      "x-access-token": getAccessToken(),
    },
  };

  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${EMAILTEMPLATES_API_URL}`, config)
      .then((response) => resolve(response.data))
      .catch((err) => reject(err));
  });
}