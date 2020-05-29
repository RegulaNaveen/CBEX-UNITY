// @flow
import axios from 'axios';

const AUTH_API_URL =
  'https://4r6g5pw7ji.execute-api.us-east-2.amazonaws.com/dev/api/auth/login';

export const authentication = async (
  email: string,
  password: string
): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${AUTH_API_URL}`, {
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

export default function() {}
