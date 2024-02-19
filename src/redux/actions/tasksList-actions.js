import {
  fetchTasksListApi,
  updateTaskDescApi,
  setTaskDataApi,
  editTaskDataApi
} from '../../api/tasksList';
import { TASKS } from '../../constants/types';
import { getSelectedBid } from '../selectors';
import { selectTasksList } from '../selectors/tasks';

const {
  LOADING_TASKS,
  SET_TASKS,
  ERROR_FETCHING_TASKS,
  EDITING_DESC,
  ADD_TASK,
  EDIT_TASK
} = TASKS;

export function fetchTasksList(proposalId) {
  return async dispatch => {
    dispatch({
      type: LOADING_TASKS,
      payload: true
    });
    try {
      const taskListResponse = await fetchTasksListApi(proposalId);
      if (Array.isArray(taskListResponse.tasks)) {
        dispatch({
          type: SET_TASKS,
          payload: taskListResponse.tasks
        });
      } else {
        dispatch({
          type: SET_TASKS,
          payload: []
        });
      }
    } catch (err) {
      dispatch({
        type: ERROR_FETCHING_TASKS,
        payload: { data: err }
      });
    } finally {
      dispatch({
        type: LOADING_TASKS,
        payload: false
      });
    }
  };
}

export function updateTaskDesc(taskId, newDesc) {
  return async (dispatch, getState) => {
    const tasksList = selectTasksList(getState());
    const taskIndex = tasksList.findIndex(task => task.task_id === taskId);
    if (taskIndex > -1) {
      tasksList[taskIndex]['description'] = newDesc;
    }
    dispatch({
      type: SET_TASKS,
      payload: tasksList
    });
  };
}

export function deleteTask(taskId) {
  return async (dispatch, getState) => {
    const tasksList = selectTasksList(getState());
    const taskIndex = tasksList.findIndex(task => task.task_id === taskId);
    if (taskIndex > -1) {
      tasksList.splice(taskIndex, 1);
    }
    dispatch({
      type: SET_TASKS,
      payload: tasksList
    });
  };
}
export const setTask = (
  proposalId: string,
  taskData: Object,
  socketContext
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    try {
      const taskListResponse = await setTaskDataApi(proposalId, taskData);
      const data = taskListResponse.result;
      if (data) {
        dispatch({
          type: ADD_TASK,
          payload: data
        });
      }
    } catch (err) {
      dispatch({
        type: ERROR_FETCHING_TASKS,
        payload: { data: err }
      });
    } finally {
      dispatch({
        type: LOADING_TASKS,
        payload: false
      });
    }
  };
};

export const editTask = (
  proposalId: string,
  taskId: string,
  taskData: Object,
  socketContext
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: LOADING_TASKS,
      payload: true
    });
    try {
      const taskListResponse = await editTaskDataApi(
        proposalId,
        taskId,
        taskData
      );
      const data = taskListResponse.result;
      if (data) {
        dispatch({
          type: EDIT_TASK,
          payload: data
        });
      }
    } catch (err) {
      dispatch({
        type: ERROR_FETCHING_TASKS,
        payload: { data: err }
      });
    } finally {
      dispatch({
        type: LOADING_TASKS,
        payload: false
      });
    }
  };
};

export const setTaskFromSocket = (
  taskData: Object,
  proposalId
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>, getState) => {
    const selectedBid = getSelectedBid(getState()).toJS();
    if (selectedBid?.id === proposalId) {
      try {
        dispatch({
          type: ADD_TASK,
          payload: taskData
        });
      } catch (err) {
        dispatch({ type: ERROR_FETCHING_TASKS, payload: err });
      } finally {
        dispatch({
          type: LOADING_TASKS,
          payload: false
        });
      }
    }
  };
};

export const editTaskFromSocket = (
  taskData: Object,
  proposalId
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>, getState) => {
    const selectedBid = getSelectedBid(getState()).toJS();
    if (selectedBid?.id === proposalId) {
      dispatch({
        type: LOADING_TASKS,
        payload: true
      });
      try {
        dispatch({
          type: EDIT_TASK,
          payload: taskData
        });
      } catch (err) {
        dispatch({ type: ERROR_FETCHING_TASKS, payload: err });
      } finally {
        dispatch({
          type: LOADING_TASKS,
          payload: false
        });
      }
    }
  };
};

export const handleTaskLock = taskLockInfo => {
  return async (dispatch, getState) => {
    if (taskLockInfo.userId === localStorage.getItem('userId')) {
      return;
    }
    const tasksList = selectTasksList(getState());
    const taskIndex = tasksList.findIndex(
      task =>
        task.task_id === taskLockInfo.taskId &&
        task.proposal_id === taskLockInfo.proposalId
    );
    if (taskIndex > -1) {
      tasksList[taskIndex]['locked'] = true;
      tasksList[taskIndex]['lockedBy'] = {
        userId: taskLockInfo.userId,
        userEmail: taskLockInfo.userEmail,
        userName: taskLockInfo.userName
      };
      dispatch({
        type: SET_TASKS,
        payload: tasksList
      });
    }
  };
};

export const handleTaskUnlock = taskLockInfo => {
  return async (dispatch, getState) => {
    if (taskLockInfo.userId === localStorage.getItem('userId')) {
      return;
    }
    const tasksList = selectTasksList(getState());
    const taskIndex = tasksList.findIndex(
      task =>
        task.task_id === taskLockInfo.taskId &&
        task.proposal_id === taskLockInfo.proposalId
    );
    if (taskIndex > -1) {
      tasksList[taskIndex]['locked'] = false;
      tasksList[taskIndex]['lockedBy'] = {};
      dispatch({
        type: SET_TASKS,
        payload: tasksList
      });
    }
  };
};

export const handleMultipleTaskLocks = tasksLocksInfo => {
  return async (dispatch, getState) => {
    const tasksList = selectTasksList(getState());
    const tasksIndexMap = tasksList.reduce((acc, task, index) => {
      acc[task.task_id] = index;
      return acc;
    }, {});
    tasksLocksInfo.forEach(taskLockInfo => {
      const taskIndex = tasksIndexMap[taskLockInfo.taskId];
      if (
        taskIndex >= 0 &&
        tasksList[taskIndex]['proposal_id'] === taskLockInfo.proposalId
      ) {
        tasksList[taskIndex]['locked'] = true;
        tasksList[taskIndex]['lockedBy'] = {
          userId: taskLockInfo.userId,
          userEmail: taskLockInfo.userEmail,
          userName: taskLockInfo.userName
        };
      }
    });
    dispatch({
      type: SET_TASKS,
      payload: tasksList
    });
  };
};
