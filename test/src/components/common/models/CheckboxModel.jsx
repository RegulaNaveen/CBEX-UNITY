// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import sinon from 'sinon';
import type { stub } from 'sinon';
import Checkbox from '../../../../../src/components/common/Checkbox';

export default class CheckboxModel {
  constructor(
    id: string,
    value: string,
    name: string,
    checked: boolean,
    children: any
  ) {
    this._onChangeStub = sinon.stub();
    const props = {
      id,
      value,
      name,
      checked,
      children,
      onChange: this._onChangeStub
    };
    this._wrapper = shallow(<Checkbox {...props} />);
  }

  _wrapper: ShallowWrapper;

  _onChangeStub: stub;

  _getLabel = (): ShallowWrapper => this._wrapper.find('label');

  _getInput = (): ShallowWrapper => this._wrapper.find('input');

  getId = (): string => this._getInput().prop('id');

  getName = (): string => this._getInput().prop('name');

  getValue = (): string => this._getInput().prop('value');

  getChecked = (): string => this._getInput().prop('checked');

  getChildren = (): any => this._getLabel().prop('children')[1];

  doOnChange = () => this._getInput().prop('onChange')();

  onChangeCalledOnce = () => this._onChangeStub.calledOnce === true;

  resetEventHandlers = () => {
    this._onChangeStub.reset();
  }
}
