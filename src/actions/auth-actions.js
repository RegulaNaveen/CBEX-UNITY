// @flow
import { REDUX_TYPES } from '../constants';
import type { Dispatch, ThunkAction } from './action-types';
import {
  setSession,
  getJwt,
  getAccessToken,
  getUserEmail,
  getRefreshToken
} from '../SessionHandler';
import {
  authentication,
  forgotPassword,
  putRole,
  postRefreshToken,
  resetPassword,
  getUsers
} from '../api/auth';

const {
  AUTH_SUCCESS,
  AUTH_LOADING,
  AUTH_ERROR,
  LOGOUT_IN_PROGRESS,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  PUT_ROLE_IN_PROGRESS,
  PUT_ROLE_SUCCESS,
  PUT_ROLE_ERROR,
  FORGOT_PASSWORD_IN_PROGRESS,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD_IN_PROGRESS,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  ON_GET_LOOKUP_USERS,
  ERROR_ON_GET_LOOKUP_USERS
} = REDUX_TYPES.AUTH;

export const login = (
  email: string,
  password: string
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({ type: AUTH_LOADING, payload: {} });

    try {
      const data = await authentication(email, password);
      const {
        authService: {
          role,
          accessToken,
          jwt: { token },
          refresh: { token: refreshToken }
        }
      } = data;

      dispatch({ type: AUTH_SUCCESS, payload: { data } });
      setSession(role, accessToken, token, refreshToken, email);
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: { error }
      });
    }
  };
};

export const sendForgotPassword = (
  email: string
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: FORGOT_PASSWORD_IN_PROGRESS,
      payload: {}
    });
    try {
      const data = await forgotPassword(email);
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: data.authService
      });
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_ERROR,
        payload: { error }
      });
    }
  };
};

export const sendResetPassword = (
  email: string,
  code: string,
  newPassword: string
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: RESET_PASSWORD_IN_PROGRESS,
      payload: {}
    });
    try {
      const data = await resetPassword(email, code, newPassword);
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: { data }
      });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_ERROR,
        payload: { error }
      });
    }
  };
};

export const refreshAuthData = (): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: AUTH_LOADING,
      payload: {}
    });
    try {
      const email = getUserEmail() || '';
      const refreshToken = getRefreshToken() || '';
      const data = await postRefreshToken(email, refreshToken);
      const {
        authService: {
          role,
          accessToken,
          jwt: { token },
          refresh: { token: newRefreshToken }
        }
      } = data;
      dispatch({
        type: AUTH_SUCCESS,
        payload: { data }
      });
      setSession(role, accessToken, token, newRefreshToken, email);
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: { error }
      });
    }
  };
};

export const changeRole = (role: string): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: PUT_ROLE_IN_PROGRESS,
      payload: {}
    });
    try {
      const accessToken = getAccessToken() || '';
      const jwt = getJwt() || '';
      const email = getUserEmail() || '';
      const refreshToken = getRefreshToken() || '';
      const data = await putRole(role, accessToken, jwt);
      dispatch({
        type: PUT_ROLE_SUCCESS,
        payload: { data }
      });
      setSession(role, accessToken, jwt, refreshToken, email);
    } catch (error) {
      dispatch({
        type: PUT_ROLE_ERROR,
        payload: { error, role }
      });
    }
  };
};

export const logout = (): ThunkAction<string, string> => {
  return async (dispatch: Dispatch<string, string>) => {
    dispatch({ type: LOGOUT_IN_PROGRESS, payload: '' });
    try {
      await localStorage.clear();
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: ''
      });
    } catch (err) {
      dispatch({
        type: LOGOUT_ERROR,
        payload: err
      });
    }
  };
};

export const getAllUsers = (): ThunkAction<string, Object> => {
  const jwt = getJwt() || '';
  return async (dispatch: Dispatch<Object, string>) => {
    try {
      const { data } = await getUsers(jwt);
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
