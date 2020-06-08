// @flow
import axios from 'axios';

const AUTH_API_URL =
  'https://4r6g5pw7ji.execute-api.us-east-2.amazonaws.com/dev/api/auth';

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
