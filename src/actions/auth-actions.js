// @flow
import {
  AUTH_SUCCESS,
  AUTH_LOADING,
  AUTH_ERROR,
  LOGOUT_IN_PROGRESS,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  PUT_ROLE_IN_PROGRESS,
  PUT_ROLE_SUCCESS,
  PUT_ROLE_ERROR
} from './auth-types';
import type { Dispatch, ThunkAction } from './action-types';
import {
  setSession,
  getJwt,
  getAccessToken,
  getUserEmail,
  getRefreshToken
} from '../SessionHandler';
import { authentication, putRole, postRefreshToken } from '../api/auth';

export const login = (
  email: string,
  password: string
): ThunkAction<string, Object> => {
  return async (dispatch: Dispatch<string, Object>) => {
    dispatch({
      type: AUTH_LOADING,
      payload: {}
    });
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
      dispatch({
        type: AUTH_SUCCESS,
        payload: { data }
      });
      setSession(role, accessToken, token, refreshToken, email);
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
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
      console.log('CALLED');
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
