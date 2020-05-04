// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import { fromJS, Map } from 'immutable';
import {
  LOGIN_SUCCESS,
  LOGIN_LOADING,
  LOGIN_ERROR
} from '../../../src/actions/auth-types';
import authReducer from '../../../src/reducers/auth';

describe('Auth reducer', () => {
  const initialState = fromJS({});

  it('should load login data', () => {
    const loginData = { email: 'fake@email.com', password: 'fakepassword' };
    const isLoginLoading = false;
    const action = {
      type: LOGIN_SUCCESS,
      payload: loginData
    };
    const newState = authReducer(initialState, action);
    const expectedState = Map({ loginData, isLoginLoading });
    expect(newState).toEqual(expectedState);
  });

  it('should set login error state', () => {
    const errorMessage = 'Fake Error Message';
    const action = {
      type: LOGIN_ERROR,
      payload: 'Fake Error Message'
    };
    const newState = authReducer(initialState, action);
    const expectedState = initialState
      .set('loginError', errorMessage)
      .set('isLoginLoading', false);
    expect(newState).toEqual(expectedState);
  });

  it('should set login loading state', () => {
    const action = {
      type: LOGIN_LOADING,
      payload: ''
    };
    const newState = authReducer(initialState, action);
    const expectedState = initialState
      .set('isLoginLoading', true)
      .set('loginError', undefined);
    expect(newState).toEqual(expectedState);
  });
});
