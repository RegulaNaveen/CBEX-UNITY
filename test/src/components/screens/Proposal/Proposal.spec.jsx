// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import ProposalModel from './models/ProposalModel';

describe('Proposal component', () => {
  describe('rendering', () => {
    it('should render Proposal Info component', () => {
      const wrapper = new ProposalModel();
      expect(wrapper.hasProposalInfo()).toBe(true);
    });

    it('should render Task List component', () => {
      const wrapper = new ProposalModel();
      expect(wrapper.hasTaskList()).toBe(true);
    });
  });
});
