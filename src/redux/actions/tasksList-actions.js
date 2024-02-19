import { fetchTasksListApi, updateTaskDescApi } from '../../api/tasksList';
import { TASKS } from '../../constants/types';
import { selectTasksList } from '../selectors/tasks';

const { LOADING_TASKS, SET_TASKS, ERROR_FETCHING_TASKS, EDITING_DESC } = TASKS;

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
