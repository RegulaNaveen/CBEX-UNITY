import { axiosInstance } from '../store';
import { API } from '../constants';
import { getAccessTokenFromLocalStorage as getAccessToken } from '../SessionHandler';

const { TASKSLIST_API_URL } = API.TASKSLIST;
const { API_KEY } = API.PROPOSAL;

const config = {
  headers: {
    'x-api-key': API_KEY,
    'x-access-token': getAccessToken()
  }
};

export function fetchTasksListApi(proposalId) {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${TASKSLIST_API_URL}/${proposalId}`, config)
      .then(response => resolve(response.data))
      .catch(err => reject(err));
  });
}

export function tasksListReorderingApi(proposalId, taskIds, taskId) {
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(
        `${TASKSLIST_API_URL}/${proposalId}/${taskId}/reorder`,
        { order: taskIds },
        config
      )
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
}

export function tasksListMoveApi(proposalId, taskIds, taskId, destDay) {
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(
        `${TASKSLIST_API_URL}/${proposalId}/${taskId}/move`,
        {
          no_of_units: destDay,
          order: taskIds
        },
        config
      )
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
}
