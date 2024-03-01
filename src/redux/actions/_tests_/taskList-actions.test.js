import Sinon from 'sinon';
import {
  fetchTasksList,
  setTask,
  editTask,
  setTaskFromSocket,
  updateTaskDesc,
  deleteTask,
  tasksListMove,
  handleTaskLock,
  handleTaskUnlock,
  tasksListReordering,
  handleMultipleTaskLocks,
  updateTaskListMoveAction,
  updateTaskListOrderAction
} from '../tasksList-actions';
import * as TasklistApis from '../../../api/tasksList';
import * as proposalSelectors from '../../selectors/proposal'; // import the selector
import * as taskSelectors from '../../selectors/tasks';

describe('taskList actions', () => {
  let sinonSandbox;

  beforeAll(() => {
    sinonSandbox = Sinon.createSandbox();
  });

  beforeEach(() => {
    sinonSandbox.restore();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  it('should set loading to true and fetch tasks list', async () => {
    const proposalId = '123';
    const dispatch = jest.fn();
    const fetchTasksListApiStub = sinonSandbox
      .stub(TasklistApis, 'fetchTasksListApi')
      .resolves({ tasks: [] });
    await fetchTasksList(proposalId)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'LOADING_TASKS',
      payload: true
    });
    expect(dispatch).toHaveBeenCalledWith({ type: 'SET_TASKS', payload: [] });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'LOADING_TASKS',
      payload: false
    });
  });

  it('should set loading to true and fetch tasks list with non array', async () => {
    const proposalId = '123';
    const dispatch = jest.fn();
    const fetchTasksListApiStub = sinonSandbox
      .stub(TasklistApis, 'fetchTasksListApi')
      .resolves({ tasks: {} });
    await fetchTasksList(proposalId)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'LOADING_TASKS',
      payload: true
    });
    expect(dispatch).toHaveBeenCalledWith({ type: 'SET_TASKS', payload: [] });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'LOADING_TASKS',
      payload: false
    });
  });

  it('should set loading to true and fetch tasks list with error', async () => {
    const proposalId = '123';
    const dispatch = jest.fn();
    const fetchTasksListApiStub = sinonSandbox
      .stub(TasklistApis, 'fetchTasksListApi')
      .rejects({});
    await fetchTasksList(proposalId)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'LOADING_TASKS',
      payload: true
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'ERROR_FETCHING_TASKS',
      payload: { data: {} }
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'LOADING_TASKS',
      payload: false
    });
  });

  it('dispatches ADD_TASK when task data is fetched successfully', async () => {
    const mockTaskData = {
      no_of_units: 10,
      description: 'Task 10.3'
    };
    const proposalId = '123';
    const dispatch = jest.fn();
    const expectedTaskData = {
      is_completed: false,
      is_modified: false,
      is_deleted: false,
      is_freezed: false,
      id: 100,
      proposal_id: '123',
      description: 'Task 10.3',
      no_of_units: 10,
      task_id: 'a9462a0b-1974-416e-986c-a05eac1d006a',
      primary_condition: 'Bid History Creation',
      operator: 'addition',
      unit_type: 'Business Days',
      opportunity_types: 'Core Opportunity Launch Call (APAC)',
      order: 4,
      is_custom: true,
      updated_by: 'Pooja Chahar',
      updated_by_email: 'pooja.chahar@iqvia.com',
      updated_date: '2024-02-15T17:17:06.828Z',
      created_date: '2024-02-15T17:17:06.828Z'
    };
    const fetchTasksListApiStub = sinonSandbox
      .stub(TasklistApis, 'setTaskDataApi')
      .resolves({ result: expectedTaskData });

    await setTask(proposalId, mockTaskData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'ADD_TASK',
      payload: expectedTaskData
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'LOADING_TASKS',
      payload: false
    });
  });

  it('dispatches ADD_TASK when task data is empty', async () => {
    const mockTaskData = {
      no_of_units: 10,
      description: 'Task 10.3'
    };
    const proposalId = '123';
    const dispatch = jest.fn();

    const fetchTasksListApiStub = sinonSandbox
      .stub(TasklistApis, 'setTaskDataApi')
      .rejects({});

    await setTask(proposalId, mockTaskData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'ERROR_FETCHING_TASKS',
      payload: { data: {} }
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'LOADING_TASKS',
      payload: false
    });
  });

  it('dispatches EDIT_TASK when task data is fetched successfully', async () => {
    const mockTaskData = {
      no_of_units: 10,
      description: 'Task 10.3',
      is_completed: true
    };
    const proposalId = '123';
    const taskId = 'a9462a0b-1974-416e-986c-a05eac1d006a';
    const dispatch = jest.fn();
    const expectedTaskData = {
      is_completed: false,
      is_modified: false,
      is_deleted: false,
      is_freezed: false,
      id: 100,
      proposal_id: '123',
      description: 'Task 10.3',
      no_of_units: 10,
      task_id: 'a9462a0b-1974-416e-986c-a05eac1d006a',
      primary_condition: 'Bid History Creation',
      operator: 'addition',
      unit_type: 'Business Days',
      opportunity_types: 'Core Opportunity Launch Call (APAC)',
      order: 4,
      is_custom: true,
      updated_by: 'Pooja Chahar',
      updated_by_email: 'pooja.chahar@iqvia.com',
      updated_date: '2024-02-15T17:17:06.828Z',
      created_date: '2024-02-15T17:17:06.828Z'
    };
    const fetchTasksListApiStub = sinonSandbox
      .stub(TasklistApis, 'editTaskDataApi')
      .resolves({ result: expectedTaskData });

    await editTask(proposalId, taskId, mockTaskData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'EDIT_TASK',
      payload: expectedTaskData
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'LOADING_TASKS',
      payload: false
    });
  });

  it('should set loading to true and edit task with error', async () => {
    const mockTaskData = {
      no_of_units: 10,
      description: 'Task 10.3',
      is_completed: true
    };
    const proposalId = '123';
    const taskId = 'a9462a0b-1974-416e-986c-a05eac1d006ab';
    const dispatch = jest.fn();
    const fetchTasksListApiStub = sinonSandbox
      .stub(TasklistApis, 'editTaskDataApi')
      .rejects({});
    await editTask(proposalId, taskId, mockTaskData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'ERROR_FETCHING_TASKS',
      payload: { data: {} }
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'LOADING_TASKS',
      payload: false
    });
  });

  it('should delete a task', async () => {
    const dispatch = jest.fn();
    sinonSandbox.stub(taskSelectors, 'selectTasksList').returns([
      {
        task_id: 'task_id',
        description: 'desc'
      }
    ]);
    await deleteTask('task_id')(dispatch, () => {});
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_TASKS',
      payload: []
    });
  });

  it('should update task description', async () => {
    const dispatch = jest.fn();
    sinonSandbox.stub(taskSelectors, 'selectTasksList').returns([
      {
        task_id: 'task_id',
        description: 'old_desc'
      }
    ]);
    await updateTaskDesc('task_id', 'new_desc')(dispatch, () => {});
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_TASKS',
      payload: [{ task_id: 'task_id', description: 'new_desc' }]
    });
  });

  it('should handle task lock', async () => {
    const dispatch = jest.fn();
    sinonSandbox.stub(taskSelectors, 'selectTasksList').returns([
      {
        task_id: 'task_id',
        description: 'old_desc',
        proposal_id: 'proposal_id'
      }
    ]);
    localStorage.setItem('userId', 'user_id_2');
    await handleTaskLock({
      taskId: 'task_id',
      proposalId: 'proposal_id',
      userId: 'user_id',
      userEmail: 'user_email',
      userName: 'user_name'
    })(dispatch, () => {});
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_TASKS',
      payload: [
        {
          task_id: 'task_id',
          description: 'old_desc',
          proposal_id: 'proposal_id',
          locked: true,
          lockedBy: {
            userId: 'user_id',
            userEmail: 'user_email',
            userName: 'user_name'
          }
        }
      ]
    });
  });

  it('should handle task unlock', async () => {
    const dispatch = jest.fn();
    sinonSandbox.stub(taskSelectors, 'selectTasksList').returns([
      {
        task_id: 'task_id',
        description: 'old_desc',
        proposal_id: 'proposal_id'
      }
    ]);
    localStorage.setItem('userId', 'user_id_2');
    await handleTaskUnlock({
      taskId: 'task_id',
      proposalId: 'proposal_id',
      userId: 'user_id',
      userEmail: 'user_email',
      userName: 'user_name'
    })(dispatch, () => {});
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_TASKS',
      payload: [
        {
          task_id: 'task_id',
          description: 'old_desc',
          proposal_id: 'proposal_id',
          locked: false,
          lockedBy: {}
        }
      ]
    });
  });

  it('should not handle task lock when same user', async () => {
    const dispatch = jest.fn();
    sinonSandbox.stub(taskSelectors, 'selectTasksList').returns([
      {
        task_id: 'task_id',
        description: 'old_desc',
        proposal_id: 'proposal_id'
      }
    ]);
    localStorage.setItem('userId', 'user_id');
    await handleTaskLock({
      taskId: 'task_id',
      proposalId: 'proposal_id',
      userId: 'user_id',
      userEmail: 'user_email',
      userName: 'user_name'
    })(dispatch, () => {});
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('should not handle task unlock when same user', async () => {
    const dispatch = jest.fn();
    sinonSandbox.stub(taskSelectors, 'selectTasksList').returns([
      {
        task_id: 'task_id',
        description: 'old_desc',
        proposal_id: 'proposal_id'
      }
    ]);
    localStorage.setItem('userId', 'user_id');
    await handleTaskUnlock({
      taskId: 'task_id',
      proposalId: 'proposal_id',
      userId: 'user_id',
      userEmail: 'user_email',
      userName: 'user_name'
    })(dispatch, () => {});
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('should handle multiple task locks', async () => {
    const dispatch = jest.fn();
    sinonSandbox.stub(taskSelectors, 'selectTasksList').returns([
      {
        task_id: 'task_id',
        description: 'old_desc',
        proposal_id: 'proposal_id'
      }
    ]);
    localStorage.setItem('userId', 'user_id_2');
    await handleMultipleTaskLocks([
      {
        taskId: 'task_id',
        proposalId: 'proposal_id',
        userId: 'user_id',
        userEmail: 'user_email',
        userName: 'user_name'
      }
    ])(dispatch, () => {});
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_TASKS',
      payload: [
        {
          task_id: 'task_id',
          description: 'old_desc',
          proposal_id: 'proposal_id',
          locked: true,
          lockedBy: {
            userId: 'user_id',
            userEmail: 'user_email',
            userName: 'user_name'
          }
        }
      ]
    });
  });

  it('should handle reordering task within a day', async () => {
    const dispatch = jest.fn();
    sinonSandbox.stub(taskSelectors, 'selectTasksList').returns([
      {
        task_id: 'task_id',
        description: 'old_desc',
        proposal_id: 'proposal_id'
      }
    ]);
    sinonSandbox
      .stub(TasklistApis, 'tasksListReorderingApi')
      .resolves({ result: { source: [{ task_id: 'task_id', order: 1 }] } });
    await tasksListReordering(
      '',
      [{ task_id: 'task_id' }],
      'task_id'
    )(dispatch, () => {});
    expect(dispatch).toHaveBeenCalledTimes(3);
  });

  it('should handle move task into other day', async () => {
    const dispatch = jest.fn();
    sinonSandbox.stub(taskSelectors, 'selectTasksList').returns([
      {
        task_id: 'task_id 1',
        description: 'old_desc',
        proposal_id: 'proposal_id'
      },
      {
        task_id: 'task_id 2',
        description: 'old_desc',
        proposal_id: 'proposal_id'
      }
    ]);
    sinonSandbox.stub(TasklistApis, 'tasksListMoveApi').resolves({
      result: {
        source: [{ task_id: 'task_id 1', order: 1, no_of_units: 1 }],
        target: [{ task_id: 'task_id 2', order: 1, no_of_units: 2 }]
      }
    });
    await tasksListMove(
      '',
      [{ task_id: 'task_id' }],
      'task_id',
      2
    )(dispatch, () => {});
    expect(dispatch).toHaveBeenCalledTimes(3);
  });

  it('should handle reordering task within a day | WEB SOCKET', async () => {
    const dispatch = jest.fn();
    sinonSandbox.stub(taskSelectors, 'selectTasksList').returns([
      {
        task_id: 'task_id',
        description: 'old_desc',
        proposal_id: 'proposal_id'
      }
    ]);
    sinonSandbox
      .stub(proposalSelectors, 'getSelectedBid')
      .returns(new Map([['id', 'test']]));
    await updateTaskListOrderAction({
      proposalId: 'test',
      data: { sourceTaskIds: ['task_id'] }
    })(dispatch, () => {});
    expect(dispatch).toHaveBeenCalledTimes(3);
  });

  it('should handle move task into other day | WEB SOCKET', async () => {
    const dispatch = jest.fn();
    sinonSandbox.stub(taskSelectors, 'selectTasksList').returns([
      {
        task_id: 'task_id 1',
        description: 'old_desc',
        proposal_id: 'proposal_id'
      },
      {
        task_id: 'task_id 2',
        description: 'old_desc',
        proposal_id: 'proposal_id'
      }
    ]);
    sinonSandbox
      .stub(proposalSelectors, 'getSelectedBid')
      .returns(new Map([['id', 'test']]));
    await updateTaskListMoveAction({
      proposalId: 'test',
      data: {
        sourceTaskIds: ['task_id 2'],
        source_no_of_units: 1,
        targetTaskIds: ['task_id'],
        target_no_of_units: 2
      }
    })(dispatch, () => {});
    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});
