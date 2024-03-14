import Sinon from 'sinon';
import { axiosInstance } from '../../store';
import {
  fetchTasksListApi,
  setTaskDataApi,
  editTaskDataApi,
  updateTaskDescApi,
  deleteTaskApi,
  updateTaskListApi,
  getTaskHistoryApi,
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

  test('updateTaskListApi should update task list', async () => {
    const response = {
      proposal_id: 'TEST_PROPOSAL_ID',
      task_id: 'TEST_TASK_ID',
      task_list: []
    };
    sandbox.stub(axiosInstance, 'put').resolves({ data: response });
    await expect(
      updateTaskListApi('TEST_PROPOSAL_ID', 'TEST_TASK_ID', [])
    ).resolves.toStrictEqual(response);
  });

  test('updateTaskListApi should handle API failure', async () => {
    const error = new Error('API request failed');
    sandbox.stub(axiosInstance, 'put').rejects(error);
    await expect(
      updateTaskListApi('TEST_PROPOSAL_ID', 'TEST_TASK_ID', [])
    ).rejects.toEqual(error);
  });

  test('getTaskHistoryApi should get task history', async () => {
    const response = {
      data: {
        proposal_id: 'TEST_PROPOSAL_ID',
        task_id: 'TEST_TASK_ID'
      }
    };
    sandbox.stub(axiosInstance, 'get').resolves({ data: response });
    await expect(
      getTaskHistoryApi('TEST_PROPOSAL_ID', 'TEST_TASK_ID')
    ).resolves.toStrictEqual(response);
  });

  test('getTaskHistoryApi should handle API failure', async () => {
    const error = new Error('API request failed');
    sandbox.stub(axiosInstance, 'get').rejects(error);
    await expect(
      getTaskHistoryApi('TEST_PROPOSAL_ID', 'TEST_TASK_ID')
    ).rejects.toEqual(error);
  });

  test('setTaskDataApi should add data', () => {
    const response = {
      data: {
        proposal_id: 'TEST_PROPOSAL_ID',
        task_id: 'TEST_TASK_ID'
      }
    };
    sandbox.stub(axiosInstance, 'post').resolves({ data: response });
    expect(setTaskDataApi('TEST_PROPOSAL_ID', {})).resolves.toStrictEqual(
      response
    );
  });

  test('setTaskDataApi should handle API failure', async () => {
    const error = new Error('API request failed');
    sandbox.stub(axiosInstance, 'post').rejects(error);
    await expect(setTaskDataApi('TEST_PROPOSAL_ID', {})).rejects.toEqual(error);
  });

  test('editTaskDataApi should edit data', () => {
    const response = {
      data: {
        proposal_id: 'TEST_PROPOSAL_ID',
        task_id: 'TEST_TASK_ID',
        taskData: {}
      }
    };
    sandbox.stub(axiosInstance, 'put').resolves({ data: response });
    expect(
      editTaskDataApi('TEST_PROPOSAL_ID', 'TEST_TASK_ID', {})
    ).resolves.toStrictEqual(response);
  });

  test('editTaskDataApi should handle API failure', async () => {
    const error = new Error('API request failed');
    sandbox.stub(axiosInstance, 'put').rejects(error);
    await expect(
      editTaskDataApi('TEST_PROPOSAL_ID', 'TEST_TASK_ID', {})
    ).rejects.toEqual(error);
  });
});
