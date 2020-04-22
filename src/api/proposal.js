// @flow
import axios from 'axios';

const CONTACTS_API_BASE_URL = 'https://api.bizd.in/contacts';

export const getUserContacts = async (userId: string, JWTToken: string): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${CONTACTS_API_BASE_URL}/api/contacts/${userId}`, {
        headers: { Authorization: `Bearer ${JWTToken}` }
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const k = 0;
