import { fetchTasksListApi, updateTaskListApi } from '../../api/tasksList';
import { TASKS } from '../../constants/types';
import { selectTasksList } from '../selectors/tasks';

const { LOADING_TASKS, SET_TASKS, ERROR_FETCHING_TASKS } = TASKS;

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

export function updateTaskById(proposalId, taskId, payload) {
  console.log('Here', taskId, payload);
  return async (dispatch, getState) => {
    try {
      const taskListResponse = await updateTaskListApi(
        proposalId,
        taskId,
        payload
      );
      console.log('tasksList', taskListResponse);
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
