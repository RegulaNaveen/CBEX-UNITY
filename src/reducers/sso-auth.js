// @flow
import { Map, fromJS } from 'immutable';
// eslint-disable-next-line
import jwt_decode from 'jwt-decode';
import type { ApiAction } from '../actions/action-types';
import { REDUX_TYPES } from '../constants';

const {
  ON_USER_LOGIN,
  ON_USER_LOGOUT,
  ERROR_ON_USER_LOGIN,
  ON_CHANGE_ROLE,
  ERROR_ON_CHANGE_ROLE,
  ON_REFRESH_USER_DATA
} = REDUX_TYPES.SSO_AUTH;

const INITIAL_STATE: Map = fromJS({
  isAuthenticated: undefined,
  errorOnLogin: undefined,
  email: '',
  name: '',
  role: '',
  errorOnSetNewRole: undefined
});

const loginUser = (state: Map, action: Object) => {
  const { data } = action.payload;
  const { id_token: idToken, access_token: accessToken } = data;

  const { name, email, family_name: lName } = jwt_decode(idToken);
  const decoded = jwt_decode(idToken);
  const role = decoded['custom:role'];

  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('id_token', idToken);
  localStorage.setItem('userRole', role);
  localStorage.setItem('userEmail', email);
  localStorage.setItem('userName', `${name} ${lName}`);

  return state
    .set('isAuthenticated', true)
    .set('email', email)
    .set('name', `${name} ${lName}`)
    .set('role', role);
};

const logoutUser = (state: Map) => {
  localStorage.clear();
  return state.set('isAuthenticated', false);
};

const errorOnUserLogin = (state: Map, action: Object) => {
  const { error } = action.payload;
  return state.set('errorOnLogin', error);
};

const onRefreshUserData = (state: Map) => {
  const idToken = localStorage.getItem('id_token');

  const { name, email, family_name: lName } = jwt_decode(idToken);
  const decoded = jwt_decode(idToken);
  const role = decoded['custom:role'];

  return state
    .set('isAuthenticated', true)
    .set('email', email)
    .set('name', `${name} ${lName}`)
    .set('role', role);
};

const setNewUserRole = (state: Map, action: Object) => {
  const { role } = action.payload;
  return state.set('role', role);
};

const errorOnSetNewUserRole = (state: Map, action: Object) => {
  const { error } = action.payload;
  return state.set('errorOnSetNewRole', error);
};

const actionMap = {
  [ON_USER_LOGIN]: loginUser,
  [ON_USER_LOGOUT]: logoutUser,
  [ON_CHANGE_ROLE]: setNewUserRole,
  [ON_REFRESH_USER_DATA]: onRefreshUserData,
  [ERROR_ON_USER_LOGIN]: errorOnUserLogin,
  [ERROR_ON_CHANGE_ROLE]: errorOnSetNewUserRole
};

export default function(
  state: Map<string, any> = INITIAL_STATE,
  action: ApiAction<any, any>
): Map {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
