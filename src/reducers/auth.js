// @flow
import { Map, fromJS } from 'immutable';
import {
  AUTH_SUCCESS,
  AUTH_LOADING,
  AUTH_ERROR,
  LOGOUT_IN_PROGRESS,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR
} from '../actions/auth-types';
import type { ApiAction } from '../actions/action-types';

const INITIAL_STATE: Map = fromJS({
  authData: undefined,
  isAuthLoading: false,
  authError: undefined,
  isLogout: undefined,
  isLogoutLoading: false,
  logoutHasErrors: undefined
});

const onAuthSuccess = (state: Map, action: Object): Map => {
  const data = action.payload;
  return state.set('authData', data).set('isAuthLoading', false);
};

const onAuthLoading = (state: Map): Map => {
  return state.set('isAuthLoading', true).set('authError', undefined);
};

const onAuthError = (state: Map, action: Object): Map => {
  const error = action.payload;
  return state.set('authError', error.error).set('isAuthLoading', false);
};

const onLogoutSuccess = (state: Map, action: Object): Map => {
  const data = action.payload;
  return state.set('isLogout', data).set('isLogoutLoading', false);
};

const onLogoutInProgress = (state: Map): Map => {
  return state.set('isLogoutLoading', true).set('logoutHasErrors', undefined);
};

const onLogoutError = (state: Map, action: Object): Map => {
  const error = action.payload;
  return state
    .set('logoutHasErrors', error.error)
    .set('isLogoutLoading', false);
};

const actionMap = {
  [AUTH_SUCCESS]: onAuthSuccess,
  [AUTH_LOADING]: onAuthLoading,
  [AUTH_ERROR]: onAuthError,
  [LOGOUT_IN_PROGRESS]: onLogoutInProgress,
  [LOGOUT_SUCCESS]: onLogoutError,
  [LOGOUT_ERROR]: onLogoutSuccess
};

export default function(
  state: Map<string, any> = INITIAL_STATE,
  action: ApiAction<any, any>
): Map {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
