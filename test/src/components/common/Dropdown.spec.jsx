// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import DropdownModel from './models/DropdownModel';

describe('Dropdown component', () => {
  const items = [
    {
      id: 0,
      title: 'Title',
      selected: false,
      key: 'key'
    },
    {
      id: 1,
      title: 'Title',
      selected: false,
      key: 'key'
    }
  ];

  const id = 'Fake id';
  const placeholder = 'Fake placeholder';
  const title = 'Fake title';

  describe('rendering', () => {
    it('should render proper Title text', () => {
      const wrapper = new DropdownModel(id, placeholder, items, title);
      expect(wrapper.getTitle()).toBe(title);
    });

    it('should render DropdownItem collapsed component when is clicked', () => {
      const wrapper = new DropdownModel(id, placeholder, items, title);
      expect(wrapper.hasItemsRows(items.length)).toBe(true);
    });

    it('should render placeholder text', () => {
      const wrapper = new DropdownModel(id, placeholder, items, title);
      expect(wrapper.hasPlaceholder()).toBe(true);
    });

    it('should render title selected as a placeholder text', () => {
      const wrapper = new DropdownModel(id, placeholder, items, title);
      expect(wrapper.hasItemSelected()).toBe(true);
    });
  });
});
