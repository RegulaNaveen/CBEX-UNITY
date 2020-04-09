// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import LoginForm from '../../../../../src/components/auth/LoginForm';
import {
  PrimaryButton,
  LinkButton
} from '../../../../../src/components/common/Buttons';
import InputField from '../../../../../src/components/common/InputField';
import Checkbox from '../../../../../src/components/common/Checkbox';

export default class LoginFormModel {
  constructor() {
    this._wrapper = shallow(<LoginForm />);
  }

  _wrapper: ShallowWrapper;

  _getPrimaryButton = (): ShallowWrapper => this._wrapper.find(PrimaryButton);

  _getLinkButton = (): ShallowWrapper => this._wrapper.find(LinkButton);

  _getInputFields = (): ShallowWrapper => this._wrapper.find(InputField);

  _getCheckBox = (): ShallowWrapper => this._wrapper.find(Checkbox);

  hasPrimaryButton = (): boolean => this._getPrimaryButton().length === 1;

  hasLinkButton = (): boolean => this._getLinkButton().length === 1;

  hasInputFields = (): boolean => this._getInputFields().length === 2;

  getEmailInput = (): string =>
    this._getInputFields()
      .at(0)
      .prop('id');

  getPasswordInput = (): string =>
    this._getInputFields()
      .at(1)
      .prop('id');

  hasCheckBox = (): boolean => this._getCheckBox().length === 1;

  getTypeInput = (): string => this._getInputFields().prop('type');

  getOnChangeInput = (): boolean => this._getInputFields().prop('onChange');

  getIdCheckbox = (): string => this._getCheckBox().prop('id');

  getIdButton = (): string => this._getPrimaryButton().prop('id');

  getOnChangeButton = (): boolean => this._getPrimaryButton().prop('onChange');

  getIdLink = (): string => this._getLinkButton().prop('id');

  getOnChangeLink = (): boolean => this._getLinkButton().prop('onChange');
}
