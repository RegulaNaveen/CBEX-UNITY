// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import sinon from 'sinon';
import type { stub } from 'sinon';
import DayPickerCustomInput from '../../../../../src/components/common/DayPickerCustomInput';

export default class DayPickerCustomInputModel {
  constructor(value: string) {
    this._onEventStub = sinon.stub();
    const props = {
      value,
      onFocus: this._onEventStub,
      onBlur: this._onEventStub,
      onChange: this._onEventStub,
      onKeyUp: this._onEventStub,
      onClick: this._onEventStub
    };
    this._wrapper = shallow(<DayPickerCustomInput {...props} />);
  }

  _wrapper: ShallowWrapper;

  _onEventStub: stub;

  _getInput = (): ShallowWrapper => this._wrapper.find('input');

  hasInput = (): boolean => this._getInput().length === 1;

  hasInputPropsValue = (value: string): boolean =>
    this._getInput().prop('value') === value;

  // Interactions
  doFocus = () => this._getInput().simulate('focus');

  doBlur = () => this._getInput().simulate('blur');

  doChange = () => this._getInput().simulate('change');

  doKeyUp = () => this._getInput().simulate('keyup');

  doClick = () => this._getInput().simulate('click');

  onEventCalledOnce = (): boolean => this._onEventStub.calledOnce === true;

  resetEventHandlers = () => {
    this._onEventStub.reset();
  };
}
