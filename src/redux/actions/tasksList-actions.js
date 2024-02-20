import {
  fetchTasksListApi,
  tasksListReorderingApi,
  tasksListMoveApi,
  updateTaskListApi,
  updateTaskDescApi,
  setTaskDataApi,
  editTaskDataApi
} from '../../api/tasksList';
import { getSelectedBid } from '../selectors/proposal';
import { selectTasksList } from '../selectors/tasks';
import { TASKS } from '../../constants/types';
import { isEmpty } from 'lodash';

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

export function tasksListReordering(proposalId, tasks, taskId = '') {
  return async (dispatch, getState) => {
    dispatch({
      type: LOADING_TASKS,
      payload: true
    });
    try {
      const state = getState();
      const taskIds = tasks.map(item => item.task_id);
      const response = await tasksListReorderingApi(
        proposalId,
        taskIds,
        taskId
      );
      if (!isEmpty(response.result)) {
        const tasks = selectTasksList(state);
        const updatedTasks = tasks.map(task => {
          return {
            ...task,
            order: response.result.source.find(
              item => item.task_id === task.task_id
            )?.order
          };
        });
        dispatch({
          type: SET_TASKS,
          payload: updatedTasks
        });
        return { status: true, data: response.result };
      }
    } catch (error) {
      console.log('Error! occurred..', error);
      // Server Error
    } finally {
      dispatch({
        type: LOADING_TASKS,
        payload: false
      });
    }
  };
}

export function updateTaskById(proposalId, taskId, payload) {
  return async (dispatch, getState) => {
    try {
      const taskListResponse = await updateTaskListApi(
        proposalId,
        taskId,
        payload
      );
      if (Array.isArray(taskListResponse.result)) {
        const tasksList = selectTasksList(getState());
        const taskIndex = tasksList.findIndex(task => task.id === taskId);
        if (taskIndex > -1) {
          tasksList[taskIndex].task_role = taskListResponse.result;
          dispatch({
            type: SET_TASKS,
            payload: tasksList
          });
        }
      }
    } catch (err) {
      console.error(err);
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
    let responseData = null;
    try {
      const taskListResponse = await setTaskDataApi(proposalId, taskData);
      const data = taskListResponse.result;
      console.log(data);
      if (data) {
        dispatch({
          type: ADD_TASK,
          payload: data
        });
        responseData = data;
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
    return responseData;
  };
};

export function tasksListMove(proposalId, tasks, taskId, destDay) {
  return async (dispatch, getState) => {
    dispatch({
      type: LOADING_TASKS,
      payload: true
    });
    try {
      const state = getState();
      const taskIds = tasks.map(item => item.task_id);
      const response = await tasksListMoveApi(
        proposalId,
        taskIds,
        taskId,
        destDay
      );
      if (!isEmpty(response.result)) {
        const tasks = selectTasksList(state);
        const modifiedTasks = [
          ...response.result.source,
          ...response.result.target
        ];
        const updatedTasks = tasks.map(task => {
          const modifiedTask = modifiedTasks.find(
            item => item.task_id === task.task_id
          );
          return {
            ...task,
            order: modifiedTask?.order || task.order,
            no_of_units: modifiedTask?.no_of_units || task.no_of_units
          };
        });
        dispatch({
          type: SET_TASKS,
          payload: updatedTasks
        });
        return { status: true, data: response.result };
      }
    } catch (error) {
      console.log('Error! occurred..', error);
    } finally {
      dispatch({
        type: LOADING_TASKS,
        payload: false
      });
    }
  };
}

export const editTask = (
  proposalId: string,
  taskId: string,
  taskData: Object,
  socketContext
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
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

export function updateTaskListOrderAction(data) {
  return async (dispatch, getState) => {
    dispatch({
      type: LOADING_TASKS,
      payload: true
    });
    try {
      const state = getState();
      const selectedBid = getSelectedBid(state);
      const proposalId = selectedBid.get('id');
      if (!isEmpty(data.data.sourceTaskIds) && proposalId === data.proposalId) {
        const tasks = selectTasksList(state);
        const updatedTasks = tasks.map(task => {
          const modifiedIndex = data.data.sourceTaskIds.findIndex(
            item => item === task.task_id
          );
          return {
            ...task,
            order: modifiedIndex !== -1 ? modifiedIndex : task.order
          };
        });
        dispatch({
          type: SET_TASKS,
          payload: updatedTasks
        });
      }
    } catch (error) {
      console.log('Error! occurred..', error);
      // Server Error
    } finally {
      dispatch({
        type: LOADING_TASKS,
        payload: false
      });
    }
  };
}

export function updateTaskListMoveAction(data) {
  return async (dispatch, getState) => {
    dispatch({
      type: LOADING_TASKS,
      payload: true
    });
    try {
      const state = getState();
      const selectedBid = getSelectedBid(state);
      const proposalId = selectedBid.get('id');
      if (proposalId === data.proposalId) {
        const {
          sourceTaskIds,
          source_no_of_units,
          targetTaskIds,
          target_no_of_units
        } = data.data;
        const tasks = selectTasksList(state);
        const updatedTasks = tasks.map(task => {
          const modifiedSourceIndex = sourceTaskIds.findIndex(
            item => item === task.task_id
          );
          const modifiedTargetIndex = targetTaskIds.findIndex(
            item => item === task.task_id
          );
          return {
            ...task,
            order:
              (modifiedSourceIndex !== -1 && modifiedSourceIndex) ||
              (modifiedTargetIndex !== -1 && modifiedTargetIndex) ||
              task.order,
            no_of_units:
              modifiedSourceIndex !== -1
                ? source_no_of_units
                : modifiedTargetIndex !== -1
                ? target_no_of_units
                : task.no_of_units
          };
        });
        dispatch({
          type: SET_TASKS,
          payload: updatedTasks
        });
      }
    } catch (error) {
      console.log('Error! occurred..', error);
      // Server Error
    } finally {
      dispatch({
        type: LOADING_TASKS,
        payload: false
      });
    }
  };
}

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
