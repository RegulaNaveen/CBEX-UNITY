// @flow
import axios from 'axios';

const PROPOSAL_API_URL =
  'https://r0udo916g4.execute-api.us-east-2.amazonaws.com/dev/api/proposals/';

export const getProposalInfo = async (id: string): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${PROPOSAL_API_URL}/${id}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default function() {}
