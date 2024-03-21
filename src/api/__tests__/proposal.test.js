import Sinon from 'sinon';
import { axiosInstance } from '../../store';
import {
  getUsersListApiCall,
  priceModelerApi,
  deleteProposalUser,
  changeProposalOT,
  getData,
  getOTListData,
  getPickListLookupSfData,
  getPaginateProposal,
  getAllProposals,
  getOpportunityInfo,
  deleteProposalQuestionData,
  editProposalQuestionData,
  getValidatedProposalData,
  fetchOpportunityFolderLink,
  getProposlBoxId
} from '../proposal';

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

  test('priceModelerApi should send price modeler data on success', async () => {
    const proposalId = '123';
    const response = { data: 'success' };
    sandbox.stub(axiosInstance, 'get').resolves(response);
    const result = await priceModelerApi(proposalId);
    expect(result).toEqual(response);
  });

  test('deleteProposalUser should send success message on success', async () => {
    const proposalId = '123';
    const data = 'success';
    const response = { data: 'success' };
    sandbox.stub(axiosInstance, 'delete').resolves(response);
    const result = await deleteProposalUser(proposalId, data);
    expect(result).toEqual(response);
  });

  test('changeProposalOT should send success message on success', async () => {
    const payload = '123';
    const response = { data: 'success' };
    sandbox.stub(axiosInstance, 'post').resolves(response);
    const result = await changeProposalOT(payload);
    expect(result).toEqual(response);
  });

  test('getData should send success message on success', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: 'success' })
      })
    );
    const result = await getData();
    expect(await result.json()).toEqual({ data: 'success' });
  });

  test('getData should send error message on failure', async () => {
    const error = new Error('Network error');
    global.fetch = jest.fn(() => Promise.reject(error));
    try {
      await getData();
    } catch (e) {
      expect(e).toEqual(error);
    }
  });

  test('getOTListData should send success message on success', async () => {
    const response = { data: 'success' };
    sandbox.stub(axiosInstance, 'get').resolves(response);
    const result = await getOTListData();
    expect(result).toEqual(response);
  });

  test('getPickListLookupSfData should send success message on success', async () => {
    const response = { data: 'success' };
    sandbox.stub(axiosInstance, 'get').resolves(response);
    const result = await getPickListLookupSfData();
    expect(result).toEqual(response);
  });

  test('getPaginateProposal sends requests and returns data on success', async () => {
    const urls = ['url1', 'url2', 'url3'];
    const mockResponses = [
      { data: 'success1' },
      { data: 'success2' },
      { data: 'success3' }
    ];

    const promiseAllStub = Sinon.stub(Promise, 'all');
    promiseAllStub.resolves(mockResponses);

    const result = await getPaginateProposal(urls);

    expect(promiseAllStub.calledOnceWith(urls)).toBe(true);
    expect(result).toEqual(mockResponses);

    promiseAllStub.restore();
  });
  test('getPaginateProposal throws error on failure', async () => {
    const urls = ['url1', 'url2', 'url3'];
    const error = new Error('Network error');

    const promiseAllStub = Sinon.stub(Promise, 'all');
    promiseAllStub.rejects(error);

    try {
      await getPaginateProposal(urls);
    } catch (e) {
      expect(e).toEqual(error);
    }

    expect(promiseAllStub.calledOnceWith(urls)).toBe(true);

    promiseAllStub.restore();
  });

  test('getAllProposals ', () => {
    sandbox.stub(axiosInstance, 'get').resolves({
      data: []
    });
    expect(getAllProposals()).resolves.toStrictEqual([]);
  });

  test('getAllProposals should throw error on failure', () => {
    sandbox.stub(axiosInstance, 'get').rejects(['Unauthorized access']);
    expect(() => getAllProposals()).rejects.toStrictEqual([
      'Unauthorized access'
    ]);
  });

  test('getOpportunityInfo', () => {
    sandbox.stub(axiosInstance, 'get').resolves({
      data: []
    });
    expect(getOpportunityInfo()).resolves.toStrictEqual([]);
  });

  test('getOpportunityInfo should throw error on failure', () => {
    sandbox.stub(axiosInstance, 'get').rejects(['Unauthorized access']);
    expect(() => getOpportunityInfo()).rejects.toStrictEqual([
      'Unauthorized access'
    ]);
  });

  test('deleteProposalQuestionData ', () => {
    sandbox.stub(axiosInstance, 'delete').resolves({
      data: []
    });
    expect(deleteProposalQuestionData()).resolves.toStrictEqual([]);
  });

  test('deleteProposalQuestionData should throw error on failure', () => {
    sandbox.stub(axiosInstance, 'delete').rejects(['Unauthorized access']);
    expect(() => deleteProposalQuestionData()).rejects.toStrictEqual([
      'Unauthorized access'
    ]);
  });

  test('editProposalQuestionData should send success message on success', async () => {
    const response = {
      data: {
        proposalId: '124',
        questionId: '8959b856-0f49-4c4e-8ec8-f5955320866a',
        questionData: 'data'
      }
    };
    const proposalId = '124';
    const questionId = '8959b856-0f49-4c4e-8ec8-f5955320866a';
    const questionData = 'data';
    sandbox.stub(axiosInstance, 'put').resolves(response);
    const result = await editProposalQuestionData(
      proposalId,
      questionId,
      questionData
    );
    expect(result).toEqual(response.data);
  });

  test('editProposalQuestionData should throw error on failure', async () => {
    const error = new Error('Network error');
    const proposalId = '124';
    const questionId = '8959b856-0f49-4c4e-8ec8-f5955320866a';
    const questionData = 'data';

    sandbox.stub(axiosInstance, 'put').rejects(error);

    try {
      await editProposalQuestionData(proposalId, questionId, questionData);
    } catch (e) {
      expect(e).toEqual(error);
    }
  });

  test('getValidatedProposalData', async () => {
    const response = {
      data: {
        id: '124'
      }
    };
    const id = '124';
    sandbox.stub(axiosInstance, 'get').resolves(response);
    const result = await getValidatedProposalData(id);
    expect(result).toEqual(response);
  });

  test('fetchOpportunityFolderLink', async () => {
    const response = {
      data: {
        oppID: '123'
      }
    };
    const oppID = '123';
    sandbox.stub(axiosInstance, 'get').resolves(response);
    const result = await fetchOpportunityFolderLink(oppID);
    expect(result).toEqual(response);
  });

  test('getProposlBoxId', async () => {
    const response = {
      data: {
        id: '123'
      }
    };
    const id = '123';
    sandbox.stub(axiosInstance, 'get').resolves(response);
    const result = await getProposlBoxId(id);
    expect(result).toEqual(response);
  });
});
