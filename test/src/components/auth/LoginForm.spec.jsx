// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import LoginFormModel from './models/LoginFormModel';

describe('LoginForm component', () => {
  describe('rendering', () => {
    it('should render two input fields', () => {
      const wrapper = new LoginFormModel();
      expect(wrapper.hasInputFields()).toBe(true);
    });

    it('should render a checkbox', () => {
      const wrapper = new LoginFormModel();

      expect(wrapper.hasCheckBox()).toBe(true);

      expect(wrapper.getIdCheckbox()).toBe('remember-username-checkbox');
    });

    it('should render a primary button', () => {
      const wrapper = new LoginFormModel();
      expect(wrapper.hasPrimaryButton()).toBe(true);
    });

    it('should render a link button', () => {
      const wrapper = new LoginFormModel();
      expect(wrapper.hasLinkButton()).toBe(true);
    });
  });

  describe('interactions', () => {
    it('should change email state on onEmailChange call', () => {
      const email = 'fake@email.com';
      const wrapper = new LoginFormModel();
      expect(wrapper.getEmailState()).toBe('');
      wrapper.doOnEmailChange(email);
      expect(wrapper.getEmailState()).toBe(email);
    });

    it('should change password state on onPasswordChange call', () => {
      const password = 'fakepassword';
      const wrapper = new LoginFormModel();
      expect(wrapper.getPasswordState()).toBe('');
      wrapper.doOnPasswordChange(password);
      expect(wrapper.getPasswordState()).toBe(password);
    });

    it('should change isChecked state on handleIsChecked call', () => {
      const wrapper = new LoginFormModel();
      expect(wrapper.getIsChecked()).toBe(false);
      wrapper.doHandleIsChecked();
      expect(wrapper.getIsChecked()).toBe(true);
    });
  });
});
