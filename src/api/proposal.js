// @flow
import newAxios from 'axios';
import omit from 'lodash/omit';
import { axiosInstance } from '../store';
import { API } from '../constants';
import { getAccessTokenFromLocalStorage as getAccessToken } from '../SessionHandler';
import { logLobDetails } from '../utils/utils';

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
const { CancelToken } = newAxios;

export const getProposalInfo = async (id: string): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${PROPOSAL_API_URL}/${id}`, {
        headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() }
      })
      .then(response => {
        logLobDetails(response.data);
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getProposalAnswer = async (
  proposalId: string,
  questionId: string
): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${PROPOSAL_QUESTIONS_API_URL}/${proposalId}/${questionId}`, {
        headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() }
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
  answer: string,
  userData: Object,
  editorData: any,
  trackEventData: Object,
  answerType: string
): Promise<Object> => {
  if (onGoingAnswer[questionId]) onGoingAnswer[questionId]();
  const payload = { answer, userData, trackEventData, answerType };
  if (editorData) payload.formattedAnswer = editorData;

  return axiosInstance
    .put(`${PROPOSAL_QUESTIONS_API_URL}/${proposalId}/${questionId}`, payload, {
      headers: {
        'x-api-key': `${API_KEY}`,
        'x-access-token': `${getAccessToken()}`
      },
      cancelToken: new CancelToken(function executor(c) {
        onGoingAnswer[questionId] = c;
      })
    })
    .then(res => {
      if (onGoingAnswer[questionId]) {
        onGoingAnswer = omit(onGoingAnswer, [questionId]);
      }
      return res;
    });
};

export const getQuestionSectionInfo = async (): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${PROPOSAL_API_URL}/sections`, {
        headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() }
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
    axiosInstance
      .get(`${PROPOSAL_API_URL}/answerTypes`, {
        headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() }
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
    axiosInstance
      .get(`${PROPOSAL_API_URL}/roles`, {
        headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() }
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
    axiosInstance
      .post(`${PROPOSAL_QUESTIONS_API_URL}/${proposalId}`, questionData, {
        headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() }
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
    axiosInstance
      .put(
        `${PROPOSAL_API_URL}/${id}`,
        {},
        {
          headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() }
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

export const getProposlBoxId = async (id: string): Promise<Object> => {
  return axiosInstance.get(`${PROPOSAL_API_URL}/${id}/boxid`, {
    headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() }
  });
};

export const fetchAdditionalBoxLink = async (
  oppID: string,
  crmNo: string,
  customer: string
): Promise<Object> => {
  return axiosInstance.get(
    `${PROPOSAL_QUESTIONS_API_URL}/additionallinks/${oppID}/${encodeURI(
      customer
    )}/${crmNo}`,
    {
      headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() }
    }
  );
};

export const getValidatedProposalData = (id: string): Promise<Object> => {
  return axiosInstance.get(`${PROPOSAL_VALIDATED_DATA}/${id}`, {
    headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() }
  });
};

export const editProposalQuestionData = async (
  proposalId: string,
  questionId: string,
  questionData: Object
): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(
        `${PROPOSAL_QUESTIONS_API_URL}/${proposalId}/${questionId}/update`,
        questionData,
        {
          headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() }
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

export const deleteProposalQuestionData = async (
  proposalId: string,
  questionId: string
): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(`${PROPOSAL_QUESTIONS_API_URL}/${proposalId}/${questionId}`, {
        headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() }
      })
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
    axiosInstance
      .get(`${PROPOSAL_API_URL}/opportunity/${id}`, {
        headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() }
      })
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
    axiosInstance
      .get(`${PROPOSAL_API_URL}/opportunity/${id}/count`, {
        headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() }
      })
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
  return axiosInstance.get(`${LOOKUP_OPTIONS_API}`, {
    headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() }
  });
};

/**
 * Get Opportunity Type List
 */
export const getOTListData = () => {
  return axiosInstance.get(`${PROPOSAL_OT_LIST}`, {
    headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() }
  });
};

/**
 * Get Opportunity Type List
 */
export const changeProposalOT = payload => {
  return axiosInstance.post(`${PROPOSAL_SWITCH_OT}`, payload, {
    headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() }
  });
};

/**
 * Delete Proposal User from Selected Answer
 */
export const deleteProposalUser = (proposalId, data) => {
  return axiosInstance.delete(
    `${PROPOSAL_QUESTIONS_API_URL}/${proposalId}/proposalUser`,
    {
      headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() },
      data
    }
  );
};
