// @flow
import axios from 'axios';
import { API } from '../constants';

const { PROPOSAL_API_URL, PROPOSAL_QUESTIONS_API_URL, API_KEY } = API.PROPOSAL;

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
        `${PROPOSAL_QUESTIONS_API_URL}/${proposalId}/${questionId}`,
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
      .get(`${PROPOSAL_API_URL}/sections`, {
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
      .get(`${PROPOSAL_API_URL}/answerTypes`, {
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
      .get(`${PROPOSAL_API_URL}/roles`, {
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

export const setProposalQuestionData = async (
  proposalId: string,
  questionData: Object
): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${PROPOSAL_QUESTIONS_API_URL}/${proposalId}`, questionData, {
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

export const getProposalInfoUpdated = async (id: string): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${PROPOSAL_API_URL}/${id}`,
        {},
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
