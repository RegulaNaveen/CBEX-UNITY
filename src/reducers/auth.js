// @flow
import { Map, fromJS } from 'immutable';
import { AUTH_SUCCESS, AUTH_LOADING, AUTH_ERROR } from '../actions/auth-types';
import type { ApiAction } from '../actions/action-types';

const INITIAL_STATE: Map = fromJS({
  authData: undefined,
  isAuthLoading: false,
  authError: undefined
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

const actionMap = {
  [AUTH_SUCCESS]: onAuthSuccess,
  [AUTH_LOADING]: onAuthLoading,
  [AUTH_ERROR]: onAuthError
};

export default function(
  state: Map<string, any> = INITIAL_STATE,
  action: ApiAction<any, any>
): Map {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
