// @flow
import { Map } from 'immutable';

export const getUserAuthStatus = (auth: Map): boolean =>
  !!auth.get('isAuthenticated');

export const getUserName = (auth: Map): string => auth.get('name');

export const getUserEmail = (auth: Map): string => auth.get('email');

export const getUserRole = (auth: Map): string => auth.get('role');
