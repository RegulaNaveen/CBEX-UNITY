// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import ToolbarMenuModel from './models/ToolbarMenuModel';

describe('ToolbarMenu component', () => {
  describe('rendering', () => {
    const name = 'Test Name';
    const email = 'Test Name';

    const profileText = 'Profile';
    const settingsText = 'Settings';
    const helpText = 'Help';

    it('should render all Paragraphs component', () => {
      const wrapper = new ToolbarMenuModel(name, email);
      expect(wrapper.hasParagraphs()).toBe(true);
    });

    it('should render Name prop text', () => {
      const wrapper = new ToolbarMenuModel(name, email);
      expect(wrapper.getName()).toBe(name);
    });

    it('should render Email prop text', () => {
      const wrapper = new ToolbarMenuModel(name, email);
      expect(wrapper.getEmail()).toBe(email);
    });

    it('should render Profile text', () => {
      const wrapper = new ToolbarMenuModel(name, email);
      expect(wrapper.getProfileText()).toBe(profileText);
    });

    it('should render Settings text', () => {
      const wrapper = new ToolbarMenuModel(name, email);
      expect(wrapper.getSettingsText()).toBe(settingsText);
    });

    it('should render Help text', () => {
      const wrapper = new ToolbarMenuModel(name, email);
      expect(wrapper.getHelpText()).toBe(helpText);
    });
  });
});
