// @flow
// import axios from 'axios';
import axios from './axios-config';

import { API } from '../constants';
// import { getAccessTokenFromLocalStorage as getAccessToken } from '../SessionHandler';
import { logLobDetails } from '../utils/utils';
import omit from 'lodash/omit';
const {
  PROPOSAL_API_URL,
  PROPOSAL_QUESTIONS_API_URL,
  PROPOSAL_VALIDATED_DATA,
  API_KEY,
  LOOKUP_OPTIONS_API,
  PROPOSAL_OT_LIST,
  PROPOSAL_SWITCH_OT
} = API.PROPOSAL;

let onGoingAnswer = {};
const { CancelToken } = axios;

export const getProposalInfo = async (id: string): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${PROPOSAL_API_URL}/${id}`)
      .then(response => {
        logLobDetails(response.data);
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
  answer: string,
  userData: Object
): Promise<Object> => {
  if (onGoingAnswer[questionId]) {
    onGoingAnswer[questionId]();
  }
  return axios
    .put(
      `${PROPOSAL_QUESTIONS_API_URL}/${proposalId}/${questionId}`,
      { answer, userData },
      {
        cancelToken: new CancelToken(function executor(c) {
          onGoingAnswer[questionId] = c;
        })
      }
    )
    .then(res => {
      if (onGoingAnswer[questionId]) {
        onGoingAnswer = omit(onGoingAnswer, [questionId]);
      }
      return res;
    });
};

export const getQuestionSectionInfo = async (): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${PROPOSAL_API_URL}/sections`)
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
      .get(`${PROPOSAL_API_URL}/answerTypes`)
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
      .get(`${PROPOSAL_API_URL}/roles`)
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
      .post(`${PROPOSAL_QUESTIONS_API_URL}/${proposalId}`, questionData)
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
      .put(`${PROPOSAL_API_URL}/${id}`, {})
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getProposlBoxId = async (id: string): Promise<Object> => {
  return axios.get(`${PROPOSAL_API_URL}/${id}/boxid`);
};

export const fetchAdditionalBoxLink = async (
  oppID: string,
  crmNo: string,
  customer: string
): Promise<Object> => {
  return axios.get(
    `${PROPOSAL_QUESTIONS_API_URL}/additionallinks/${oppID}/${encodeURI(
      customer
    )}/${crmNo}`
  );
};

export const getValidatedProposalData = (id: string): Promise<Object> => {
  return axios.get(`${PROPOSAL_VALIDATED_DATA}/${id}`);
};

export const editProposalQuestionData = async (
  proposalId: string,
  questionId: string,
  questionData: Object
): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${PROPOSAL_QUESTIONS_API_URL}/${proposalId}/${questionId}/update`,
        questionData
      )
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const deleteProposalQuestionData = async (
  proposalId: string,
  questionId: string
): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${PROPOSAL_QUESTIONS_API_URL}/${proposalId}/${questionId}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getOpportunityInfo = async (id: string): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${PROPOSAL_API_URL}/opportunity/${id}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getProposalCount = async (id: string): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${PROPOSAL_API_URL}/opportunity/${id}/count`)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};
export const getPaginateProposal = async (urls): Promise<Object> => {
  return new Promise((resolve, reject) => {
    Promise.all(urls)
      .then(responses => {
        resolve(responses);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getPickListLookupSfData = async (): Promise<Object> => {
  return axios.get(`${LOOKUP_OPTIONS_API}`);
};

/**
 * Get Opportunity Type List
 */
export const getOTListData = () => {
  return axios.get(`${PROPOSAL_OT_LIST}`);
};

/**
 * Get Opportunity Type List
 */
export const changeProposalOT = payload => {
  return axios.post(`${PROPOSAL_SWITCH_OT}`, payload);
};

/**
 * Delete Proposal User from Selected Answer
 */
export const deleteProposalUser = (proposalId, data) => {
  return axios.delete(
    `${PROPOSAL_QUESTIONS_API_URL}/${proposalId}/proposalUser`,
    {
      // headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() },
      data
    }
  );
};
