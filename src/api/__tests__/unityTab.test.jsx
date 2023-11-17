import Sinon from 'sinon';
import { axiosInstance } from '../../store';
import { setUnityQuestionData,editUnityQuestionData,deleteUnityQuestionData } from '../unityTab';

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
  
});
