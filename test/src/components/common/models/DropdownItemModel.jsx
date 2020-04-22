// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import sinon from 'sinon';
import type { stub } from 'sinon';
import DropdownItem from '../../../../../src/components/common/DropdownItem';

export default class DropdownItemModel {
  constructor(id: string, item: string) {
    this._onClickStub = sinon.stub();
    this._item = item;
    const props = {
      id,
      item,
      onClick: this._onClickStub
    };
    this._wrapper = shallow(<DropdownItem {...props} />);
  }

  _wrapper: ShallowWrapper;

  _onClickStub: stub;

  _item: string;

  _getItem = (): ShallowWrapper => this._wrapper.find('li');

  getChildren = (): string => this._getItem().prop('children');

  doOnClick = () => this._getItem().prop('onClick')();

  onChangeCalledOnce = () => this._onClickStub.calledOnce === true;

  resetEventHandlers = () => {
    this._onClickStub.reset();
  };
}
