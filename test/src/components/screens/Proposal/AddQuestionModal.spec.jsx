// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import AddQuestionModalModel from './models/AddQuestionModalModel';

describe('AddQuestionModal component', () => {
  const items = [
    {
      id: 0,
      title: 'Item',
      selected: false,
      key: 'Item'
    },
    {
      id: 1,
      title: 'Item',
      selected: false,
      key: 'Item'
    },
    {
      id: 2,
      title: 'Item',
      selected: false,
      key: 'Item'
    },
    {
      id: 3,
      title: 'Item',
      selected: false,
      key: 'Item'
    }
  ];

  const teams = [
    {
      id: 0,
      name: 'Business Analyst Business'
    },
    {
      id: 1,
      name: 'Account Executive'
    },
    {
      id: 2,
      name: 'Business Analyst'
    },
    {
      id: 3,
      name: 'Account Executive'
    }
  ];
  const title = 'Add New Question';
  const label = 'Label';
  const checkboxText = 'Send notification now';
  const cancel = 'Cancel';
  const okay = 'Okay';

  describe('rendering', () => {
    it('should render all Paragraphs component', () => {
      const wrapper = new AddQuestionModalModel(items, teams);
      expect(wrapper.hasParagraphs()).toBe(true);
    });

    it('should render Title text', () => {
      const wrapper = new AddQuestionModalModel(items, teams);
      expect(wrapper.hasTitle()).toBe(title);
    });

    it('should render Label text', () => {
      const wrapper = new AddQuestionModalModel(items, teams);
      expect(wrapper.hasLabel()).toBe(label);
    });

    it('should render Close icon', () => {
      const wrapper = new AddQuestionModalModel(items, teams);
      expect(wrapper.hasCloseIcon()).toBe(true);
    });

    it('should render Text Area component', () => {
      const wrapper = new AddQuestionModalModel(items, teams);
      expect(wrapper.hasTextArea()).toBe(true);
    });

    it('should render correct ammount of Dropdown components', () => {
      const wrapper = new AddQuestionModalModel(items, teams);
      expect(wrapper.hasDropDown()).toBe(true);
    });

    it('should render correct ammount of SelectedTeam components', () => {
      const wrapper = new AddQuestionModalModel(items, teams);
      expect(wrapper.hasSelectedTeam(teams.length)).toBe(true);
    });

    it('should render Checkbox component', () => {
      const wrapper = new AddQuestionModalModel(items, teams);
      expect(wrapper.hasCheckbox()).toBe(true);
      expect(wrapper.hasCheckboxText()).toBe(checkboxText);
    });

    it('should render correct ammount of PrimaryButton components', () => {
      const wrapper = new AddQuestionModalModel(items, teams);
      expect(wrapper.hasPrimaryButton()).toBe(true);
      expect(wrapper.hasCancelPrimaryButtonText()).toBe(cancel);
      expect(wrapper.hasOkayPrimaryButtonText()).toBe(okay);
    });
  });
});
