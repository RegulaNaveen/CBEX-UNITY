// @flow
import { Map } from 'immutable';

export const getLoginData = (auth: Map): Map => auth.get('loginData');

export const getLoginLoading = (auth: Map): boolean =>
  auth.get('isLoginLoading');

export const getLoginError = (auth: Map): string => auth.get('loginError');
