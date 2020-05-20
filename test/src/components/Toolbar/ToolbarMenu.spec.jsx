// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import ToolbarMenuModel from './models/ToolbarMenuModel';

describe('ToolbarMenu component', () => {
  const name = 'Test Name';
  const email = 'Test Name';

  // TODO: Add constants to use in tests for ToolbarMenu Options when implemented
  // const profileText = 'Profile';
  // const settingsText = 'Settings';
  // const helpText = 'Help';

  describe('rendering', () => {
    // it('should render all Paragraphs component', () => {
    //   const wrapper = new ToolbarMenuModel(name, email);
    //   expect(wrapper.hasParagraphs()).toBe(true);
    // });

    it('should render Name prop text', () => {
      const wrapper = new ToolbarMenuModel(name, email);
      expect(wrapper.hasName()).toBe(name);
    });

    it('should render Email prop text', () => {
      const wrapper = new ToolbarMenuModel(name, email);
      expect(wrapper.hasEmail()).toBe(email);
    });

    // TODO: Add tests for ToolbarMenu Options when implemented
    // it('should render Profile text', () => {
    //   const wrapper = new ToolbarMenuModel(name, email);
    //   expect(wrapper.hasProfileText()).toBe(profileText);
    // });

    // it('should render Profile icon', () => {
    //   const wrapper = new ToolbarMenuModel(name, email);
    //   expect(wrapper.hasProfileIcon()).toBe(true);
    // });

    // it('should render Settings text', () => {
    //   const wrapper = new ToolbarMenuModel(name, email);
    //   expect(wrapper.hasSettingsText()).toBe(settingsText);
    // });

    // it('should render Settings icon', () => {
    //   const wrapper = new ToolbarMenuModel(name, email);
    //   expect(wrapper.hasSettingsIcon()).toBe(true);
    // });

    // it('should render Help text', () => {
    //   const wrapper = new ToolbarMenuModel(name, email);
    //   expect(wrapper.hasHelpText()).toBe(helpText);
    // });

    // it('should render Help icon', () => {
    //   const wrapper = new ToolbarMenuModel(name, email);
    //   expect(wrapper.hasHelpIcon()).toBe(true);
    // });
  });

  describe('interactions', () => {
    it('should execute handleLogout function properly', () => {
      const wrapper = new ToolbarMenuModel(name, email);
      wrapper.handleEventOnClick();
      expect(wrapper.onHandleEventCalledOnce()).toBe(true);
      wrapper.resetEventHandlers();
    });

    it('should execute onKeyPress function with Enter', () => {
      const wrapper = new ToolbarMenuModel(name, email);
      wrapper.handleEventOnKeyPress('Enter');
      expect(wrapper.onHandleEventCalledOnce()).toBe(true);
      wrapper.resetEventHandlers();
    });

    it('should execute onKeyPress function with any other key', () => {
      const wrapper = new ToolbarMenuModel(name, email);
      wrapper.handleEventOnKeyPress('k');
      expect(wrapper.onHandleEventCalledOnce()).toBe(false);
      wrapper.resetEventHandlers();
    });
  });
});
