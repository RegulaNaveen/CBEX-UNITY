// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import PrivateRouteModel from './models/PrivateRouteModel';
import { LOGIN } from '../src/routes';

describe('PrivateRoute component', () => {
  const node = 'Fake Node';
  describe('rendering', () => {
    it('should render a Route component', () => {
      const wrapper = new PrivateRouteModel(node);
      expect(wrapper.hasRoute()).toBe(true);
    });

    it('should render children if isAuthenticated is true', () => {
      localStorage.setItem('isLoggedin', 'true');
      const wrapper = new PrivateRouteModel(node);
      expect(wrapper.getRenderedChildren()).toBe(node);
      localStorage.removeItem('isLoggedin');
    });

    it('should redirect to login if isAuthenticated is false', () => {
      const wrapper = new PrivateRouteModel(node);
      expect(wrapper.getRedirectToPath()).toBe(LOGIN);
    });
  });
});
