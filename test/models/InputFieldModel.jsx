// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import InputField from '../../src/components/common/InputField';

export default class InputFieldModel {
  constructor(
    title: string,
    placeholder: string,
    onChange: Function,
    type: string,
    id: string
  ) {
    const props = {
      title,
      placeholder,
      onChange,
      type,
      id
    };
    this._wrapper = shallow(<InputField {...props} />);
  }

  _wrapper: ShallowWrapper;

  _inpuField = (): ShallowWrapper => this._wrapper.find(InputField);

  hasInputField = (): boolean => this._inpuField().length === 1;

  getTitleInputField = (): string => this._inpuField().prop('title');

  getPlaceholderInput = (): string => this._inpuField().prop('placeholder');

  getOnChangeInputField = (): Function => this._inpuField().prop('onChange');

  getTypeInputField = (): boolean => this._inpuField().prop('type');

  getIdInputField = (): string => this._inpuField().prop('id');
}
