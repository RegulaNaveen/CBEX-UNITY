import {
  fetchTasksListApi,
  setTaskDataApi,
  editTaskDataApi
} from '../../api/tasksList';
import { TASKS } from '../../constants/types';

const { LOADING_TASKS, SET_TASKS, ERROR_FETCHING_TASKS, ADD_TASK, EDIT_TASK } =
  TASKS;

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
      if (socketContext)
        await socketContext?.addTaskWrapper(
          data,
          proposalId
        );
      return data;
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
      dispatch({
        type: LOADING_TASKS,
        payload: {}
      });
      try {
        dispatch({ type: ADD_TASK, payload: taskData });
      } catch (err) {
        dispatch({ type: ERROR_FETCHING_TASKS, payload: err });
      }
    }
  };
};

