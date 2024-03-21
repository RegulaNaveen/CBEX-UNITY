import { CancelableADRequestApi } from '../getADUsers';
// import axios from 'axios';
import { axiosInstance } from '../../store';
import fetchUsers from '../getADUsers';

jest.mock('../../store', () => ({
  // replace with the actual path to your axios instance module
  axiosInstance: {
    get: jest.fn().mockResolvedValue({
      data: {
        data: [{ first_name: 'John', last_name: 'Doe' }]
      }
    })
  }
}));

jest.mock('../../SessionHandler', () => ({
  getAccessTokenFromLocalStorage: jest.fn().mockReturnValue('mock-access-token')
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        data: [
          { first_name: 'John', last_name: 'Doe' },
          { first_name: 'Jane', last_name: 'Smith' }
        ]
      })
  })
);

describe('getUsersByQuery', () => {
  let axiosInstanceMock;

  beforeEach(() => {
    axiosInstanceMock = axiosInstance;
    fetch.mockClear();
  });

  afterEach(() => {
    CancelableADRequestApi.cancel = null;
  });

  test('should return an empty array if query is not a string or is empty', () => {
    const result = CancelableADRequestApi.getUsersByQuery();
    expect(result).toEqual([]);
  });

  test('should cancel previous request if cancel function exists', () => {
    const cancelMock = jest.fn();
    CancelableADRequestApi.cancel = cancelMock;

    CancelableADRequestApi.getUsersByQuery('test');

    expect(cancelMock).toHaveBeenCalled();
  });

  test('should make a GET request to the correct URL with the correct headers', () => {
    const query = 'test';

    CancelableADRequestApi.getUsersByQuery(query);

    expect(axiosInstanceMock.get).toHaveBeenCalledWith(
      expect.stringContaining(query),
      expect.objectContaining({
        headers: {
          'x-api-key': expect.any(String),
          'x-access-token': expect.any(String)
        }
      })
    );
  });

  test('should return an array of users sorted by firstname and lastname', async () => {
    const query = 'J';

    const result = await CancelableADRequestApi.getUsersByQuery(query);

    expect(result).toEqual([{ first_name: 'John', last_name: 'Doe' }]);
  });

  test.skip('should return an empty array if an error occurs', async () => {
    const query = 'test';

    const result = await CancelableADRequestApi.getUsersByQuery(query);

    expect(result).toEqual([]);
  });

  it('should return an empty array if the query length is less than 1', async () => {
    const result = await fetchUsers('');
    expect(result).toEqual([]);
  });

  it('should return an array of users sorted by firstname and lastname based on query', async () => {
    const result = await fetchUsers('J');
    expect(result).toEqual([
      { first_name: 'John', last_name: 'Doe' },
      { first_name: 'Jane', last_name: 'Smith' }
    ]);
  });

  it('should return an empty array if the response data is not an array', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: 'not an array' })
      })
    );

    const result = await fetchUsers('J');
    expect(result).toEqual([]);
  });

  it('should return an empty array if there is an error', async () => {
    global.fetch = jest.fn(() => Promise.reject('API is down'));

    const result = await fetchUsers('J');
    expect(result).toEqual([]);
  });
});
