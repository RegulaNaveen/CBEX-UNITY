// @flow
import axios from 'axios';

const PROPOSAL_API_URL =
  'https://r0udo916g4.execute-api.us-east-2.amazonaws.com/dev/api/proposals/98625737-615a-4e9a-a249-9dac53ae7fba';

export const getProposalInfo = async (): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${PROPOSAL_API_URL}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const k = 0;
