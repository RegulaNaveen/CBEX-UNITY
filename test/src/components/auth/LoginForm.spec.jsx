// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import LoginFormModel from '../../../models/LoginFormModel';

describe('Login component', () => {
  describe('rendering', () => {
    it('should render Login Form component', () => {
      const wrapper = new LoginFormModel();
      expect(wrapper.hasLoginForm()).toBe(true);
    });

    it('should render two input fields', () => {
      const inputTypeEmail = 'email';
      const inputTypePassword = 'password';
      const inputIdEmail = 'login-input-email';
      const inputIdPassword = 'login-input-password';

      const wrapper = new LoginFormModel();
      expect(wrapper.hasInputField()).toBe(2);

      // Email
      expect(wrapper.getTypeInput()).toBe(inputTypeEmail);
      expect(wrapper.getIdInput()).toBe(inputIdEmail);

      // Password
      expect(wrapper.getTypeInput()).toBe(inputTypePassword);
      expect(wrapper.getIdInput()).toBe(inputIdPassword);
    });

    it('should render a checkbox', () => {
      const checkId = 'remember-username-checkbox';

      const wrapper = new LoginFormModel();
      expect(wrapper.hasCheckBox()).toBe(1);

      expect(wrapper.getIdCheckbox()).toBe(checkId);
    });

    it('should render a primary button', () => {
      const idButton = 'login-button';

      const wrapper = new LoginFormModel();
      expect(wrapper.hasPrimaryButton()).toBe(1);

      expect(wrapper.getIdButton()).toBe(idButton);
    });

    it('should call onEmailChange once', () => {});

    it('should call onPasswordChange once', () => {});

    it('should call handleLogin once', () => {});

    it('should call handleForgotPassword once', () => {});

    it('should render a link button', () => {
      const idButton = 'login-button';

      const wrapper = new LoginFormModel();
      expect(wrapper.hasLinkButton()).toBe(1);

      expect(wrapper.getIdLink()).toBe(idButton);
    });
  });
});
