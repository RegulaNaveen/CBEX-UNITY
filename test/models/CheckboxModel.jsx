// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import Checkbox from '../../src/components/common/Checkbox';

export default class LoginModel {
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

  _checkbox = (): ShallowWrapper => this._wrapper.find(LoginModel);

  hasCheckbox = (): boolean => this._checkbox().length === 1;
}
