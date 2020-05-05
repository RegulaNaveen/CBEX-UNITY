// @flow
import { AUTH_SUCCESS, AUTH_LOADING, AUTH_ERROR } from './auth-types';
import type { AuthActionType } from './auth-types';
import type { Dispatch, ThunkAction } from './action-types';
import { setSession } from '../SessionHandler';

export type ProposalInfo = {};

export const login = (
  email: string,
  password: string
): ThunkAction<AuthActionType, Object> => {
  return async (dispatch: Dispatch<AuthActionType, Object>) => {
    dispatch({
      type: AUTH_LOADING,
      payload: {}
    });
    try {
      // TODO: Implement server request & remove timeout
      // const data = await doLogin(email, password);
      setSession();
      const data = { email, password };
      dispatch({
        type: AUTH_SUCCESS,
        payload: { data }
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: { error }
      });
    }
  };
};
