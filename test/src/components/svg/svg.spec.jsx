// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import SvgModel from './SvgModel';

import {
  Checkmark,
  Edit,
  Add,
  DropMenu,
  Bell,
  Search,
  User,
  Help,
  Settings,
  Calendar,
  Close,
  CloseCircle
} from '../../../../src/components/svg';

describe('Svg components', () => {
  describe('rendering', () => {
    const className = 'test-class';
    it('should render Checkmark component', () => {
      const wrapper = new SvgModel(Checkmark, className);
      expect(wrapper.hasSvg()).toBe(true);
    });

    it('should render Edit component', () => {
      const wrapper = new SvgModel(Edit, className);
      expect(wrapper.hasSvg()).toBe(true);
    });

    it('should render Add component', () => {
      const wrapper = new SvgModel(Add, className);
      expect(wrapper.hasSvg()).toBe(true);
    });

    it('should render DropMenu component', () => {
      const wrapper = new SvgModel(DropMenu, className);
      expect(wrapper.hasSvg()).toBe(true);
    });

    it('should render Bell component', () => {
      const wrapper = new SvgModel(Bell, className);
      expect(wrapper.hasSvg()).toBe(true);
    });

    it('should render Search component', () => {
      const wrapper = new SvgModel(Search, className);
      expect(wrapper.hasSvg()).toBe(true);
    });

    it('should render User component', () => {
      const wrapper = new SvgModel(User, className);
      expect(wrapper.hasSvg()).toBe(true);
    });

    it('should render Help component', () => {
      const wrapper = new SvgModel(Help, className);
      expect(wrapper.hasSvg()).toBe(true);
    });

    it('should render Settings component', () => {
      const wrapper = new SvgModel(Settings, className);
      expect(wrapper.hasSvg()).toBe(true);
    });

    it('should render Calendar component', () => {
      const wrapper = new SvgModel(Calendar, className);
      expect(wrapper.hasSvg()).toBe(true);
    });

    it('should render Close component', () => {
      const wrapper = new SvgModel(Close, className);
      expect(wrapper.hasSvg()).toBe(true);
    });

    it('should render CloseCircle component', () => {
      const wrapper = new SvgModel(CloseCircle, className);
      expect(wrapper.hasSvg()).toBe(true);
    });
  });
});
