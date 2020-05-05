// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import MultiselectItemModel from './models/MultiselectItemModel';

describe('MultiselectItem component', () => {
  const id = 'Fake id';
  const item = 'Fake item';
  const isSelected = false;

  describe('rendering', () => {
    it('should render the correct content', () => {
      const wrapper = new MultiselectItemModel(id, item, isSelected);
      expect(wrapper.getChildren()).toBe(item);
    });
  });

  describe('interactions', () => {
    it('should handle onChange handler', () => {
      const wrapper = new MultiselectItemModel(id, item, isSelected);
      wrapper.doOnClick();
      expect(wrapper.onChangeCalledOnce()).toBe(true);
      wrapper.resetEventHandlers();
    });
  });
});
