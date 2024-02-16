import Sinon from 'sinon';
import { fetchTasksList, setTask } from '../tasksList-actions';
import * as TasklistApis from '../../../api/tasksList';
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
      .resolves({ result: [] });

    await setTask(proposalId, mockTaskData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'LOADING_TASKS',
      payload: false
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'ADD_TASK',
      payload: []
    });
  });
});
