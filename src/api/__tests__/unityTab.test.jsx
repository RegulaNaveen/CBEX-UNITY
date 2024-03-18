import Sinon from 'sinon';
import { axiosInstance } from '../../store';
import {
  setUnityQuestionData,
  editUnityQuestionData,
  deleteUnityQuestionData
} from '../unityTab';

describe('unity api functions', () => {
  const sandbox = Sinon.createSandbox();

  beforeEach(() => {
    sandbox.restore();
  });

  afterAll(() => {
    sandbox.restore();
  });

  test('setUnityQuestionData should send data', () => {
    sandbox.stub(axiosInstance, 'post').resolves({
      data: []
    });
    expect(setUnityQuestionData()).resolves.toStrictEqual([]);
  });

  test('setUnityQuestionData should throw error on failure', () => {
    sandbox.stub(axiosInstance, 'post').rejects(['Unauthorized access']);
    expect(() => setUnityQuestionData()).rejects.toStrictEqual([
      'Unauthorized access'
    ]);
  });

  test('editUnityQuestionData should send data', () => {
    sandbox.stub(axiosInstance, 'put').resolves({
      data: []
    });
    expect(editUnityQuestionData()).resolves.toStrictEqual([]);
  });

  test('editUnityQuestionData should throw error on failure', async () => {
    sandbox.stub(axiosInstance, 'put').rejects(['Unauthorized access']);
    await expect(() => editUnityQuestionData()).rejects.toStrictEqual([
      'Unauthorized access'
    ]);
  });

  test('deleteUnityQuestionData should send data', () => {
    const response = {
      data: {
        proposal_id: 'TEST_PROPOSAL_ID'
      }
    };
    sandbox.stub(axiosInstance, 'post').resolves(response);
    expect(deleteUnityQuestionData('TEST_PROPOSAL_ID')).resolves.toStrictEqual(
      response.data
    );
  });

  test('deleteUnityQuestionData should throw error on failure', async () => {
    sandbox.stub(axiosInstance, 'post').rejects(['Unauthorized access']);
    await expect(() =>
      deleteUnityQuestionData('TEST_PROPOSAL_ID')
    ).rejects.toStrictEqual(['Unauthorized access']);
  });
});
