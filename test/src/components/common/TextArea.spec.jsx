// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import TextArea from './models/TextAreaModel';

describe('TextArea component', () => {
  const id = 'Fake id';
  const className = 'Fake className';
  const value = 'Fake value';
  const placeholder = 'Fake placeholder';
  const title = 'Fake title';

  describe('rendering', () => {
    it('should render the correct id', () => {
      const wrapper = new TextArea(id, className, placeholder, title);
      expect(wrapper.getId()).toBe(id);
    });

    it('should render the correct Paragraph className', () => {
      const wrapper = new TextArea(id, className, placeholder, title);
      expect(wrapper.getClassName()).toBe('text-area-title');
    });

    it('should render the correct id', () => {
      const wrapper = new TextArea(id, className, placeholder, title);
      expect(wrapper.getId()).toBe(id);
    });

    it('should render the correct TextArea className', () => {
      const wrapper = new TextArea(id, className, placeholder, title);
      expect(wrapper.getTextClassName()).toBe(`text-area-wrapper ${className}`);
    });

    it('should render the correct placeholder', () => {
      const wrapper = new TextArea(id, className, placeholder, title);
      expect(wrapper.getPlaceholder()).toBe(placeholder);
    });
  });

  describe('interactions', () => {
    it('should handle onChange handler', () => {
      const wrapper = new TextArea(id, className, placeholder, title);
      wrapper.doOnChange(value);
      expect(wrapper.getTextValueState()).toBe(value);
    });
  });
});
