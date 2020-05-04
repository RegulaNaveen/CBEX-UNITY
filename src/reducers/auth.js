// @flow
import { Map, fromJS } from 'immutable';
import {
  LOGIN_SUCCESS,
  LOGIN_LOADING,
  LOGIN_ERROR
} from '../actions/auth-types';
import type { ApiAction } from '../actions/action-types';

const INITIAL_STATE: Map = fromJS({
  loginData: undefined,
  isLoginLoading: false,
  loginError: undefined
});

const onLoginSuccess = (state: Map, action: Object): Map => {
  const data = action.payload;
  return state.set('loginData', data).set('isLoginLoading', false);
};

const onLoginLoading = (state: Map): Map => {
  return state.set('isLoginLoading', true).set('loginError', undefined);
};

const onLoginError = (state: Map, action: Object): Map => {
  const { payload } = action;
  return state.set('loginError', payload).set('isLoginLoading', false);
};

const actionMap = {
  [LOGIN_SUCCESS]: onLoginSuccess,
  [LOGIN_LOADING]: onLoginLoading,
  [LOGIN_ERROR]: onLoginError
};

export default function(
  state: Map<string, any> = INITIAL_STATE,
  action: ApiAction<any, any>
): Map {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
