// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import LoginForm from '../../src/components/auth/LoginForm';
import { PrimaryButton, LinkButton } from '../../src/components/common/Button';
import InputField from '../../src/components/common/InputField';
import Checkbox from '../../src/components/common/Checkbox';

export default class LoginFormModel {
  constructor() {
    this._wrapper = shallow(<LoginForm />);
  }

  _wrapper: ShallowWrapper;

  _loginForm = (): ShallowWrapper => this._wrapper.find(LoginForm);

  _PrimaryButton = (): ShallowWrapper => this._wrapper.find(PrimaryButton);

  _LinkButton = (): ShallowWrapper => this._wrapper.find(LinkButton);

  _InputField = (): ShallowWrapper => this._wrapper.find(InputField);

  _CheckBox = (): ShallowWrapper => this._wrapper.find(Checkbox);

  hasLoginForm = (): boolean => this._loginForm().length === 1;

  hasPrimaryButton = (): boolean => this._PrimaryButton().lenght === 1;

  hasLinkButton = (): boolean => this._LinkButton().lenght === 1;

  hasInputField = (): boolean => this._InputField().lenght === 1;

  hasCheckBox = (): boolean => this._CheckBox().lenght === 1;
}
