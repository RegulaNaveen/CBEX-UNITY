// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import Modal from '../../../../../src/components/common/Modal';

export default class ModalModel {
  constructor(children: string) {
    const props = {
      children
    };
    this._wrapper = shallow(<Modal {...props} />);
  }

  _wrapper: ShallowWrapper;

  _getModalWrapper = (): ShallowWrapper =>
    this._wrapper.find('div.modal-dialog-wrapper');

  getChildren = (): string => this._getModalWrapper().prop('children');
}
