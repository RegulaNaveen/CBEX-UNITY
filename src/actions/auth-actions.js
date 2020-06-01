// @flow
import { AUTH_SUCCESS, AUTH_LOADING, AUTH_ERROR } from './auth-types';
import type { Dispatch, ThunkAction } from './action-types';
import { setSession } from '../SessionHandler';
import { authentication } from '../api/auth';

export type AuthInfo = {};

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
      dispatch({
        type: AUTH_SUCCESS,
        payload: { data }
      });
      setSession(data.authService.role);
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: { error }
      });
    }
  };
};
