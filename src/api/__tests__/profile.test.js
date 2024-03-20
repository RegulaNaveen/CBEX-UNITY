import { axiosInstance } from '../../store';
import {
  updateUserPreferenceApi,
  fetchUserPreferenceApi,
  fetchTimezoneApi,
  updateUserTimezoneApi
} from '../profile';
import sinon from 'sinon';

describe('profile.js tests', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  test('fetchUserPreferenceApi', async () => {
    const response = {
      data: 'success'
    };
    sandbox.stub(axiosInstance, 'get').resolves(response);
    const result = await fetchUserPreferenceApi();
    expect(result).toEqual(response.data);
  });

  test('fetchTimezoneApi', async () => {
    const response = {
      data: 'success'
    };
    sandbox.stub(axiosInstance, 'get').resolves(response);
    const result = await fetchTimezoneApi();
    expect(result).toEqual(response.data);
  });

  test('updateUserTimezoneApi', async () => {
    const response = {
      data: { time_zone_id: 'TIME ZONE ID' }
    };
    sandbox.stub(axiosInstance, 'post').resolves(response);
    const result = await updateUserTimezoneApi('TIME ZONE ID');
    expect(result).toEqual(response.data);
  });

  test('updateUserPreferenceApi', async () => {
    const response = {
      data: {
        preferenceID: 'PREFERENCE ID',
        preferenceSelected: 'PREFERENCE SELECTED'
      }
    };
    sandbox.stub(axiosInstance, 'put').resolves(response);
    const result = await updateUserPreferenceApi(
      'PREFERENCE ID',
      'PREFERENCE SELECTED'
    );
    expect(result).toEqual(response.data);
  });
});
