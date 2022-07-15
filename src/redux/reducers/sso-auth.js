// @flow
import { Map, fromJS } from 'immutable'; // NOSONAR
// eslint-disable-next-line
import jwt_decode from 'jwt-decode';
import type { ApiAction } from '../actions/action-types';
import { REDUX_TYPES } from '../../constants';

const {
  ON_USER_LOGIN,
  ON_USER_LOGOUT,
  ERROR_ON_USER_LOGIN,
  ON_CHANGE_ROLE,
  ERROR_ON_CHANGE_ROLE,
  ON_REFRESH_USER_DATA,
  ON_GET_LOOKUP_USERS,
  ERROR_ON_GET_LOOKUP_USERS
} = REDUX_TYPES.SSO_AUTH;

const INITIAL_STATE: Map = fromJS({
  isAuthenticated: false,
  errorOnLogin: undefined,
  email: '',
  name: '',
  role: '',
  errorOnSetNewRole: undefined,
  lookupUsers: [],
  lookupUsersError: undefined
});

const loginUser = (state: Map, action: Object) => {
  const { data } = action.payload;
  const {
    id_token: idToken,
    access_token: accessToken,
    refresh_token: refreshToken
  } = data;

  const { name, email, family_name: lName } = jwt_decode(idToken);
  const decoded = jwt_decode(idToken);
  const role = decoded['custom:role'];

  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('refresh_token', refreshToken);
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
  const role = localStorage.getItem('userRole');
  const email = localStorage.getItem('userEmail');
  const name = localStorage.getItem('userName');

  return state
    .set('isAuthenticated', true)
    .set('email', email)
    .set('name', name)
    .set('role', role);
};

const setNewUserRole = (state: Map, action: Object) => {
  const { role } = action.payload;

  localStorage.setItem('userRole', role);

  return state.set('role', role);
};

const errorOnSetNewUserRole = (state: Map, action: Object) => {
  const { error } = action.payload;
  return state.set('errorOnSetNewRole', error);
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
  [ON_USER_LOGIN]: loginUser,
  [ON_USER_LOGOUT]: logoutUser,
  [ON_CHANGE_ROLE]: setNewUserRole,
  [ON_REFRESH_USER_DATA]: onRefreshUserData,
  [ERROR_ON_USER_LOGIN]: errorOnUserLogin,
  [ERROR_ON_CHANGE_ROLE]: errorOnSetNewUserRole,
  [ON_GET_LOOKUP_USERS]: onGetLookupUsers,
  [ERROR_ON_GET_LOOKUP_USERS]: onErrorGetLookupUsers
};

export default function(
  state: Map<string, any> = INITIAL_STATE,
  action: ApiAction<any, any>
): Map {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
