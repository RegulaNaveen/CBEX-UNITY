import {
  fetchTasksListApi,
  tasksListReorderingApi,
  tasksListMoveApi
} from '../../api/tasksList';
import { getSelectedBid } from '../selectors/proposal';
import { selectTasksList } from '../selectors/tasks';
import { TASKS } from '../../constants/types';
import { isEmpty } from 'lodash';

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
