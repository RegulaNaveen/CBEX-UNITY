// @flow
import axios from 'axios';

const PROPOSAL_API_URL =
  'https://r0udo916g4.execute-api.us-east-2.amazonaws.com/dev/api/proposals';
const PROPOSAL_SECTIONS_API_URL =
  'https://r0udo916g4.execute-api.us-east-2.amazonaws.com/dev/api/proposals/sections';
const PROPOSAL_ANSWERTYPE_API_URL =
  'https://r0udo916g4.execute-api.us-east-2.amazonaws.com/dev/api/proposals/answerTypes';
const PROPOSAL_ROLES_API_URL =
  'https://r0udo916g4.execute-api.us-east-2.amazonaws.com/dev/api/proposals/roles';

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

export const getQuestionSectionInfo = async (): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${PROPOSAL_SECTIONS_API_URL}`, {
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

export const getAnswerTypes = async (): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${PROPOSAL_ANSWERTYPE_API_URL}`, {
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

export const getRoles = async (): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${PROPOSAL_ROLES_API_URL}`, {
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

export default function() {}
