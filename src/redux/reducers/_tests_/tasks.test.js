import tasksReducer from '../tasks';

describe('tasksReducer', () => {
  const initialState = {
    tasks: [],
    loading: false,
    error: ''
  };

  it('should handle SET_TASKS', () => {
    const action = {
      type: 'SET_TASKS',
      payload: [{ id: '1', description: 'Test task' }]
    };
    const expectedState = { ...initialState, tasks: action.payload };
    expect(tasksReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle LOADING_TASKS', () => {
    const action = { type: 'LOADING_TASKS', payload: true };
    const expectedState = { ...initialState, loading: true };
    expect(tasksReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle ERROR_TASKS', () => {
    const action = { type: 'ERROR_TASKS', payload: 'Error message' };
    const expectedState = { ...initialState, error: 'Error message' };
    expect(tasksReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle ADD_TASK', () => {
    const task = { task_id: '1', proposal_id: '1', description: 'Test task' };
    const action = { type: 'ADD_TASK', payload: task };
    const expectedState = { ...initialState, tasks: [task] };
    expect(tasksReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle EDIT_TASK', () => {
    const initialTask = {
      task_id: '1',
      proposal_id: '1',
      description: 'Test task'
    };
    const editedTask = {
      task_id: '1',
      proposal_id: '1',
      description: 'Edited task'
    };
    const action = { type: 'EDIT_TASK', payload: editedTask };
    const expectedState = { ...initialState, tasks: [editedTask] };
    expect(
      tasksReducer({ ...initialState, tasks: [initialTask] }, action)
    ).toEqual(expectedState);
  });
});
