import axios from 'axios';
import { trackEventApi } from '../analytics';
import { ANALYTICS_URL } from '../../constants/api';

jest.mock('axios');

describe('analytics.js tests', () => {
  test('trackEventApi should make a POST request to ANALYTICS_URL with the provided data', async () => {
    const data = { event: 'click', category: 'button' };
    const response = { status: 200, data: { success: true } };

    axios.post.mockResolvedValue(response);

    const result = await trackEventApi(data);

    expect(axios.post).toHaveBeenCalledWith(ANALYTICS_URL, data);
    expect(result).toEqual(response);
  });

  test('trackEventApi should reject with an error if the POST request fails', async () => {
    const data = { event: 'click', category: 'button' };
    const error = new Error('Request failed');

    axios.post.mockRejectedValue(error);

    await expect(trackEventApi(data)).rejects.toThrow(error);
  });
});
