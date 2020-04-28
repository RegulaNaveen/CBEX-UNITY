// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import DatePickerModel from './models/DatePickerModel';

describe('DatePicker component', () => {
  const label = 'Label';
  const selectedDay = '4/20/20';

  describe('rendering', () => {
    it('should render all Paragraphs component', () => {
      const wrapper = new DatePickerModel(label, selectedDay);
      expect(wrapper.hasParagraphs()).toBe(true);
    });

    it('should render Label text', () => {
      const wrapper = new DatePickerModel(label, selectedDay);
      expect(wrapper.hasLabel()).toBe(label);
    });

    it('should render DayPicker component', () => {
      const wrapper = new DatePickerModel(label, selectedDay);
      expect(wrapper.hasDayPicker()).toBe(true);
    });
  });

  describe('interactoins', () => {
    it('should execute handleDayChange prop function', () => {
      const wrapper = new DatePickerModel(label, selectedDay);
      wrapper.doHandleDayChange();
      expect(wrapper.onEventCalledOnce()).toBe(true);
      wrapper.resetEventHandlers();
    });

    it('should execute handleFormatDate prop function', () => {
      const wrapper = new DatePickerModel(label, selectedDay);
      wrapper.doHandleFormatDate();
      expect(wrapper.onEventCalledOnce()).toBe(true);
      wrapper.resetEventHandlers();
    });

    it('should execute handleDate prop function', () => {
      const wrapper = new DatePickerModel(label, selectedDay);
      wrapper.doHandleDate();
      expect(wrapper.onEventCalledOnce()).toBe(true);
      wrapper.resetEventHandlers();
    });
  });
});
