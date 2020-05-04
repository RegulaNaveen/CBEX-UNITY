// @flow
import { LOGIN_SUCCESS, LOGIN_LOADING, LOGIN_ERROR } from './auth-types';
import type { AuthActionType } from './auth-types';
import type { Dispatch, ThunkAction } from './action-types';

export type ProposalInfo = {};

export const Login = (
  email: string,
  password: string
): ThunkAction<AuthActionType, Object> => {
  return async (dispatch: Dispatch<AuthActionType, Object>) => {
    dispatch({
      type: LOGIN_LOADING,
      payload: ''
    });
    try {
      // TODO: Implement server request & remove timeout
      // const data = await doLogin(email, password);
      localStorage.setItem('isLoggedin', 'true');
      const data = { email, password };
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: LOGIN_ERROR,
        payload: err
      });
    }
  };
};
