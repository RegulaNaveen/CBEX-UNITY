import { axiosInstance } from '../store';
import { getAccessTokenFromLocalStorage as getAccessToken } from '../SessionHandler';
import {
  CUSTOM_QUESTIONS_API_URL,
  CUSTOM_QUESTIONS_DELETE_API_URL
} from '../constants/api';
import { API } from '../constants';
console.log('main api', CUSTOM_QUESTIONS_API_URL);
const { API_KEY } = API.PROPOSAL;
/**
 * save unity question api
 */
export const setUnityQuestionData = async (
  proposalId: string,
  questionData: Object
): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`${CUSTOM_QUESTIONS_API_URL}/${proposalId}`, questionData, {
        headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() }
      })
      .then(response => {
        console.log('response', response.data);
        resolve(response.data);
      })
      .catch(err => {
        console.log('catch', err);
        reject(err);
      });
  });
};

export const editUnityQuestionData = async (
  proposalId: string,
  questionId: string,
  questionData: Object
): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(
        `${CUSTOM_QUESTIONS_API_URL}/${proposalId}/${questionId}`,
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

export const deleteUnityQuestionData = async (
  questionData: Object
): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(
        `${CUSTOM_QUESTIONS_DELETE_API_URL}/${questionData.proposalId}`,
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
