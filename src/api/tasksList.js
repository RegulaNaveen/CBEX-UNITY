import { axiosInstance } from '../store';
import { API } from '../constants';
import { getAccessTokenFromLocalStorage as getAccessToken } from '../SessionHandler';

const { TASKSLIST_API_URL } = API.TASKSLIST;
const { API_KEY } = API.PROPOSAL;

export function fetchTasksListApi(proposalId) {
  const config = {
    headers: {
      'x-api-key': API_KEY,
      'x-access-token': getAccessToken()
    }
  };

  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${TASKSLIST_API_URL}/${proposalId}`, config)
      .then(response => resolve(response.data))
      .catch(err => reject(err));
  });
}


export const setTaskDataApi = async (
  proposalId: string,
  taskData: Object
): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`${TASKSLIST_API_URL}/${proposalId}`, taskData, {
        headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() }
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        console.log('catch', err);
        reject(err);
      });
  });
};


export const editTaskDataApi = async (
  proposalId: string,
  taskId: string,
  taskData: Object
): Promise<Object> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(`${TASKSLIST_API_URL}/${proposalId}/${taskId}`, taskData, {
        headers: { 'x-api-key': API_KEY, 'x-access-token': getAccessToken() }
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        console.log('catch', err);
        reject(err);
      });
  });
};
