// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import DatePickerCustomInputModel from './models/DatePickerCustomInputModel';

describe('DatePickerCustomInput component', () => {
  const value = 'value';

  describe('rendering', () => {
    it('should render correct value prop', () => {
      const wrapper = new DatePickerCustomInputModel(value);
      expect(wrapper.hasInput(value)).toBe(true);
    });
  });

  describe('interactions', () => {
    it('should call onFocus prop function properly', () => {
      const wrapper = new DatePickerCustomInputModel(value);
      wrapper.doFocus();
      expect(wrapper.onEventCalledOnce()).toBe(true);
      wrapper.resetEventHandlers();
    });

    it('should call onBlur prop function properly', () => {
      const wrapper = new DatePickerCustomInputModel(value);
      wrapper.doBlur();
      expect(wrapper.onEventCalledOnce()).toBe(true);
      wrapper.resetEventHandlers();
    });

    it('should call onChange prop function properly', () => {
      const wrapper = new DatePickerCustomInputModel(value);
      wrapper.doChange();
      expect(wrapper.onEventCalledOnce()).toBe(true);
      wrapper.resetEventHandlers();
    });

    it('should call onKeyUp prop function properly', () => {
      const wrapper = new DatePickerCustomInputModel(value);
      wrapper.doKeyUp();
      expect(wrapper.onEventCalledOnce()).toBe(true);
      wrapper.resetEventHandlers();
    });

    it('should call onClick prop function properly', () => {
      const wrapper = new DatePickerCustomInputModel(value);
      wrapper.doClick();
      expect(wrapper.onEventCalledOnce()).toBe(true);
      wrapper.resetEventHandlers();
    });
  });
});
