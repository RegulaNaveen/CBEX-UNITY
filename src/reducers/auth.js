// @flow
import { Map, fromJS } from 'immutable';
import { REDUX_TYPES } from '../constants';
import type { ApiAction } from '../actions/action-types';

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

const INITIAL_STATE: Map = fromJS({
  authData: undefined,
  isAuthLoading: false,
  authError: undefined,
  isLogout: undefined,
  isLogoutLoading: false,
  logoutHasErrors: undefined,
  changeRoleData: undefined,
  changeRoleLoading: false,
  changeRoleError: undefined,
  forgotPasswordLoading: false,
  forgotPasswordSuccess: undefined,
  forgotPasswordError: undefined,
  resetPasswordLoading: false,
  resetPasswordSuccess: undefined,
  resetPasswordError: undefined,
  lookupUsers: undefined,
  lookupUsersError: undefined
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

const onPutRoleSuccess = (state: Map, action: Object): Map => {
  const data = action.payload;
  const {
    data: { role }
  } = data;
  let newState = fromJS({});
  newState = state.setIn(['authData', 'data', 'authService', 'role'], role);
  const authData = newState.get('authData');
  return state
    .set('changeRoleData', data)
    .set('changeRoleLoading', false)
    .set('authData', authData);
};

const onPutRoleInProgress = (state: Map): Map => {
  return state
    .set('changeRoleData', undefined)
    .set('changeRoleLoading', true)
    .set('changeRoleError', undefined);
};

const onPutRoleError = (state: Map, action: Object): Map => {
  const error = action.payload;
  return state
    .set('changeRoleError', error)
    .set('changeRoleLoading', false)
    .set('changeRoleData', undefined);
};

const onForgotPasswordSuccess = (state: Map, action: Object): Map => {
  const data = action.payload;
  return state
    .set('forgotPasswordSuccess', data)
    .set('forgotPasswordError', undefined)
    .set('forgotPasswordLoading', false);
};

const onForgotPasswordInProgress = (state: Map): Map => {
  return state
    .set('forgotPasswordLoading', true)
    .set('forgotPasswordSuccess', undefined)
    .set('forgotPasswordError', undefined);
};

const onForgotPasswordError = (state: Map, action: Object): Map => {
  const error = action.payload;
  return state
    .set('forgotPasswordError', error.error)
    .set('forgotPasswordSuccess', undefined)
    .set('forgotPasswordLoading', false);
};

const onResetPasswordSuccess = (state: Map, action: Object): Map => {
  const data = action.payload;
  return state
    .set('resetPasswordSuccess', data)
    .set('resetPasswordError', undefined)
    .set('resetPasswordLoading', false);
};

const onResetPasswordInProgress = (state: Map): Map => {
  return state
    .set('resetPasswordLoading', true)
    .set('resetPasswordSuccess', undefined)
    .set('resetPasswordError', undefined);
};

const onResetPasswordError = (state: Map, action: Object): Map => {
  const error = action.payload;
  return state
    .set('resetPasswordError', error.error)
    .set('resetPasswordSuccess', undefined)
    .set('resetPasswordLoading', false);
};

const onGetLookupUsers = (state: Map, action: Object): Map => {
  const { lookupUsers } = action.payload;
  return state.set('lookupUsers', lookupUsers).set('lookupUsersError');
};

const onErrorGetLookupUsers = (state: Map, action: Object): Map => {
  const { error } = action.payload;
  return state.set('lookupUsersError', error);
};

const actionMap = {
  [AUTH_SUCCESS]: onAuthSuccess,
  [AUTH_LOADING]: onAuthLoading,
  [AUTH_ERROR]: onAuthError,
  [LOGOUT_IN_PROGRESS]: onLogoutInProgress,
  [LOGOUT_SUCCESS]: onLogoutError,
  [LOGOUT_ERROR]: onLogoutSuccess,
  [PUT_ROLE_IN_PROGRESS]: onPutRoleInProgress,
  [PUT_ROLE_SUCCESS]: onPutRoleSuccess,
  [PUT_ROLE_ERROR]: onPutRoleError,
  [FORGOT_PASSWORD_IN_PROGRESS]: onForgotPasswordInProgress,
  [FORGOT_PASSWORD_SUCCESS]: onForgotPasswordSuccess,
  [FORGOT_PASSWORD_ERROR]: onForgotPasswordError,
  [RESET_PASSWORD_IN_PROGRESS]: onResetPasswordInProgress,
  [RESET_PASSWORD_SUCCESS]: onResetPasswordSuccess,
  [RESET_PASSWORD_ERROR]: onResetPasswordError,
  [ON_GET_LOOKUP_USERS]: onGetLookupUsers,
  [ERROR_ON_GET_LOOKUP_USERS]: onErrorGetLookupUsers
};

export default function(
  state: Map<string, any> = INITIAL_STATE,
  action: ApiAction<any, any>
): Map {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
