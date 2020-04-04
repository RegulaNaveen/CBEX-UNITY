// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import AppModel from './models/AppModel';
import { LOGIN } from '../src/routes';

describe('App component', () => {
  describe('rendering', () => {
    it('should render a BrowserRouter component', () => {
      const wrapper = new AppModel();
      expect(wrapper.hasBroswerRouter()).toBe(true);
    });

    it('should render a Switch component', () => {
      const wrapper = new AppModel();
      expect(wrapper.hasSwitch()).toBe(true);
    });

    it('should render a Login route with correct props', () => {
      const wrapper = new AppModel();
      expect(wrapper.hasLoginRoute()).toBe(true);
      expect(wrapper.getLoginPath()).toBe(LOGIN);
    });

    it('should render a PrivateRoute component', () => {
      const wrapper = new AppModel();
      expect(wrapper.hasPrivateRoute()).toBe(true);
    });
  });
});
