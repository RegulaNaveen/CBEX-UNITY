// @flow
import type { Dispatch, ThunkAction } from './action-types';
import { onLoginRequest, onChangeUserRole } from '../api/sso-auth';
import { REDUX_TYPES } from '../constants';

const {
  ON_USER_LOGIN,
  ON_USER_LOGOUT,
  ERROR_ON_USER_LOGIN,
  ON_CHANGE_ROLE,
  ERROR_ON_CHANGE_ROLE,
  ON_REFRESH_USER_DATA
} = REDUX_TYPES.SSO_AUTH;

export const loginUser = (code: string): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    try {
      const { data } = await onLoginRequest(code);
      if (data) dispatch({ type: ON_USER_LOGIN, payload: { data } });
    } catch (error) {
      dispatch({ type: ERROR_ON_USER_LOGIN, payload: { error } });
    }
  };
};

export const onUserLogout = (): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({ type: ON_USER_LOGOUT, payload: {} });
  };
};

export const onRefreshUserData = (): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) =>
    dispatch({ type: ON_REFRESH_USER_DATA, payload: {} });
};

export const onSetUserRole = (role: string): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    const accessToken = localStorage.getItem('access_token');
    const idToken = localStorage.getItem('id_token');

    try {
      if (accessToken && idToken) {
        const { data } = await onChangeUserRole(accessToken, idToken, role);
        dispatch({ type: ON_CHANGE_ROLE, payload: { role: data.role } });
      }
    } catch (error) {
      dispatch({ type: ERROR_ON_CHANGE_ROLE, payload: { error } });
    }
  };
};
