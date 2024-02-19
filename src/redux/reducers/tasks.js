import { add } from 'lodash';
import { TASKS } from '../../constants/types';
const INITIAL_STATE = {
  tasks: [],
  loading: false,
  error: ''
};

export default function tasksReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload
      };
    case 'LOADING_TASKS':
      return {
        ...state,
        loading: action.payload
      };
    case 'ERROR_TASKS':
      return {
        ...state,
        error: action.payload
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: addTask(state, action)
      };
    case 'EDIT_TASK':
      return {
        ...state,
        tasks: editTask(state, action)
      };
    default:
      return state;
  }
}

const addTask = (state, action) => {
  const { payload } = action;
  const tasks = [...state.tasks];
  const { task_id, proposal_id } = payload;
  const tabIndex = tasks.findIndex(
    value => value.task_id === task_id && value.proposal_id === proposal_id
  );
  if (tabIndex === -1) {
    tasks.push(payload);
  }
  return tasks;
};

const editTask = (state, action) => {
  const { payload } = action;
  const tasks = state.tasks;
  const { task_id, proposal_id } = payload;
  const tabIndex = tasks.findIndex(
    value => value.task_id === task_id && value.proposal_id === proposal_id
  );
  if (tabIndex > -1) {
    tasks[tabIndex] = payload;
  }
  return tasks;
};
