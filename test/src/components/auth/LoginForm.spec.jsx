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

    it('should call onEmailChange once', () => {});

    it('should call onPasswordChange once', () => {});

    it('should call handleLogin once', () => {});

    it('should call handleForgotPassword once', () => {});

    it('should render a link button', () => {
      const wrapper = new LoginFormModel();
      expect(wrapper.hasLinkButton()).toBe(true);
    });
  });
});
