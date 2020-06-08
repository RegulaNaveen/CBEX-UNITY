// @flow
import { Map } from 'immutable';

export const getAuthData = (auth: Map): Map => auth.get('authData');

export const isAuthLoading = (auth: Map): boolean => auth.get('isAuthLoading');

export const authHasErrors = (auth: Map): string => auth.get('authError');

export const isLogout = (auth: Map): Map => auth.get('isLogout');

export const isLogoutLoading = (auth: Map): boolean =>
  auth.get('isLogoutLoading');

export const logoutHasErrors = (auth: Map): string =>
  auth.get('logoutHasErrors');

export const getChangeRoleError = (auth: Map): Map =>
  auth.get('changeRoleError');
