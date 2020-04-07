// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import LoginModel from '../../../models/LoginModel';

describe('Login component', () => {
  describe('remderomg', () => {
    it('should render Login component', () => {
      const wrapper = new LoginModel();
      expect(wrapper.hasLoginForm()).toBe(true);
    });

    it('should have a image', () => {
      const wrapper = new LoginModel();
      expect(wrapper.hasAnImage()).toBe(1);
    });
  });
});
