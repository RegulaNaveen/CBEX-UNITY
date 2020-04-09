// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import LoginForm from '../../../../../src/components/auth/LoginForm';
import { PrimaryButton, LinkButton } from '../../../../../src/components/common/Buttons';
import InputField from '../../../../../src/components/common/InputField';
import Checkbox from '../../../../../src/components/common/Checkbox';

export default class LoginFormModel {
  constructor() {
    this._wrapper = shallow(<LoginForm />);
  }

  _wrapper: ShallowWrapper;

  _PrimaryButton = (): ShallowWrapper => this._wrapper.find(PrimaryButton);

  _LinkButton = (): ShallowWrapper => this._wrapper.find(LinkButton);

  _InputField = (): ShallowWrapper => this._wrapper.find(InputField);

  _CheckBox = (): ShallowWrapper => this._wrapper.find(Checkbox);

  hasPrimaryButton = (): boolean => this._PrimaryButton().lenght === 1;

  hasLinkButton = (): boolean => this._LinkButton().lenght === 1;

  hasInputField = (): boolean => this._InputField().lenght === 1;

  getEmailInput = (): string =>
    this._InputField()
      .at(0)
      .prop('id');

  getPasswordInput = (): string =>
    this._InputField()
      .at(1)
      .prop('id');

  hasCheckBox = (): boolean => this._CheckBox().lenght === 1;

  getTypeInput = (): string => this._InputField().prop('type');

  getOnChangeInput = (): boolean => this._InputField().prop('onChange');

  getIdCheckbox = (): string => this._CheckBox().prop('id');

  getIdButton = (): string => this._PrimaryButton().prop('id');

  getOnChangeButton = (): boolean => this._PrimaryButton().prop('onChange');

  getIdLink = (): string => this._LinkButton().prop('id');

  getOnChangeLink = (): boolean => this._LinkButton().prop('onChange');
}
