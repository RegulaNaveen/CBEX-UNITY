import axios from 'axios';
import {
  authentication,
  forgotPassword,
  getUsers,
  postRefreshToken,
  putRole,
  resetPassword
} from '../auth';
import { API } from '../../constants';

jest.mock('axios');
const { AUTH_API_URL } = API.AUTH;

describe('auth test', () => {
  it('should send a PUT request to the correct endpoint with the provided data', async () => {
    const role = 'admin';
    const accessToken = 'abc123';
    const jwt = 'jwt123';

    const expectedResponse = { success: true };

    axios.put.mockResolvedValueOnce({ data: expectedResponse });

    const response = await putRole(role, accessToken, jwt);

    expect(axios.put).toHaveBeenCalledWith(
      `${AUTH_API_URL}/changerole`,
      {
        role,
        accessToken
      },
      {
        headers: { Authorization: `Bearer ${jwt}` }
      }
    );
    expect(response).toEqual(expectedResponse);
  });

  it('should reject with an error message if the request fails', async () => {
    const role = 'admin';
    const accessToken = 'abc123';
    const jwt = 'jwt123';

    const expectedErrorMessage = 'Failed to change role';

    axios.put.mockRejectedValueOnce({
      response: { data: { message: expectedErrorMessage } }
    });

    try {
      await putRole(role, accessToken, jwt);
    } catch (error) {
      expect(error).toEqual(expectedErrorMessage);
    }
  });

  it('should send a POST request to the correct endpoint with the provided data for authentication', async () => {
    const email = 'test@example.com';
    const password = 'password123';

    const expectedResponse = { success: true };

    axios.post.mockResolvedValueOnce({ data: expectedResponse });

    const response = await authentication(email, password);

    expect(axios.post).toHaveBeenCalledWith(`${AUTH_API_URL}/login`, {
      email,
      password
    });
    expect(response).toEqual(expectedResponse);
  });

  it('should send a POST request to the correct endpoint with the provided data for forgotPassword', async () => {
    const email = 'test@example.com';

    const expectedResponse = { success: true };

    axios.post.mockResolvedValueOnce({ data: expectedResponse });

    const response = await forgotPassword(email);

    expect(axios.post).toHaveBeenCalledWith(`${AUTH_API_URL}/forgot-password`, {
      email
    });
    expect(response).toEqual(expectedResponse);
  });

  it('should send a POST request to the correct endpoint with the provided data for resetPassword', async () => {
    const email = 'test@example.com';
    const code = 'code123';
    const newPassword = 'newPassword123';

    const expectedResponse = { success: true };

    axios.post.mockResolvedValueOnce({ data: expectedResponse });

    const response = await resetPassword(email, code, newPassword);

    expect(axios.post).toHaveBeenCalledWith(`${AUTH_API_URL}/reset-password`, {
      email,
      code,
      newPassword
    });
    expect(response).toEqual(expectedResponse);
  });

  it('should send a POST request to the correct endpoint with the provided data for postRefreshToken', async () => {
    const email = 'test@example.com';
    const refreshToken = 'refreshToken123';

    const expectedResponse = { success: true };

    axios.post.mockResolvedValueOnce({ data: expectedResponse });

    const response = await postRefreshToken(email, refreshToken);

    expect(axios.post).toHaveBeenCalledWith(`${AUTH_API_URL}/refresh`, {
      email,
      refreshToken
    });
    expect(response).toEqual(expectedResponse);
  });

  it('should send a GET request to the correct endpoint with the provided data for getUsers', async () => {
    const jwt = 'jwt123';

    const expectedResponse = { success: true };

    axios.get.mockResolvedValueOnce({ data: expectedResponse });

    const response = await getUsers(jwt);

    expect(axios.get).toHaveBeenCalledWith(`${AUTH_API_URL}/users`, {
      headers: { Authorization: `Bearer ${jwt}` }
    });
    expect(response).toEqual({ data: expectedResponse });
  });
});
