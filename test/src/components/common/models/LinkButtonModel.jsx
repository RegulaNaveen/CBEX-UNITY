// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import sinon from 'sinon';
import type { stub } from 'sinon';
import { LinkButton } from '../../../../../src/components/common/Button';

export default class LinkButtonModel {
  constructor(id: string, children: string, type: string) {
    this._onClickStub = sinon.stub();
    const props = {
      id,
      children,
      type,
      onClick: this._onClickStub
    };
    this._wrapper = shallow(<LinkButton {...props} />);
  }

  _wrapper: ShallowWrapper;

  _onClickStub: stub;

  _getButton = (): ShallowWrapper => this._wrapper.find('button');

  getId = (): string => this._getButton().prop('id');

  getChildren = (): string => this._getButton().prop('children');

  getType = (): Function => this._getButton().prop('type');

  doClick = () => this._getButton().prop('onClick')();

  onClickCalledOnce = (): boolean => this._onClickStub.calledOnce === true;

  resetEventHandlers = () => {
    this._onClickStub.reset();
  };
}
