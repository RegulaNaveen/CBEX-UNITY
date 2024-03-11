import { axiosInstance } from '../store';
import { API } from '../constants';
import { getAccessTokenFromLocalStorage as getAccessToken } from '../SessionHandler';

const { TASKSLIST_API_URL } = API.TASKSLIST;
const { API_KEY } = API.PROPOSAL;

const getAxiosConfig = () => ({
  headers: {
    'x-api-key': API_KEY,
    'x-access-token': getAccessToken()
  }
});

export function fetchTasksListApi(proposalId) {
  const config = getAxiosConfig();
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${TASKSLIST_API_URL}/${proposalId}`, config)
      .then(response => resolve(response.data))
      .catch(err => reject(err));
  });
}

export function updateTaskListApi(proposalId, task_Id, roles) {
  const config = getAxiosConfig();
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(`${TASKSLIST_API_URL}/roles/${proposalId}/${task_Id}`, roles, config)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        console.error(err);
        reject(err);
      });
  });
}

export function tasksListReorderingApi(proposalId, taskIds, taskId) {
  const config = getAxiosConfig();
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
  const config = getAxiosConfig();
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
export function updateTaskDescApi(proposalId, taskId, newDesc) {
  const config = getAxiosConfig();
  const payload = {
    description: newDesc
  };
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(`${TASKSLIST_API_URL}/${proposalId}/${taskId}`, payload, config)
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
}

export function deleteTaskApi(proposalId, taskId) {
  const config = getAxiosConfig();
  const payload = {
    is_deleted: true
  };

  return new Promise((resolve, reject) => {
    axiosInstance
      .put(`${TASKSLIST_API_URL}/${proposalId}/${taskId}`, payload, config)
      .then(response => resolve(response))
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

export function getTaskHistoryApi(proposalId, taskId) {
  const config = getAxiosConfig();
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${TASKSLIST_API_URL}/${proposalId}/${taskId}/history`, config)
      .then(response => resolve(response.data))
      .catch(err => reject(err));
  });
}
