import {
  updateMentions,
  updateNoteApi,
  addNoteApi,
  websocketNotesApi,
  getWebsocketNotesApi,
  fetchNotesApi
} from '../notepad';
import { axiosInstance } from '../../store';

jest.mock('../../store', () => ({
  axiosInstance: {
    put: jest.fn(),
    post: jest.fn(),
    get: jest.fn()
  }
}));

describe('notepad', () => {
  test('should resolve with the response data when the API call is successful', () => {
    // Mock the necessary dependencies and setup any required test data
    axiosInstance.put.mockImplementationOnce(() =>
      Promise.resolve({ data: 'success' })
    );

    const proposalID = '123';
    const email = 'test@example.com';
    const emp_id = '456';

    // Call the updateMentions function with the test data
    const result = updateMentions(proposalID, email, emp_id);

    // Assert that the function resolves with the expected response data
    return expect(result).resolves.toBe('success');
  });

  test('should reject with an error when the API call fails', () => {
    // Mock the necessary dependencies and setup any required test data
    const proposalID = '123';
    const email = 'test@example.com';
    const emp_id = '456';

    // Mock the axiosInstance and configure it to throw an error
    const mockError = new Error('API call failed');
    axiosInstance.put.mockImplementationOnce(() => Promise.reject(mockError));

    // Call the updateMentions function with the test data and mocked dependencies
    const result = updateMentions(proposalID, email, emp_id, axiosInstance);

    // Assert that the function rejects with the expected error
    return expect(result).rejects.toThrow(mockError);
  });

  test('updateNoteApi should resolve with the response data when the API call is successful', () => {
    axiosInstance.post.mockImplementationOnce(() =>
      Promise.resolve({ data: 'success' })
    );

    const proposalID = '123';
    const note = 'test note';

    const result = updateNoteApi(proposalID, note);
    return expect(result).resolves.toBe('success');
  });

  test('updateNoteApi should reject with an error when the API call fails', () => {
    const proposalID = '123';
    const note = 'test note';

    const mockError = new Error('API call failed');
    axiosInstance.post.mockImplementationOnce(() => Promise.reject(mockError));

    const result = updateNoteApi(proposalID, note);
    return expect(result).rejects.toThrow(mockError);
  });

  test('addNoteApi should resolve with the response data when the API call is successful', () => {
    axiosInstance.post.mockImplementationOnce(() =>
      Promise.resolve({ data: 'success' })
    );

    const proposalID = '123';
    const note = 'test note';
    const result = addNoteApi(proposalID, note);
    return expect(result).resolves.toBe('success');
  });

  test('addNoteApi should reject with an error when the API call fails', () => {
    const proposalID = '123';
    const note = 'test note';
    const mockError = new Error('API call failed');
    axiosInstance.post.mockImplementationOnce(() => Promise.reject(mockError));

    const result = addNoteApi(proposalID, note);
    return expect(result).rejects.toThrow(mockError);
  });

  test('websocketNotesApi should resolve with the response data when the API call is successful', () => {
    axiosInstance.put.mockImplementationOnce(() =>
      Promise.resolve({ data: 'success' })
    );

    const proposalID = '123';

    const result = websocketNotesApi(proposalID);
    return expect(result).resolves.toBe('success');
  });

  test('websocketNotesApi should reject with an error when the API call fails', () => {
    const proposalID = '123';
    const mockError = new Error('API call failed');
    axiosInstance.put.mockImplementationOnce(() => Promise.reject(mockError));

    const result = websocketNotesApi(proposalID);
    return expect(result).rejects.toThrow(mockError);
  });

  test('getWebsocketNotesApi should resolve with the response data when the API call is successful', () => {
    axiosInstance.get.mockImplementationOnce(() =>
      Promise.resolve({ data: 'success' })
    );

    const proposalID = '123';

    const result = getWebsocketNotesApi(proposalID);
    return expect(result).resolves.toBe('success');
  });

  test('getWebsocketNotesApi should reject with an error when the API call fails', () => {
    const proposalID = '123';
    const mockError = new Error('API call failed');
    axiosInstance.get.mockImplementationOnce(() => Promise.reject(mockError));

    const result = getWebsocketNotesApi(proposalID);
    return expect(result).rejects.toThrow(mockError);
  });

  test('fetchNotesApi should resolve with the response data when the API call is successful', () => {
    axiosInstance.get.mockImplementationOnce(() =>
      Promise.resolve({ data: 'success' })
    );

    const proposalID = '123';

    const result = fetchNotesApi(proposalID);
    return expect(result).resolves.toBe('success');
  });

  test('fetchNotesApi should reject with an error when the API call fails', () => {
    const proposalID = '123';
    const mockError = new Error('API call failed');
    axiosInstance.get.mockImplementationOnce(() => Promise.reject(mockError));

    const result = fetchNotesApi(proposalID);
    return expect(result).rejects.toThrow(mockError);
  });
});
