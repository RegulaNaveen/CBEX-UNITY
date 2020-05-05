// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import LoginFormModel from './models/LoginFormModel';

describe('LoginForm component', () => {
  describe('rendering', () => {
    it('should render two input fields', () => {
      const wrapper = new LoginFormModel(false);
      expect(wrapper.hasInputFields()).toBe(true);
    });

    it('should render a checkbox', () => {
      const wrapper = new LoginFormModel(false);

      expect(wrapper.hasCheckBox()).toBe(true);

      expect(wrapper.getIdCheckbox()).toBe('remember-username-checkbox');
    });

    it('should render a primary button', () => {
      const wrapper = new LoginFormModel(false);
      expect(wrapper.hasPrimaryButton()).toBe(true);
    });

    it('should not render an error message by default', () => {
      const wrapper = new LoginFormModel(false);
      expect(wrapper.hasError()).toBe(false);
      expect(wrapper.getErrorState()).toBe('');
    });
  });

  describe('interactions', () => {
    it('should render an error when empty inputs error message is produced', () => {
      const error = 'Please provide an email and password';
      const wrapper = new LoginFormModel(false);
      wrapper.doLoginClick();
      expect(wrapper.hasError()).toBe(true);
      expect(wrapper.getErrorState()).toBe(error);
    });

    it('should change email state on onEmailChange call', () => {
      const email = 'fake@email.com';
      const wrapper = new LoginFormModel(false);
      expect(wrapper.getEmailState()).toBe('');
      wrapper.doOnEmailChange(email);
      expect(wrapper.getEmailState()).toBe(email);
    });

    it('should change password state on onPasswordChange call', () => {
      const password = 'fakepassword';
      const wrapper = new LoginFormModel(false);
      expect(wrapper.getPasswordState()).toBe('');
      wrapper.doOnPasswordChange(password);
      expect(wrapper.getPasswordState()).toBe(password);
    });

    it('should change isChecked state on handleIsChecked call', () => {
      const wrapper = new LoginFormModel(false);
      expect(wrapper.getIsChecked()).toBe(false);
      wrapper.doHandleIsChecked();
      expect(wrapper.getIsChecked()).toBe(true);
    });

    it('should render an error when invalid email error message is produced', () => {
      const email = 'fake@email';
      const error = 'Invalid email';
      const password = 'fakepassword';
      const wrapper = new LoginFormModel(false);
      wrapper.doOnEmailChange(email);
      wrapper.doOnPasswordChange(password);
      wrapper.doLoginClick();
      expect(wrapper.hasError()).toBe(true);
      expect(wrapper.getErrorState()).toBe(error);
    });

    it('should call doLogin', () => {
      const email = 'fake@email.com';
      const password = 'fakepassword';
      const wrapper = new LoginFormModel(false);
      wrapper.doOnEmailChange(email);
      wrapper.doOnPasswordChange(password);
      wrapper.doLoginClick();
      expect(wrapper.onDoLoginCalledOnce()).toBe(true);
    });
  });
});
