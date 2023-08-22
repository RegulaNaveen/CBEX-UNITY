import { REDUX_TYPES } from '../../constants';
import {
  fetchUserPreferenceApi,
  fetchTimezoneApi,
  updateUserPreferenceApi,
  updateUserTimezoneApi
} from '../../api/profile';

const {
  FETCH_USER_PREFERENCE,
  FETCH_USER_PREFERENCE_DONE,
  FETCH_TIMEZONE,
  FETCH_TIMEZONE_DONE,
  UPDATE_USER_PREFERENCE,
  UPDATE_USER_PREFERENCE_DONE,
  UPDATE_USER_TIMEZONE,
  UPDATE_USER_TIMEZONE_DONE,
  ERROR_FETCHING_USER_PREFERENCE,
  ERROR_UPDATING_USER_PREFERENCE,
  ERROR_FETCHING_TIMEZONE,
  ERROR_UPDATING_USER_TIMEZONE
} = REDUX_TYPES.PROFILE;

export function fetchUserPreference() {
  return async dispatch => {
    try {
      dispatch({ type: FETCH_USER_PREFERENCE });
      const data = await fetchUserPreferenceApi();
      dispatch({
        type: FETCH_USER_PREFERENCE_DONE,
        payload: { data: data.data }
      });
    } catch (err) {
      dispatch({
        type: ERROR_FETCHING_USER_PREFERENCE,
        payload: { data: err }
      });
    }
  };
}

export function fetchTimezone() {
  return async dispatch => {
    try {
      dispatch({ type: FETCH_TIMEZONE });
      const data = await fetchTimezoneApi();
      dispatch({
        type: FETCH_TIMEZONE_DONE,
        payload: { data: data.data }
      });
    } catch (err) {
      dispatch({
        type: ERROR_FETCHING_TIMEZONE,
        payload: { data: err }
      });
    }
  };
}

export function updateUserPreference(preferenceID, preferenceSelected) {
  return async dispatch => {
    try {
      dispatch({ type: UPDATE_USER_PREFERENCE });
      const data = await updateUserPreferenceApi(
        preferenceID,
        preferenceSelected
      );
      dispatch({
        type: UPDATE_USER_PREFERENCE_DONE,
        payload: { data: data.data }
      });
    } catch (err) {
      dispatch({
        type: ERROR_UPDATING_USER_PREFERENCE,
        payload: { data: err }
      });
    }
  };
}

export function updateUserTimezone(timezoneID) {
  return async dispatch => {
    try {
      dispatch({ type: UPDATE_USER_TIMEZONE });
      const data = await updateUserTimezoneApi(timezoneID);
      dispatch({
        type: UPDATE_USER_TIMEZONE_DONE,
        payload: { data: data.data }
      });
    } catch (err) {
      dispatch({
        type: ERROR_UPDATING_USER_TIMEZONE,
        payload: { data: err }
      });
    }
  };
}
