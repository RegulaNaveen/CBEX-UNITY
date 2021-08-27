// @flow
import jwtDecode from 'jwt-decode';
import type { Dispatch, ThunkAction } from './action-types';
import { onLoginRequest, onChangeUserRole, getUsers } from '../../api/sso-auth';
import { REDUX_TYPES } from '../../constants';

const {
  ON_USER_LOGIN,
  ON_USER_LOGOUT,
  ERROR_ON_USER_LOGIN,
  ON_CHANGE_ROLE,
  ERROR_ON_CHANGE_ROLE,
  ON_REFRESH_USER_DATA,
  ON_GET_LOOKUP_USERS,
  ERROR_ON_GET_LOOKUP_USERS,
  DEFAULT_ROLE
} = REDUX_TYPES.SSO_AUTH;

export const loginUser = (code: string): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    try {
      const { data } = await onLoginRequest(code);
      if (data) {
        const { access_token: accessToken, id_token: idToken } = data;
        const userInfo = jwtDecode(idToken);
        const role = userInfo['custom:role'];
        if (role === undefined) {
          try {
            await onChangeUserRole(accessToken, idToken, DEFAULT_ROLE);
            dispatch({ type: ON_CHANGE_ROLE, payload: { role: DEFAULT_ROLE } });
          } catch (error) {
            dispatch({ type: ERROR_ON_CHANGE_ROLE, payload: { error } });
          }
        }
        dispatch({ type: ON_USER_LOGIN, payload: { data } });
      }
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

export const getAllUsers = (): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<Object, Object>) => {
    const idToken = localStorage.getItem('id_token') || '';

    try {
      const { data } = await getUsers(idToken);

      if (data) {
        const { authService } = data;

        dispatch({
          type: ON_GET_LOOKUP_USERS,
          payload: { lookupUsers: authService }
        });
      }
    } catch (error) {
      dispatch({ type: ERROR_ON_GET_LOOKUP_USERS, payload: { error } });
    }
  };
};
