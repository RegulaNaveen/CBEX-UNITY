import { axiosInstance } from '../store';
import { API } from '../constants';
import { getAccessTokenFromLocalStorage as getAccessToken } from '../SessionHandler';

const { TASKSLIST_API_URL, TASKLIST_UPDATE_API_URL } = API.TASKSLIST;
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

export function updateTaskListApi(proposalId, task_Id, roles) {
  const config = {
    headers: {
      'x-api-key': API_KEY,
      'x-access-token': getAccessToken(),
      'Content-Type': 'application/json'
    }
  };

  return new Promise((resolve, reject) => {
    axiosInstance
      .put(`${TASKLIST_UPDATE_API_URL}/${proposalId}/${task_Id}`, roles, config)
      .then(response => {
        console.log(response.data);
        resolve(response.data);
      })
      .catch(err => {
        console.error(err);
        reject(err);
      });
  });
}
