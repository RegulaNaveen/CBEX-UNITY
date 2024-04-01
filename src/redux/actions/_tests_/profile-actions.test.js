import {
  updateUserPreference,
  updateUserTimezone,
  fetchTimezone,
  fetchUserPreference
} from '../profile-actions';
import { REDUX_TYPES } from '../../../constants';
import * as profile from '../../../api/profile';

describe('profile-actions.js tests', () => {
  test('updateUserPreference dispatches UPDATE_USER_PREFERENCE and UPDATE_USER_PREFERENCE_DONE actions on success', async () => {
    const mockDispatch = jest.fn();
    const preferenceID = 'preferenceID';
    const preferenceSelected = 'preferenceSelected';
    const data = { data: 'updated preference' };

    const updateUserPreferenceSpy = jest
      .spyOn(profile, 'updateUserPreferenceApi')
      .mockResolvedValueOnce({ data });

    await updateUserPreference(preferenceID, preferenceSelected)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: REDUX_TYPES.PROFILE.UPDATE_USER_PREFERENCE
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: REDUX_TYPES.PROFILE.UPDATE_USER_PREFERENCE_DONE,
      payload: { data }
    });
    updateUserPreferenceSpy.mockRestore();
  });

  test('updateUserPreference dispatches UPDATE_USER_PREFERENCE and ERROR_UPDATING_USER_PREFERENCE actions on error', async () => {
    const mockDispatch = jest.fn();
    const preferenceID = 'preferenceID';
    const preferenceSelected = 'preferenceSelected';
    const data = { data: 'updated preference' };
    const mockError = new Error('test error');

    const updateUserPreferenceSpy = jest
      .spyOn(profile, 'updateUserPreferenceApi')
      .mockRejectedValueOnce(mockError);

    try {
      await updateUserPreference(
        preferenceID,
        preferenceSelected
      )(mockDispatch);
    } catch (err) {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: REDUX_TYPES.PROFILE.UPDATE_USER_PREFERENCE
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: REDUX_TYPES.PROFILE.ERROR_UPDATING_USER_PREFERENCE,
        payload: { data: mockError }
      });
    }

    updateUserPreferenceSpy.mockRestore();
  });

  test('updateUserTimezone dispatches UPDATE_USER_PREFERENCE and UPDATE_USER_PREFERENCE_DONE actions on success', async () => {
    const mockDispatch = jest.fn();
    const timezoneID = 'timezoneID';
    const data = { data: 'updated preference' };

    const updateUserTimezoneSpy = jest
      .spyOn(profile, 'updateUserTimezoneApi')
      .mockResolvedValueOnce({ data });

    await updateUserTimezone(timezoneID)(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: REDUX_TYPES.PROFILE.UPDATE_USER_TIMEZONE
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: REDUX_TYPES.PROFILE.UPDATE_USER_TIMEZONE_DONE,
      payload: { data }
    });

    updateUserTimezoneSpy.mockRestore();
  });

  test('updateUserTimezone dispatches UPDATE_USER_PREFERENCE and ERROR_UPDATING_USER_PREFERENCE actions on error', async () => {
    const mockDispatch = jest.fn();
    const timezoneID = 'timezoneID';
    const mockError = new Error('test error');

    const updateUserTimezoneSpy = jest
      .spyOn(profile, 'updateUserTimezoneApi')
      .mockRejectedValueOnce(mockError);

    try {
      await updateUserTimezone(timezoneID)(mockDispatch);
    } catch (err) {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: REDUX_TYPES.PROFILE.UPDATE_USER_TIMEZONE
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: REDUX_TYPES.PROFILE.ERROR_UPDATING_USER_PREFERENCE,
        payload: { data: mockError }
      });
    }

    updateUserTimezoneSpy.mockRestore();
  });

  test('fetchTimezone dispatches UPDATE_USER_PREFERENCE and UPDATE_USER_PREFERENCE_DONE actions on success', async () => {
    const mockDispatch = jest.fn();
    const timezoneID = 'timezoneID';
    const data = { data: 'updated preference' };

    const fetchTimezoneSpy = jest
      .spyOn(profile, 'fetchTimezoneApi')
      .mockResolvedValueOnce({ data });

    await fetchTimezone()(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: REDUX_TYPES.PROFILE.FETCH_TIMEZONE
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: REDUX_TYPES.PROFILE.FETCH_TIMEZONE_DONE,
      payload: { data }
    });

    fetchTimezoneSpy.mockRestore();
  });

  test('fetchTimezone dispatches UPDATE_USER_PREFERENCE and ERROR_UPDATING_USER_PREFERENCE actions on error', async () => {
    const mockDispatch = jest.fn();
    const timezoneID = 'timezoneID';
    const mockError = new Error('test error');

    const fetchTimezoneSpy = jest
      .spyOn(profile, 'fetchTimezoneApi')
      .mockRejectedValueOnce(mockError);

    try {
      await fetchTimezone(timezoneID)(mockDispatch);
    } catch (err) {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: REDUX_TYPES.PROFILE.FETCH_TIMEZONE
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: REDUX_TYPES.PROFILE.ERROR_FETCHING_TIMEZONE,
        payload: { data: mockError }
      });
    }
    fetchTimezoneSpy.mockRestore();
  });

  test('fetchUserPreference dispatches UPDATE_USER_PREFERENCE and UPDATE_USER_PREFERENCE_DONE actions on success', async () => {
    const mockDispatch = jest.fn();

    const data = { data: 'updated preference' };

    const fetchUserPreferenceSpy = jest
      .spyOn(profile, 'fetchUserPreferenceApi')
      .mockResolvedValueOnce({ data });

    await fetchUserPreference()(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: REDUX_TYPES.PROFILE.FETCH_USER_PREFERENCE
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: REDUX_TYPES.PROFILE.FETCH_USER_PREFERENCE_DONE,
      payload: { data }
    });

    fetchUserPreferenceSpy.mockRestore();
  });

  test('fetchUserPreference dispatches UPDATE_USER_PREFERENCE and ERROR_UPDATING_USER_PREFERENCE actions on error', async () => {
    const mockDispatch = jest.fn();
    const mockError = new Error('test error');

    const fetchUserPreferenceSpy = jest
      .spyOn(profile, 'fetchUserPreferenceApi')
      .mockRejectedValueOnce(mockError);

    try {
      await fetchUserPreference()(mockDispatch);
    } catch (err) {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: REDUX_TYPES.PROFILE.FETCH_USER_PREFERENCE
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: REDUX_TYPES.PROFILE.ERROR_FETCHING_USER_PREFERENCE,
        payload: { data: mockError }
      });
    }
    fetchUserPreferenceSpy.mockRestore();
  });
});
