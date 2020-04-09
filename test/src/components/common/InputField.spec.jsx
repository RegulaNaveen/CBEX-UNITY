// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import InputField from './models/InputFieldModel';

describe('InputField component', () => {
  const title = 'Fake title';
  const placeholder = 'Fake placeholder';
  const type = 'Fake type';
  const id = 'Fake id';
  describe('rendering', () => {
    it('should render the correct id', () => {
      const wrapper = new InputField(title, placeholder, type, id);
      expect(wrapper.getId()).toBe(id);
    });

    it('should render the correct title', () => {
      const wrapper = new InputField(title, placeholder, type, id);
      expect(wrapper.getTitle()).toBe(title);
    });

    it('should render the correct placeholder', () => {
      const wrapper = new InputField(title, placeholder, type, id);
      expect(wrapper.getPlaceholder()).toBe(placeholder);
    });

    it('should render the correct type', () => {
      const wrapper = new InputField(title, placeholder, type, id);
      expect(wrapper.getType()).toBe(type);
    });
  });

  describe('interactions', () => {
    it('should handle onChange handler', () => {
      const wrapper = new InputField(title, placeholder, type, id);
      wrapper.doOnChange();
      expect(wrapper.onChangeCalledOnce()).toBe(true);
      wrapper.resetEventHandlers();
    });
  });
});
