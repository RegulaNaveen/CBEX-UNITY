import Sinon from 'sinon';
import { axiosInstance } from '../../store';
import { fetchTasksListApi } from '../tasksList';

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
});
