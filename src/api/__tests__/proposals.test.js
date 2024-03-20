import { axiosInstance } from '../../store';
import {
  onGetAllProposals,
  onGetByStatus,
  saveRecentOppActivity,
  onGetFilterValues,
  onGetSFNonEditabelField,
  getFavoritesOpportunity,
  getAssignedOpportunity,
  getRecentOpportunity
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
    const payload = 'success';
    const userEmail = 'varsha.kumari2@iqvia.com';
    sandbox.stub(axiosInstance, 'post').resolves(response);
    const result = await onGetAllProposals(payload, userEmail);
    expect(result).toEqual(response);
  });

  test('onGetByStatus', async () => {
    const response = {
      data: 'success'
    };
    sandbox.stub(axiosInstance, 'post').resolves(response);
    const result = await onGetByStatus();
    expect(result).toEqual(response);
  });

  test('saveRecentOppActivity', async () => {
    const response = {
      data: 'success'
    };
    sandbox.stub(axiosInstance, 'post').resolves(response);
    const result = await saveRecentOppActivity();
    expect(result).toEqual(response);
  });

  test('onGetFilterValues', async () => {
    const response = {
      data: 'success'
    };
    sandbox.stub(axiosInstance, 'get').resolves(response);
    const result = await onGetFilterValues();
    expect(result).toEqual(response);
  });

  test('onGetSFNonEditabelField', async () => {
    const response = {
      data: 'success'
    };
    sandbox.stub(axiosInstance, 'get').resolves(response);
    const result = await onGetSFNonEditabelField();
    expect(result).toEqual(response);
  });

  test('getFavoritesOpportunity', async () => {
    const response = {
      data: 'success'
    };
    const payload = 'success';
    const userEmail = 'varsha.kumari2@iqvia.com';
    sandbox.stub(axiosInstance, 'post').resolves(response);
    const result = await getFavoritesOpportunity(payload, userEmail);
    expect(result).toEqual(response);
  });

  test('getAssignedOpportunity', async () => {
    const response = {
      data: 'success'
    };
    const payload = 'success';
    const status = 'success';
    const userEmail = 'varsha.kumari2@iqvia.com';
    sandbox.stub(axiosInstance, 'post').resolves(response);
    const result = await getAssignedOpportunity(payload, status, userEmail);
    expect(result).toEqual(response);
  });

  test('getRecentOpportunity', async () => {
    const response = {
      data: 'success'
    };
    const payload = 'success';
    const status = 'success';
    const userEmail = 'varsha.kumari2@iqvia.com';
    sandbox.stub(axiosInstance, 'post').resolves(response);
    const result = await getRecentOpportunity(payload, status, userEmail);
    expect(result).toEqual(response);
  });
});
