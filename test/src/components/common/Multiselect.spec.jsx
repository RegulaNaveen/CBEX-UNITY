// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import MultiselecModel from './models/MultiselectModel';

describe('Multiselect component', () => {
  const id = 'Fake id';
  const placeholder = 'Fake placeholder';
  const title = 'Fake title';

  const items = ['item 1', 'item 2', 'item 3'];

  describe('rendering', () => {
    it('should render Title text', () => {
      const wrapper = new MultiselecModel(id, placeholder, items, title);
      expect(wrapper.getTitle()).toBe(title);
    });

    it('should render MultiselectItem collapsed component', () => {
      const wrapper = new MultiselecModel(id, placeholder, items, title);
      wrapper.doClick();
      expect(wrapper.hasItemsRows(items.length)).toBe(true);
    });

    it('should render placeholder text', () => {
      const wrapper = new MultiselecModel(id, placeholder, items, title);
      expect(wrapper.getPlaceholder()).toBe(placeholder);
    });

    it('should render correct options when clicked on MultiselectItem', () => {
      const fakeValue = ['Fake Value'];
      const fakeItem = ['Fake Value, '];
      const wrapper = new MultiselecModel(
        id,
        placeholder,
        items,
        title,
        fakeValue
      );

      wrapper.doClick();
      wrapper.doClickOnItem();
      expect(wrapper.getSelectedItem()).toEqual(fakeItem);
    });
  });

  describe('interactions', () => {
    it('should collapse when clicked', () => {
      const wrapper = new MultiselecModel(id, placeholder, items, title);
      wrapper.doClick();
      expect(wrapper.isCollapsed()).toBe(true);
    });
  });
});
