// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import Checkbox from '../../src/components/common/Checkbox';

export default class CheckboxModel {
  constructor(
    id: string,
    value: string,
    name: string,
    onChange: Function,
    checked: boolean,
    children: any
  ) {
    const props = {
      id,
      value,
      name,
      onChange,
      checked,
      children
    };
    this._wrapper = shallow(<Checkbox {...props} />);
  }

  _wrapper: ShallowWrapper;

  _getTitle = (): ShallowWrapper => this._wrapper.find('label');

  _getInput = (): ShallowWrapper => this._wrapper.find('input');

  getIdTitleCheckbox = (): string => this._getTitle().prop('id');

  getIdCheckbox = (): string => this._getInput().prop('id');

  getValueCheckbox = (): string => this._getInput().prop('value');

  getNameCheckbox = (): string => this._getInput().prop('name');

  getOnChangeCheckbox = (): Function => this._getInput().prop('onChange');

  getCheckedCheckbox = (): boolean => this._getInput().prop('checked');
}
