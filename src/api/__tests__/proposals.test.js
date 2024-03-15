import { axiosInstance } from '../../store';
import {
  onGetAllProposals,
  onGetByStatus,
  saveRecentOppActivity,
  onGetFilterValues
} from '../proposals';
import sinon from 'sinon';

describe('proposals.js tests', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  test('onGetAllProposals', async () => {
    const response = {
      data: 'success'
    };
    sandbox.stub(axiosInstance, 'post').resolves(response);
    const result = await onGetAllProposals();
    expect(result).toEqual(response.data);
  });

  test('onGetByStatus', async () => {
    const response = {
      data: 'success'
    };
    sandbox.stub(axiosInstance, 'post').resolves(response);
    const result = await onGetByStatus();
    expect(result).toEqual(response.data);
  });

  test('saveRecentOppActivity', async () => {
    const response = {
      data: 'success'
    };
    sandbox.stub(axiosInstance, 'post').resolves(response);
    const result = await saveRecentOppActivity();
    expect(result).toEqual(response.data);
  });

  test.only('onGetFilterValues', async () => {
    const response = {
      data: 'success'
    };
    sandbox.stub(axiosInstance, 'get').resolves(response);
    const result = await onGetFilterValues();
    expect(result).toEqual(response);
  });
});
