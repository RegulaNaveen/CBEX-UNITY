// @flow
import axios from 'axios';

const PROPOSAL_API_URL =
  'https://r0udo916g4.execute-api.us-east-2.amazonaws.com/dev/api/proposals';

const API_KEY = 'LodOBHeBPI5zGMDaq2Ppv8N2oHialSkR9t4cnQlH';

export const getProposalInfo = async (id: string): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${PROPOSAL_API_URL}/${id}`, {
        headers: { 'x-api-key': `${API_KEY}` }
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const setProposalAnswer = async (
  proposalId: string,
  questionId: string,
  answer: string
): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${PROPOSAL_API_URL}/${proposalId}/${questionId}`,
        {
          answer
        },
        {
          headers: { 'x-api-key': `${API_KEY}` }
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
