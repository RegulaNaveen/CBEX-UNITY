// @flow
import axios from 'axios';
import qs from 'querystring';
import { API } from '../constants';

const {
  API_ENDPOINT,
  AUTH_KEY,
  REDIRECTION_URL,
  CLIENT_ID,
  ROLE_ENDPOINT,
  AUTH_API_URL
} = API.AUTH;

export const onLoginRequest = (code: string): Promise<Object> => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${AUTH_KEY}`
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
