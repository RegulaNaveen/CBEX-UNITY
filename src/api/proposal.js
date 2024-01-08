// @flow
import newAxios from 'axios';
import omit from 'lodash/omit';
import FileSaver from 'file-saver';
import moment from 'moment';
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
  PROPOSAL_SWITCH_OT,
  USER_API_URL,
  INTEGRATIONS_API_URL,
  PDF_DOWNLOAD_ENDPOINT
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

const getPDF = (pdfHtml, url, userName, time, oppId) => {
  const obj = {
    html: pdfHtml,
    url,
    time,
    year: new Date().getFullYear(),
    userName,
    oppId
  };
  // ${PROPOSAL_API_URL}
  return axiosInstance.post(PDF_DOWNLOAD_ENDPOINT, obj, {
    responseType: 'arraybuffer',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/pdf'
    }
  });
};
export const savePDF = (pdfHtml, url, userName, time, oppId, fileName) => {
  getPDF(pdfHtml, url, userName, time, oppId)
    .then(response => {
      const blob = new Blob([response.data], { type: 'application/pdf' });
      FileSaver.saveAs(blob, fileName);
    })
    .catch(err => {
      console.log(err);
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

export const setNotApplicableQuestionApi = async (
  proposalId: string,
  questionId: string,
  status: Boolean
): Promise<Object> => {
  const payload = { status };

  return axiosInstance
    .put(
      `${PROPOSAL_QUESTIONS_API_URL}/${proposalId}/${questionId}/notapplicable`,
      payload,
      {
        headers: {
          'x-api-key': `${API_KEY}`,
          'x-access-token': `${getAccessToken()}`
        }
      }
    )
    .then(res => {
      return res;
    });
};

export const setProposalAnswer = async (
  proposalId: string,
  questionId: string,
  answer: string,
  userData: Object,
  editorData: any,
  cfProposalId: any
): Promise<Object> => {
  if (onGoingAnswer[questionId]) onGoingAnswer[questionId]();
  const payload = { answer, userData };
  if (editorData) payload.formattedAnswer = editorData;
  if (cfProposalId !== null) payload.cfProposalId = cfProposalId;

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
    })
    .catch(err => {
      if (newAxios.isCancel(err)) {
        return { data: '' };
      }
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

export const getIntegrations = async (): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${INTEGRATIONS_API_URL}/integrations`, {
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

export const fetchOpportunityFolderLink = async (
  oppID: string
): Promise<Object> => {
  return axiosInstance.get(
    `${PROPOSAL_API_URL}/opportunity/box-folder-id?opportunityId=${oppID}`,
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
// commented unused code
// export const getProposalCount = async (id: string): Promise<Object> => {
//   return new Promise((resolve, reject) => {
//     axiosInstance
//       .get(`${PROPOSAL_API_URL}/opportunity/${id}/count`, {
//         headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() }
//       })
//       .then(response => {
//         resolve(response.data);
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
// };

export const getAllProposals = async (id: string): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${PROPOSAL_API_URL}/opportunity/all/${id}`, {
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

export const getData = async searchTerm => {
  try {
    return await fetch(`${USER_API_URL}/${searchTerm}`, {
      headers: {
        'x-api-key': API_KEY,
        'x-access-token': getAccessToken()
      }
    });
  } catch (error) {
    console.error(error);
    return '';
  }
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

/**
 * Get Users List Api
 */
export const getUsersListApiCall = async (searchTerm): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${USER_API_URL}/${searchTerm}`, {
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

/**
 * Get Price Modeler Data
 */
export const priceModelerApi = proposalId => {
  return axiosInstance.get(
    `${PROPOSAL_API_URL}/cost?proposalId=${proposalId}`,
    {
      headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() }
    }
  );
};
