// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import DropdownItemModel from './models/DropdownItemModel';

describe('DropdowItem component', () => {
  const id = 'Fake id';
  const item = 'Fake item';

  describe('rendering', () => {
    it('should render the correct name', () => {
      const wrapper = new DropdownItemModel(id, item);
      expect(wrapper.getChildren()).toBe(item);
    });
  });

  describe('interactions', () => {
    it('should handle onChange handler', () => {
      const wrapper = new DropdownItemModel(id, item);
      wrapper.doOnClick();
      expect(wrapper.onChangeCalledOnce()).toBe(true);
      wrapper.resetEventHandlers();
    });
  });
});
