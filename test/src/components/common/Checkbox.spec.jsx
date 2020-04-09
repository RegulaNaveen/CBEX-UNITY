// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import Checkbox from './models/CheckboxModel';

describe('Checkbox component', () => {
  const id = 'Fake id';
  const value = 'Fake value';
  const name = 'Fake name';
  const checked = false;
  const children = 'Fake text';

  describe('rendering', () => {
    it('should render the correct id', () => {
      const wrapper = new Checkbox(id, value, name, checked, children);
      expect(wrapper.getId()).toBe(id);
    });

    it('should render the correct name', () => {
      const wrapper = new Checkbox(id, value, name, checked, children);
      expect(wrapper.getName()).toBe(name);
    });

    it('should render the correct value', () => {
      const wrapper = new Checkbox(id, value, name, checked, children);
      expect(wrapper.getValue()).toBe(value);
    });

    it('shoulkd render the correct checked value', () => {
      const wrapper = new Checkbox(id, value, name, checked, children);
      expect(wrapper.getChecked()).toBe(checked);
    });

    it('should render the correct children', () => {
      const wrapper = new Checkbox(id, value, name, checked, children);
      expect(wrapper.getChildren()).toBe(children);
    });
  });

  describe('interactions', () => {
    it('should handle onChange handler', () => {
      const wrapper = new Checkbox(id, value, name, checked, children);
      wrapper.doOnChange();
      expect(wrapper.onChangeCalledOnce()).toBe(true);
      wrapper.resetEventHandlers();
    });
  });
});
