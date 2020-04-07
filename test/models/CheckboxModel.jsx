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

  _checkbox = (): ShallowWrapper => this._wrapper.find(Checkbox);

  getIdCheckbox = (): string => this._checkbox().prop('id');

  getValueCheckbox = (): string => this._checkbox().prop('value');

  getNameCheckbox = (): string => this._checkbox().prop('name');

  getOnChangeCheckbox = (): Function => this._checkbox().prop('onChange');

  getCheckedCheckbox = (): boolean => this._checkbox().prop('checked');

  getChildrenCheckbox = (): string => this._checkbox().prop('children');
}
