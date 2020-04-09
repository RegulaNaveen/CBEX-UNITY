// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import { PrimaryButton } from '../../../../../src/components/common/Buttons';

export default class PrimaryButtonModel {
  constructor(id: string, children: string, type: string, onChange: Function) {
    const props = {
      id,
      children,
      type,
      onChange
    };
    this._wrapper = shallow(<PrimaryButton {...props} />);
  }

  _wrapper: ShallowWrapper;

  _primaryButton = (): ShallowWrapper => this._wrapper.find('button');

  getIdPrimaryButton = (): string => this._primaryButton().prop('id');

  getChildrenPrimaryButton = (): string =>
    this._primaryButton().prop('children');

  getTypePrimaryButton = (): Function => this._primaryButton().prop('type');

  getOnChangePrimaryButton = (): boolean =>
    this._primaryButton().prop('onChange');
}
