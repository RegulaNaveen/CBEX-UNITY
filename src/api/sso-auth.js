// @flow
import axios from 'axios';
import qs from 'querystring';
import { API } from '../constants';
import { getAccessTokenFromLocalStorage } from '../SessionHandler';
import { axiosInstance } from '../store';

const {
  API_ENDPOINT,
  REDIRECTION_URL,
  CLIENT_ID,
  ROLE_ENDPOINT,
  AUTH_API_URL,
  VALIDATE_TOKEN
} = API.AUTH;

const { API_KEY, INTEGRATIONS_API_URL } = API.PROPOSAL;

type Headers = {
  'Content-Type': string,
  Authorization?: string
};

// Refresh token global variable
let interval;
const COGNITO_END_POINT = 'https://cognito-idp.us-east-1.amazonaws.com/';

export const onLoginRequest = (code: string): Promise<Object> => {
  const headers: Headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  const data = {
    grant_type: 'authorization_code',
    client_id: CLIENT_ID,
    code,
    redirect_uri: REDIRECTION_URL
  };

  return axios.post(API_ENDPOINT, qs.stringify(data), { headers });
};

export const onChangeUserRole = (
  accessToken: string,
  idToken: string,
  role: string
): Promise<Object> => {
  const data = { accessToken, role };
  const headers = { Authorization: `Bearer ${idToken}` };

  return axios.put(ROLE_ENDPOINT, data, { headers });
};

export const getUsers = (idToken: string): Promise<Object> => {
  const headers = { Authorization: `Bearer ${idToken}` };
  return axios.get(`${AUTH_API_URL}/users`, { headers });
};

export const validateToken = async (token: string) => {
  try {
    const { data } = await axios.post(VALIDATE_TOKEN, { token });
    InitRefreshToken();
    return data.validToken;
  } catch (error) {
    return false;
  }
};

export const InitRefreshToken = () => {
  if (!interval) {
    interval = setInterval(() => {
      const rToken = localStorage.getItem('refresh_token');
      if (!rToken) {
        clearInterval(interval);
        return;
      }
      const config = {
        method: 'post',
        url: COGNITO_END_POINT,
        headers: {
          'Content-Type': 'application/x-amz-json-1.1',
          'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth'
        },
        data: {
          ClientId: CLIENT_ID,
          AuthFlow: 'REFRESH_TOKEN_AUTH',
          AuthParameters: {
            REFRESH_TOKEN: rToken || ''
          }
        }
      };
      axios(config)
        .then(response => {
          const result = response.data.AuthenticationResult || null;
          if (result) {
            if (result.IdToken)
              localStorage.setItem('id_token', result.IdToken);
            if (result.AccessToken)
              localStorage.setItem('access_token', result.AccessToken);
          }
        })
        .catch(error => {
          console.error('Error: Cannot refresh the token.');
          localStorage.setItem('refresh_token', '');
        });
    }, 900000);
  }
};

export const getOppPrefs = async () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${INTEGRATIONS_API_URL}/user/opportunity/preferences`, {
        headers: {
          'x-api-key': API_KEY,
          'x-access-token': getAccessTokenFromLocalStorage()
        }
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const toggleFavourite = async (oppNo, favourite, favouriteUpdatedDate) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(
        `${INTEGRATIONS_API_URL}/user/favourite/${oppNo}?toggle=${favourite}`,
        {favouriteUpdatedDate},
        {
          headers: {
            'x-api-key': API_KEY,
            'x-access-token': getAccessTokenFromLocalStorage()
          }
        }
      )
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const updateCustomName = async (oppNo, name) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(
        `${INTEGRATIONS_API_URL}/user/custom-opportunity-name/${oppNo}`,
        { name },
        {
          headers: {
            'x-api-key': API_KEY,
            'x-access-token': getAccessTokenFromLocalStorage()
          }
        }
      )
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};
