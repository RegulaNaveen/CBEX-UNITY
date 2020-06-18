// @flow
import axios from 'axios';

const API_ENDPOINT =
  'https://puo6dvbged.execute-api.us-east-1.amazonaws.com/dev';

const PROPOSAL_API_URL = `${API_ENDPOINT}/api/proposals`;
const PROPOSAL_QUESTIONS_API_URL = `${API_ENDPOINT}/api/questions`;

const API_KEY = 'Wctbuly84485ruXf4Bilz1c8xdckxcfk4GA2NvVe';

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
    const {
      questionText,
      section,
      answerType,
      options,
      roleName
    } = questionData;
    axios
      .post(
        `${PROPOSAL_QUESTIONS_API_URL}/${proposalId}`,
        {
          questionText,
          section,
          answerType,
          options,
          roleName
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
