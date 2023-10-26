/* eslint-disable camelcase */
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
  ON_USER_ACKNOWLEDGE,
  ERROR_ON_CHANGE_ROLE,
  ERROR_ON_USER_ACKNOWLEDGE,
  ON_REFRESH_USER_DATA,
  ON_GET_LOOKUP_USERS,
  ERROR_ON_GET_LOOKUP_USERS,
  SET_USER_FAVOURITES,
  SET_CUSTOM_NAME_MAP,
  SET_FAVOURITES_UPDATED_DATE
} = REDUX_TYPES.SSO_AUTH;

const INITIAL_STATE: Map = fromJS({
  isAuthenticated: false,
  errorOnLogin: undefined,
  email: '',
  name: '',
  role: '',
  errorOnSetNewRole: undefined,
  errorOnSetUserAcknowledge: undefined,
  lookupUsers: [],
  lookupUsersError: undefined,
  favourites: [],
  customNameMap: {},
  favouritesUpdatedDate: [],
  acknowledged: undefined
});

const loginUser = (state: Map, action: Object) => {
  const { data } = action.payload;
  const {
    id_token: idToken,
    access_token: accessToken,
    refresh_token: refreshToken
  } = data;

  const { name, email, family_name: lName, preferred_username } = jwt_decode(
    idToken
  );
  const decoded = jwt_decode(idToken);
  const role = decoded['custom:role'];
  const acknowledged = decoded['custom:acknowledgment'];

  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('refresh_token', refreshToken);
  localStorage.setItem('id_token', idToken);
  localStorage.setItem('userRole', role);
  localStorage.setItem('userEmail', email);
  localStorage.setItem('userName', `${name} ${lName}`);
  localStorage.setItem('userId', preferred_username);
  localStorage.setItem('userAcknowledged', acknowledged);

  return state
    .set('isAuthenticated', true)
    .set('email', email)
    .set('name', `${name} ${lName}`)
    .set('role', role)
    .set('acknowledged', acknowledged);
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

const setUserAcknowledge = (state: Map, action: Object) => {
  const { data } = action.payload;

  localStorage.setItem('userAcknowledged', data);

  return state.set('acknowledged', data);
};

const errorOnSetNewUserRole = (state: Map, action: Object) => {
  const { error } = action.payload;
  return state.set('errorOnSetNewRole', error);
};

const errorOnSetUserAcknowledge = (state: Map, action: Object) => {
  const { error } = action.payload;
  return state.set('errorOnSetUserAcknowledge', error);
};

const onGetLookupUsers = (state: Map, action: Object): Map => {
  const { lookupUsers } = action.payload;
  return state.set('lookupUsers', lookupUsers).set('lookupUsersError');
};

const onErrorGetLookupUsers = (state: Map, action: Object): Map => {
  const { error } = action.payload;
  return state.set('lookupUsersError', error);
};

const setUserFavourites = (state, action) => {
  return state.set('favourites', fromJS(action.payload));
};

const setCustomNameMap = (state, action) => {
  return state.set('customNameMap', fromJS(action.payload));
};

const setUserFavouritesUpdatedDate = (state, action) => {
  return state.set('favouritesUpdatedDate', fromJS(action.payload));
};

const actionMap = {
  [ON_USER_LOGIN]: loginUser,
  [ON_USER_LOGOUT]: logoutUser,
  [ON_CHANGE_ROLE]: setNewUserRole,
  [ON_USER_ACKNOWLEDGE]: setUserAcknowledge,
  [ON_REFRESH_USER_DATA]: onRefreshUserData,
  [ERROR_ON_USER_LOGIN]: errorOnUserLogin,
  [ERROR_ON_CHANGE_ROLE]: errorOnSetNewUserRole,
  [ERROR_ON_USER_ACKNOWLEDGE]: errorOnSetUserAcknowledge,
  [ON_GET_LOOKUP_USERS]: onGetLookupUsers,
  [ERROR_ON_GET_LOOKUP_USERS]: onErrorGetLookupUsers,
  [SET_USER_FAVOURITES]: setUserFavourites,
  [SET_CUSTOM_NAME_MAP]: setCustomNameMap,
  [SET_FAVOURITES_UPDATED_DATE]: setUserFavouritesUpdatedDate,
};

export default function(
  state: Map<string, any> = INITIAL_STATE,
  action: ApiAction<any, any>
): Map {
  return actionMap[action.type] ? actionMap[action.type](state, action) : state;
}
