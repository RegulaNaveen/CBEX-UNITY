// @flow
import axios from 'axios';
import { API } from '../constants';

const { AUTH_API_URL } = API.AUTH;

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

export const forgotPassword = async (email: string): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${AUTH_API_URL}/forgot-password`, {
        email
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err.response.data.message);
      });
  });
};

export const resetPassword = async (
  email: string,
  code: string,
  newPassword: string
): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${AUTH_API_URL}/reset-password`, {
        email,
        code,
        newPassword
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
