import Sinon from 'sinon';
import { axiosInstance } from '../../store';
import {
  fetchTasksListApi,
  setTaskDataApi,
  editTaskDataApi,
  updateTaskDescApi,
  deleteTaskApi,
  updateTaskListApi,
  tasksListReorderingApi,
  tasksListMoveApi
} from '../tasksList';

describe('tasksList api functions', () => {
  const sandbox = Sinon.createSandbox();

  beforeEach(() => {
    sandbox.restore();
  });

  afterAll(() => {
    sandbox.restore();
  });

  test('getTasksListData should send data', () => {
    sandbox.stub(axiosInstance, 'get').resolves({
      data: []
    });
    expect(fetchTasksListApi()).resolves.toStrictEqual([]);
  });

  test('getTasksListData should throw error on failure', () => {
    sandbox.stub(axiosInstance, 'get').rejects(['Unauthorized access']);
    expect(() => fetchTasksListApi()).rejects.toStrictEqual([
      'Unauthorized access'
    ]);
  });

  test('setTasksData should add data', () => {
    sandbox.stub(axiosInstance, 'post').resolves({
      data: []
    });
    expect(setTaskDataApi()).resolves.toStrictEqual([]);
  });
  test('editTasksData should edit data', () => {
    sandbox.stub(axiosInstance, 'post').resolves({
      data: []
    });
    expect(editTaskDataApi()).resolves.toStrictEqual([]);
  });

  test('updateTaskListApi api task', async () => {
    const response = {
      data: {
        description: 'new task',
        proposal_id: 'TEST_PROPOSAL_ID',
        task_id: 'TEST_TASK_ID'
      }
    };
    sandbox.stub(axiosInstance, 'put').resolves(response);
    const results = await updateTaskListApi(
      'TEST_PROPOSAL_ID',
      'TEST_TASK_ID',
      {}
    );
    expect(results).toEqual(response.data);
  });

  test('tasksListReorderingApi should update description of a task', async () => {
    const response = {
      data: {
        description: 'new task',
        proposal_id: 'TEST_PROPOSAL_ID',
        task_id: 'TEST_TASK_ID'
      }
    };
    sandbox.stub(axiosInstance, 'put').resolves(response);
    const result = await tasksListReorderingApi(
      'TEST_PROPOSAL_ID',
      ['TEST_TASK_ID'],
      'TEST_TASK_ID'
    );
    expect(result).toEqual(response.data);
  });
  test('tasksListMoveApi should update description of a task', async () => {
    const response = {
      data: {
        description: 'new task',
        proposal_id: 'TEST_PROPOSAL_ID',
        task_id: 'TEST_TASK_ID'
      }
    };
    sandbox.stub(axiosInstance, 'put').resolves(response);
    const result = await tasksListMoveApi(
      'TEST_PROPOSAL_ID',
      ['TEST_TASK_ID'],
      'TEST_TASK_ID'
    );
    expect(result).toEqual(response.data);
  });

  test('updateTaskDescApi should update description of a task', async () => {
    const response = {
      data: {
        description: 'new task',
        proposal_id: 'TEST_PROPOSAL_ID',
        task_id: 'TEST_TASK_ID'
      }
    };
    sandbox.stub(axiosInstance, 'put').resolves(response);
    expect(
      updateTaskDescApi('TEST_PROPOSAL_ID', 'TEST_TASK_ID', 'new task')
    ).resolves.toStrictEqual(response);
  });

  test('updateTaskDescApi should throw error on failure', async () => {
    sandbox.stub(axiosInstance, 'put').rejects(['Unauthorized access']);
    expect(
      updateTaskDescApi('TEST_PROPOSAL_ID', 'TEST_TASK_ID', 'new task')
    ).rejects.toStrictEqual(['Unauthorized access']);
  });

  test('deleteTaskApi should throw error on failure', async () => {
    sandbox.stub(axiosInstance, 'put').rejects(['Unauthorized access']);
    expect(
      deleteTaskApi('TEST_PROPOSAL_ID', 'TEST_TASK_ID', 'new task')
    ).rejects.toStrictEqual(['Unauthorized access']);
  });

  test('deleteTaskApi should delete a task', async () => {
    const response = {
      data: {
        description: 'new task',
        proposal_id: 'TEST_PROPOSAL_ID',
        task_id: 'TEST_TASK_ID',
        is_deleted: true
      }
    };
    sandbox.stub(axiosInstance, 'put').resolves(response);
    expect(
      deleteTaskApi('TEST_PROPOSAL_ID', 'TEST_TASK_ID', 'new task')
    ).resolves.toStrictEqual(response);
  });
});
