// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import { fromJS, Map } from 'immutable';
import {
  AUTH_SUCCESS,
  AUTH_LOADING,
  AUTH_ERROR
} from '../../../src/actions/auth-types';
import authReducer from '../../../src/reducers/auth';

describe('Auth Reducer', () => {
  const initialState = fromJS({});

  it('should load auth sucess state', () => {
    const authData = {
      data: { email: 'fake@mail.com', password: 'fakepassword' }
    };
    const isAuthLoading = false;
    const action = {
      type: AUTH_SUCCESS,
      payload: authData
    };
    const newState = authReducer(initialState, action);
    const expectedState = Map({ authData, isAuthLoading });
    expect(newState).toEqual(expectedState);
  });

  it('should set auth error state', () => {
    const error = { error: 'Fake Error Message' };
    const action = {
      type: AUTH_ERROR,
      payload: error
    };
    const newState = authReducer(initialState, action);
    const expectedState = initialState
      .set('authError', error)
      .set('isAuthLoading', false);
    expect(newState).toEqual(expectedState);
  });

  it('should set auth loading state', () => {
    const action = {
      type: AUTH_LOADING,
      payload: {}
    };
    const newState = authReducer(initialState, action);
    const expectedState = initialState
      .set('isAuthLoading', true)
      .set('authError', undefined);
    expect(newState).toEqual(expectedState);
  });
});
