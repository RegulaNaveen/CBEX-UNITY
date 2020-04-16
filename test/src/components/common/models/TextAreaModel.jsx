// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import sinon from 'sinon';
import type { stub } from 'sinon';
import TextArea from '../../../../../src/components/common/TextArea';

export default class TextAreaModel {
  constructor(
    id: string,
    className: string,
    value: string,
    placeholder: string,
    title: string
  ) {
    this._onChangeStub = sinon.stub();
    const props = {
      id,
      className,
      value,
      placeholder,
      title,
      onChange: this._onChangeStub
    };
    this._wrapper = shallow(<TextArea {...props} />);
  }

  _wrapper: ShallowWrapper;

  _onChangeStub: stub;

  _getParagraph = (): ShallowWrapper => this._wrapper.find('p');

  _getTextArea = (): ShallowWrapper => this._wrapper.find('textarea');

  getClassName = (): string => this._getParagraph().prop('className');

  getId = (): string => this._getTextArea().prop('id');

  getTextClassName = (): string => this._getTextArea().prop('className');

  getValue = (): string => this._getTextArea().prop('value');

  getPlaceholder = (): boolean => this._getTextArea().prop('placeholder');

  doOnChange = () => this._getTextArea().prop('onChange')();

  onChangeCalledOnce = (): boolean => this._onChangeStub.calledOnce === true;

  resetEventHandlers = () => {
    this._onChangeStub.reset();
  };
}
