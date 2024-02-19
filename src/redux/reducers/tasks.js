import { TASKS } from '../../constants/types';

const INITIAL_STATE = {
  tasks: [],
  loading: false,
  error: ''
};

export default function tasksReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TASKS.SET_TASKS:
      return {
        ...state,
        tasks: action.payload
      };
    case TASKS.LOADING_TASKS:
      return {
        ...state,
        loading: action.payload
      };
    case TASKS.ERROR_TASKS:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
