import Sinon from 'sinon';
import { axiosInstance } from '../../store';
import { getUsersListApiCall } from '../proposal';

describe('proposal api functions', () => {
  const sandbox = Sinon.createSandbox();

  beforeEach(() => {
    sandbox.restore();
  });

  afterAll(() => {
    sandbox.restore();
  });

  test('getUsersListApiCall should send userslist on success', () => {
    sandbox.stub(axiosInstance, 'get').resolves({
      data: []
    });
    expect(getUsersListApiCall()).resolves.toStrictEqual([]);
  });

  test('getUsersListApiCall should throw error on failure', () => {
    sandbox.stub(axiosInstance, 'get').rejects(['Unauthorized access']);
    expect(() => getUsersListApiCall()).rejects.toStrictEqual([
      'Unauthorized access'
    ]);
  });
});
