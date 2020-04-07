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

  _getTitle = (): ShallowWrapper => this._wrapper.find('p');

  _getInput = (): ShallowWrapper => this._wrapper.find('input');

  getTitleInputField = (): string => this._getTitle().prop('children');

  getPlaceholderInput = (): string => this._getInput().prop('placeholder');

  getOnChangeInputField = (): Function => this._getInput().prop('onChange');

  getTypeInputField = (): boolean => this._getInput().prop('type');

  getIdInputField = (): string => this._getInput().prop('id');
}
