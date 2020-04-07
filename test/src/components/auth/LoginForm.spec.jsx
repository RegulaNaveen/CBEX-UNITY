// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import LoginFormModel from '../../../models/LoginFormModel';

describe('Login component', () => {
  describe('remderomg', () => {
    it('should render Login Form component', () => {
      const wrapper = new LoginFormModel();
      expect(wrapper.hasLoginForm()).toBe(true);
    });

    it('should render two input fields', () => {
      const wrapper = new LoginFormModel();
      expect(wrapper.hasInputField()).toBe(2);
    });

    it('should render a checkbox', () => {
      const wrapper = new LoginFormModel();
      expect(wrapper.hasCheckBox()).toBe(1);
    });

    it('should render a primary button', () => {
      const wrapper = new LoginFormModel();
      expect(wrapper.hasPrimaryButton()).toBe(1);
    });

    it('should render a link button', () => {
      const wrapper = new LoginFormModel();
      expect(wrapper.hasLinkButton()).toBe(1);
    });
  });
});
