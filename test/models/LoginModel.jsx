// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import Login from '../../src/components/auth/Login';
import LoginForm from '../../src/components/auth/LoginForm';

export default class LoginModel {
  constructor() {
    this._wrapper = shallow(<Login />);
  }

  _wrapper: ShallowWrapper;

  _login = (): ShallowWrapper => this._wrapper.find(LoginForm);

  hasLogin = (): boolean => this._login().length === 1;

  hasAnImage = (): boolean => this._wrapper.find('img');
}
