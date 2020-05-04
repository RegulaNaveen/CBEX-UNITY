// @flow
import expect from 'expect';
import { describe, it, beforeEach, afterEach } from 'mocha';
import sinon from 'sinon';
import { Login } from '../../../src/actions/auth-actions';
import { LOGIN_SUCCESS, LOGIN_LOADING } from '../../../src/actions/auth-types';

describe('Auth Actions', () => {
  // TODO: Implement doLogin stub
  // let doLoginStub;
  let getState;
  let dispatch;

  beforeEach(() => {
    dispatch = sinon.stub();
    getState = sinon.stub();
  });

  afterEach(() => {
    dispatch.reset();
    getState.reset();
  });

  it('should do LOGIN_SUCCESS', async () => {
    const email = 'fake@mail.com';
    const password = 'fakepassword';

    const data = { email, password };

    await Login(email, password)(dispatch, getState);
    expect(dispatch.args[0][0].type).toBe(LOGIN_LOADING);
    expect(dispatch.args[1][0].type).toBe(LOGIN_SUCCESS);
    expect(dispatch.args[1][0].payload).toEqual(data);
  });

  // TODO: Implement test when api funcion exist so Promisse.reject can be executed
  // it('should do LOGIN_ERROR', async () => {
  //   const email = 'fake@mail.com';
  //   const password = 'fakepassword';
  //   const errorMessage = 'Error: Fake error message';

  //   doLogin.returns(Promise.reject(errorMessage));

  //   await Login(email, password)(dispatch, getState);
  //   expect(dispatch.calledTwice).toBe(true);
  //   expect(dispatch.args[0][0].type).toBe(LOGIN_LOADING);
  //   expect(dispatch.args[1][0].type).toBe(LOGIN_ERROR);
  //   expect(dispatch.args[1][0].payload).toEqual('Error: Fake error message');
  // });
});
