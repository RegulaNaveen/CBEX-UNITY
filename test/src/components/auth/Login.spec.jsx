// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import LoginModel from '../../../models/LoginModel';

describe('Login component', () => {
  describe('rendering', () => {
    it('should render Login component', () => {
      const wrapper = new LoginModel();
      expect(wrapper.hasLogin()).toBe(true);
    });

    it('should have an image', () => {
      const wrapper = new LoginModel();
      expect(wrapper.hasAnImage()).toBe(true);
    });
  });
});
