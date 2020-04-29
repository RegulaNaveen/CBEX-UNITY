// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import sinon from 'sinon';
import type { stub } from 'sinon';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import DatePicker from '../../../../../src/components/common/DatePicker';

export default class DatePickerModel {
  constructor(label: any, selectedDay: string) {
    this._onEventStub = sinon.stub();
    const props = {
      label,
      selectedDay,
      handleDayChange: this._onEventStub,
      handleFormatDate: this._onEventStub,
      handleDate: this._onEventStub
    };
    this._wrapper = shallow(<DatePicker {...props} />);
  }

  _wrapper: ShallowWrapper;

  _onEventStub: stub;

  _getParagraphs = (): ShallowWrapper => this._wrapper.find('p');

  hasParagraphs = (): boolean => this._getParagraphs().length === 1;

  hasLabel = (): string => this._getParagraphs().prop('children');

  _getDayPicker = (): ShallowWrapper => this._wrapper.find(DayPickerInput);

  hasDayPicker = (): boolean => this._getDayPicker().length === 1;

  // Interactions
  doHandleDayChange = () =>
    this._getDayPicker()
      .props()
      .onDayChange();

  doHandleFormatDate = () =>
    this._getDayPicker()
      .props()
      .formatDate();

  doHandleDate = () =>
    this._getDayPicker()
      .props()
      .parseDate();

  onEventCalledOnce = (): boolean => this._onEventStub.calledOnce === true;

  resetEventHandlers = () => {
    this._onEventStub.reset();
  };
}
