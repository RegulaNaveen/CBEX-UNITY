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
    default:
      return state;
  }
}
