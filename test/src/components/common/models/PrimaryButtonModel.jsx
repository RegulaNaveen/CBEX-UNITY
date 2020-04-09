// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import sinon from 'sinon';
import type { stub } from 'sinon';
import { PrimaryButton } from '../../../../../src/components/common/Button';

export default class PrimaryButtonModel {
  constructor(id: string, children: string, type: string) {
    this._onClickStub = sinon.stub();
    const props = {
      id,
      children,
      type,
      onClick: this._onClickStub
    };
    this._wrapper = shallow(<PrimaryButton {...props} />);
  }

  _wrapper: ShallowWrapper;

  _onClickStub: stub;

  _getButton = (): ShallowWrapper => this._wrapper.find('button');

  getId = (): string => this._getButton().prop('id');

  getChildren = (): string => this._getButton().prop('children');

  getType = (): Function => this._getButton().prop('type');

  getOnChange = (): boolean => this._getButton().prop('onChange');

  doClick = () => this._getButton().prop('onClick')();

  onClickCalledOnce = (): boolean => this._onClickStub.calledOnce === true;

  resetEventHandlers = () => {
    this._onClickStub.reset();
  };
}
