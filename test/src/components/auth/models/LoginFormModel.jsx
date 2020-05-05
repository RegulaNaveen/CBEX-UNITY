// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import sinon from 'sinon';
import type { stub } from 'sinon';
import { LoginFormImpl } from '../../../../../src/components/auth/LoginForm';
import {
  PrimaryButton,
  LinkButton
} from '../../../../../src/components/common/Buttons';
import InputField from '../../../../../src/components/common/InputField';
import Checkbox from '../../../../../src/components/common/Checkbox';

export default class LoginFormModel {
  constructor(isLoading: boolean) {
    this._doLoginStub = sinon.stub();
    const props = {
      isLoading,
      loginUser: this._doLoginStub
    };
    this._wrapper = shallow(<LoginFormImpl {...props} />);
  }

  _wrapper: ShallowWrapper;

  _doLoginStub: stub;

  _getPrimaryButton = (): ShallowWrapper => this._wrapper.find(PrimaryButton);

  _getLinkButton = (): ShallowWrapper => this._wrapper.find(LinkButton);

  _getInputFields = (): ShallowWrapper => this._wrapper.find(InputField);

  _getCheckBox = (): ShallowWrapper => this._wrapper.find(Checkbox);

  _getErrorParagraph = (): ShallowWrapper =>
    this._wrapper.find('p.login-form-error');

  hasError = (): boolean => this._getErrorParagraph().length === 1;

  getErrorState = (): string => this._wrapper.state('error');

  hasPrimaryButton = (): boolean => this._getPrimaryButton().length === 1;

  hasLinkButton = (): boolean => this._getLinkButton().length === 1;

  hasInputFields = (): boolean => this._getInputFields().length === 2;

  getEmailInput = (): ShallowWrapper => this._getInputFields().at(0);

  getPasswordInput = (): ShallowWrapper => this._getInputFields().at(1);

  hasCheckBox = (): boolean => this._getCheckBox().length === 1;

  getTypeInput = (): string => this._getInputFields().prop('type');

  getOnChangeInput = (): boolean => this._getInputFields().prop('onChange');

  getIdCheckbox = (): string => this._getCheckBox().prop('id');

  getIdButton = (): string => this._getPrimaryButton().prop('id');

  getOnChangeButton = (): boolean => this._getPrimaryButton().prop('onChange');

  getIdLink = (): string => this._getLinkButton().prop('id');

  getOnChangeLink = (): boolean => this._getLinkButton().prop('onChange');

  getEmailState = (): string => this._wrapper.state('email');

  getPasswordState = (): string => this._wrapper.state('password');

  getIsChecked = (): boolean => this._wrapper.state('isChecked');

  // Interactions

  doOnEmailChange = (value: string) => {
    const event = { target: { value } };
    this.getEmailInput().simulate('change', event);
  };

  doOnPasswordChange = (value: string) => {
    const event = { target: { value } };
    this.getPasswordInput().simulate('change', event);
  };

  doHandleIsChecked = () => {
    this._getCheckBox()
      .props()
      .onChange();
  };

  doLoginClick = () => this._getPrimaryButton().simulate('click');

  onDoLoginCalledOnce = (): boolean => this._doLoginStub.calledOnce === true;
}
