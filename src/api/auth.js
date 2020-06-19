// @flow
import axios from 'axios';

const API_ENDPOINT =
  'https://9l688o9r93.execute-api.us-east-1.amazonaws.com/uat';

const AUTH_API_URL = `${API_ENDPOINT}/api/auth`;

export const authentication = async (
  email: string,
  password: string
): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${AUTH_API_URL}/login`, {
        email,
        password
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err.response.data.message);
      });
  });
};

export const postRefreshToken = async (
  email: string,
  refreshToken: string
): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${AUTH_API_URL}/refresh`, {
        email,
        refreshToken
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err.response.data.message);
      });
  });
};

export const putRole = async (
  role: string,
  accessToken: string,
  jwt: string
): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${AUTH_API_URL}/changerole`,
        {
          role,
          accessToken
        },
        {
          headers: { Authorization: `Bearer ${jwt}` }
        }
      )
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err.response.data.message);
      });
  });
};
