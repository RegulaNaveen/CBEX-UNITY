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
  updateTaskListOrderAction,
  editRoleFromSocket,
  getTaskHistory,
  toggleCanReorder,
  updateTaskById
} from '../tasksList-actions';
import * as TasklistApis from '../../../api/tasksList';
import * as proposalSelectors from '../../selectors/proposal'; // import the selector
import * as taskSelectors from '../../selectors/tasks';
import { Map } from 'immutable';
import { TASKS } from '../../../constants/types';
import { store } from '../../../store';

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

  it('should handle role edit from socket', async () => {
    const dispatch = jest.fn();
    sinonSandbox.stub(taskSelectors, 'selectTasksList').returns([
      {
        id: 573,
        proposal_id: '67e3e355-b8bd-4114-b377-27898c4603c4',
        task_id: 'd18a89df-f3da-408b-ab33-ce2aa847b769',
        description: 'T',
        primary_condition: 'Bid History Creation',
        operator: 'addition',
        unit_type: 'Business Days',
        no_of_units: 1,
        opportunity_types: 'Core Opportunity Launch Call (AMR/EMEA)',
        order: 4,
        is_completed: false,
        is_modified: false,
        is_deleted: false,
        is_custom: true,
        is_freezed: false,
        updated_by: 'Pooja Chahar',
        updated_by_email: 'pooja.chahar@iqvia.com',
        created_date: '2024-02-26T07:26:29.458Z',
        updated_date: '2024-02-26T07:26:29.458Z',
        task_role: [
          {
            id: 1718,
            task_list_id: 573,
            proposal_id: '67e3e355-b8bd-4114-b377-27898c4603c4',
            task_id: 'd18a89df-f3da-408b-ab33-ce2aa847b769',
            question_id: null,
            name: 'Kunal Nigam',
            email: 'kunal.nigam@iqvia.com',
            type: 'user',
            updated_by: 'Varsha Kumari',
            updated_by_email: 'varsha.kumari2@iqvia.com',
            created_date: '2024-02-26T07:33:00.788Z',
            updated_date: '2024-02-26T07:33:00.788Z'
          }
        ],
        task_history: []
      }
    ]);
    sinonSandbox.stub(proposalSelectors, 'getSelectedBid').returns(
      Map({
        id: '67e3e355-b8bd-4114-b377-27898c4603c4'
      })
    );
    await editRoleFromSocket(
      [
        {
          id: 1718,
          task_list_id: 573,
          proposal_id: '67e3e355-b8bd-4114-b377-27898c4603c4',
          task_id: 'd18a89df-f3da-408b-ab33-ce2aa847b769',
          question_id: null,
          name: 'Kunal Nigam',
          email: 'kunal.nigam@iqvia.com',
          type: 'user',
          updated_by: 'Varsha Kumari',
          updated_by_email: 'varsha.kumari2@iqvia.com',
          created_date: '2024-02-26T07:33:00.788Z',
          updated_date: '2024-02-26T07:33:00.788Z'
        }
      ],
      '67e3e355-b8bd-4114-b377-27898c4603c4',
      573
    )(dispatch, () => {});
    expect(dispatch).toHaveBeenCalledWith({
      type: 'LOADING_TASKS',
      payload: true
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_TASKS',
      payload: [
        {
          id: 573,
          proposal_id: '67e3e355-b8bd-4114-b377-27898c4603c4',
          task_id: 'd18a89df-f3da-408b-ab33-ce2aa847b769',
          description: 'T',
          primary_condition: 'Bid History Creation',
          operator: 'addition',
          unit_type: 'Business Days',
          no_of_units: 1,
          opportunity_types: 'Core Opportunity Launch Call (AMR/EMEA)',
          order: 4,
          is_completed: false,
          is_modified: false,
          is_deleted: false,
          is_custom: true,
          is_freezed: false,
          updated_by: 'Pooja Chahar',
          updated_by_email: 'pooja.chahar@iqvia.com',
          created_date: '2024-02-26T07:26:29.458Z',
          updated_date: '2024-02-26T07:26:29.458Z',
          task_role: [
            {
              id: 1718,
              task_list_id: 573,
              proposal_id: '67e3e355-b8bd-4114-b377-27898c4603c4',
              task_id: 'd18a89df-f3da-408b-ab33-ce2aa847b769',
              question_id: null,
              name: 'Kunal Nigam',
              email: 'kunal.nigam@iqvia.com',
              type: 'user',
              updated_by: 'Varsha Kumari',
              updated_by_email: 'varsha.kumari2@iqvia.com',
              created_date: '2024-02-26T07:33:00.788Z',
              updated_date: '2024-02-26T07:33:00.788Z'
            }
          ],
          task_history: []
        }
      ]
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'LOADING_TASKS',
      payload: false
    });
  });

  it('should handle taskHistory', async () => {
    const dispatch = jest.fn();
    const proposalId = 'proposal_id';
    const taskId = 'task_id';

    sinonSandbox
      .stub(TasklistApis, 'getTaskHistoryApi')
      .resolves({ result: [{ task_id: taskId, order: 1 }] });

    await getTaskHistory(proposalId, taskId)(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(3);
  });
  it('should handle taskHistory error', async () => {
    const dispatch = jest.fn();
    const proposalId = 'proposal_id';
    const taskId = 'task_id';

    // Make the getTaskHistoryApi stub reject with an error
    sinonSandbox
      .stub(TasklistApis, 'getTaskHistoryApi')
      .rejects(new Error('An error occurred'));

    await getTaskHistory(proposalId, taskId)(dispatch);

    // Check if dispatch was called once with the loading action
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: TASKS.LOADING_TASK_HISTORY
    });
  });

  it('toggleCanReorder', async () => {
    const dispatch = jest.fn();
    toggleCanReorder(true)(dispatch, () => {});
    expect(dispatch).toHaveBeenCalledWith({
      type: 'TOGGLE_CAN_REORDER',
      payload: true
    });
  });

  it('should handle tasksListReordering error', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const proposalId = 'proposal_id';
    const tasks = [{ task_id: 'task_id' }];
    const taskId = 'task_id';

    // Make the tasksListReorderingApi stub reject with an error
    sinonSandbox
      .stub(TasklistApis, 'tasksListReorderingApi')
      .rejects(new Error('An error occurred'));

    const result = await tasksListReordering(
      proposalId,
      tasks,
      taskId
    )(dispatch, getState);

    // Check if dispatch was called twice with the loading action
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: TASKS.LOADING_TASKS,
      payload: true
    });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: TASKS.LOADING_TASKS,
      payload: false
    });

    // Check if the returned error is the one we threw
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe('An error occurred');
  });

  it('should handle updateTaskById error', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const proposalId = 'proposal_id';
    const taskId = 'task_id';
    const payload = { key: 'value' };

    // Make the updateTaskListApi stub reject with an error
    sinonSandbox
      .stub(TasklistApis, 'updateTaskListApi')
      .rejects(new Error('An error occurred'));

    try {
      await updateTaskById(proposalId, taskId, payload)(dispatch, getState);
    } catch (error) {
      // Check if the error is the one we threw
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('An error occurred');
    }
  });

  it('should handle tasksListMove error', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const proposalId = 'proposal_id';
    const tasks = [{ task_id: 'task_id' }];
    const taskId = 'task_id';
    const destDay = 'dest_day';

    // Make the tasksListMoveApi stub reject with an error
    sinonSandbox
      .stub(TasklistApis, 'tasksListMoveApi')
      .rejects(new Error('An error occurred'));

    try {
      await tasksListMove(
        proposalId,
        tasks,
        taskId,
        destDay
      )(dispatch, getState);
    } catch (error) {
      // Check if the error is the one we threw
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('An error occurred');
    }

    // Check if dispatch was called twice with the loading action
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: TASKS.LOADING_TASKS,
      payload: true
    });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: TASKS.LOADING_TASKS,
      payload: false
    });
  });

  it('updateTaskById', async () => {
    const task = {
      is_completed: false,
      is_modified: false,
      is_deleted: false,
      is_freezed: false,
      id: 1246,
      proposal_id: 'e7a77d70-b7a1-4a98-8d6e-e1f1244b64f5',
      description: 'new task',
      no_of_units: 1,
      task_id: 'd0333719-2c3e-4574-b8a8-c36268166071',
      primary_condition: 'Bid History Creation',
      operator: 'addition',
      unit_type: 'Business Days',
      opportunity_types: 'Core Opportunity Launch Call (APAC)',
      order: 5,
      is_custom: true,
      updated_by: 'RAHUL TIWARI',
      updated_by_email: 'rahul.tiwari@iqvia.com',
      updated_date: '2024-03-18T07:21:58.534Z',
      created_date: '2024-03-18T07:21:58.534Z'
    };
    const payload = {
      proposalId: 'e7a77d70-b7a1-4a98-8d6e-e1f1244b64f5',
      taskId: 1246
    };
    store.dispatch(setTask(payload.proposalId, task));
    sinonSandbox.stub(taskSelectors, 'selectTasksList').returns([task]);
    sinonSandbox.stub(proposalSelectors, 'getSelectedBid').returns(
      Map({
        id: payload.proposalId
      })
    );
    jest.spyOn(TasklistApis, 'setTaskDataApi').mockResolvedValue({
      result: task
    });
    jest.spyOn(TasklistApis, 'updateTaskListApi').mockResolvedValue({
      result: [task]
    });
    store.dispatch(
      await updateTaskById(payload.proposalId, payload.taskId, task)
    );
  });
});
