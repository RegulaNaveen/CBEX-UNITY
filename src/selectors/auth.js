// @flow
import { Map } from 'immutable';

export const getAuthData = (auth: Map): Map => auth.get('authData');

export const getUserData = (auth: Map): Map => {
  const role = auth.getIn(['authData', 'data', 'authService', 'role']);
  const email = auth.getIn(['authData', 'data', 'authService', 'email']);
  const name = 'Laura Gallardo';
  return { role, email, name };
};

export const isAuthLoading = (auth: Map): boolean => auth.get('isAuthLoading');

export const authHasErrors = (auth: Map): string => auth.get('authError');

export const getForgotPasswordData = (auth: Map): Map =>
  auth.get('forgotPasswordSuccess');

export const isForgotPasswordLoading = (auth: Map): boolean =>
  auth.get('forgotPasswordLoading');

export const getForgotPasswordError = (auth: Map): string =>
  auth.get('forgotPasswordError');

export const getResetPasswordData = (auth: Map): Map =>
  auth.get('resetPasswordSuccess');

export const isResetPasswordLoading = (auth: Map): boolean =>
  auth.get('resetPasswordLoading');

export const getResetPasswordError = (auth: Map): string =>
  auth.get('resetPasswordError');

export const isLogout = (auth: Map): Map => auth.get('isLogout');

export const isLogoutLoading = (auth: Map): boolean =>
  auth.get('isLogoutLoading');

export const logoutHasErrors = (auth: Map): string =>
  auth.get('logoutHasErrors');

export const getChangeRoleError = (auth: Map): Map =>
  auth.get('changeRoleError');

export const getLookupUsers = (auth: Map): Map => auth.get('lookupUsers');

export const getLookupUsersError = (auth: Map): Map =>
  auth.get('lookupUsersError');
