// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import sinon from 'sinon';
import type { stub } from 'sinon';
import InputField from '../../../../../src/components/common/InputField';

export default class InputFieldModel {
  constructor(title: string, placeholder: string, type: string, id: string) {
    this._onChangeStub = sinon.stub();
    const props = {
      title,
      placeholder,
      type,
      id,
      onChange: this._onChangeStub
    };
    this._wrapper = shallow(<InputField {...props} />);
  }

  _wrapper: ShallowWrapper;

  _onChangeStub: stub;

  _getParagraph = (): ShallowWrapper => this._wrapper.find('p');

  _getInput = (): ShallowWrapper => this._wrapper.find('input');

  getId = (): string => this._getInput().prop('id');

  getTitle = (): string => this._getParagraph().prop('children');

  getPlaceholder = (): string => this._getInput().prop('placeholder');

  getType = (): boolean => this._getInput().prop('type');

  doOnChange = () => this._getInput().prop('onChange')();

  onChangeCalledOnce = (): boolean => this._onChangeStub.calledOnce === true;

  resetEventHandlers = () => {
    this._onChangeStub.reset();
  };
}
