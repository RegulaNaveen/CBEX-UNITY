// @flow
import { Map } from 'immutable'; // NOSONAR
import { createSelector } from 'reselect';

export const getUserAuthStatus = (auth: Map): boolean =>
  !!auth.get('isAuthenticated');

export const getUserName = (auth: Map): string => auth.get('name');

export const getUserEmail = (auth: Map): string => auth.get('email');

export const getUserRole = (auth: Map): string => auth.get('role');

export const getUserData = (auth: Map): Map => {
  const role = auth.get('role');
  const email = auth.get('email');
  const name = auth.get('name');

  return { role, email, name };
};

export const getLookupUsers = (auth: Map): Map => auth.get('lookupUsers');

export const getLookupUsersError = (auth: Map): Map =>
  auth.get('lookupUsersError');

const selectSSOAuth = state => state.ssoAuth;

export const selectUserRole = createSelector(selectSSOAuth, auth =>
  auth.get('role')
);
