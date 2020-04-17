// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import SelectTeam from './models/SelectTeamModel';

describe('SelectTeam component', () => {
  const children = 'Fake id';

  describe('rendering', () => {
    it('should render the correct children', () => {
      const wrapper = new SelectTeam(children);
      expect(wrapper.getChildren()).toBe(children);
    });

    it('should render the correct Paragraph className', () => {
      const wrapper = new SelectTeam(children);
      expect(wrapper.getTitleClassName()).toBe('selected-team-title');
    });

    it('should render Icon component', () => {
      const wrapper = new SelectTeam(children);
      expect(wrapper.hasIcon()).toBe(true);
    });
  });

  describe('interactions', () => {
    it('should handle onClick handler', () => {
      const wrapper = new SelectTeam(children);
      wrapper.doOnClick();
      expect(wrapper.onChangeCalledOnce()).toBe(true);
      wrapper.resetEventHandlers();
    });
  });
});
