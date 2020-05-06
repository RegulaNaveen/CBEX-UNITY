// @flow
import { Map } from 'immutable';

export const getAuthData = (auth: Map): Map => auth.get('authData');

export const isAuthLoading = (auth: Map): boolean => auth.get('isAuthLoading');

export const authHasErrors = (auth: Map): string => auth.get('authError');
