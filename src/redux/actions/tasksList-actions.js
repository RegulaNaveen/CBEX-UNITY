import { fetchTasksListApi } from '../../api/tasksList';
import { TASKS } from '../../constants/types';

const { LOADING_TASKS, SET_TASKS, ERROR_FETCHING_TASKS } = TASKS;

export function fetchTasksList(proposalId) {
  return async dispatch => {
    dispatch({
      type: LOADING_TASKS,
      payload: true
    });
    try {
      const data = await fetchTasksListApi(proposalId);
      dispatch({
        type: SET_TASKS,
        payload: data.tasks
      });
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
