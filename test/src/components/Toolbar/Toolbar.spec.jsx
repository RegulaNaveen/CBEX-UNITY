// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import ToolbarModel from './models/ToolbarModel';

describe('Toolbar component', () => {
  describe('rendering', () => {
    const titleOne = 'IQVIA™';
    const titleTwo = 'Unity';
    const navaigationHome = 'Home';
    const navaigationProposals = 'Proposals';
    const navaigationQA = 'Q & A';

    it('should render all Paragraphs component', () => {
      const wrapper = new ToolbarModel();
      expect(wrapper.hasParagraphs()).toBe(true);
    });

    it('should render Title One text', () => {
      const wrapper = new ToolbarModel();
      expect(wrapper.getTitleOne()).toBe(titleOne);
    });

    it('should render Title Two text', () => {
      const wrapper = new ToolbarModel();
      expect(wrapper.getTitleTwo()).toBe(titleTwo);
    });

    it('should render navigation Home text', () => {
      const wrapper = new ToolbarModel();
      expect(wrapper.getNavigationHome()).toBe(navaigationHome);
    });

    it('should render navigation Proposals text', () => {
      const wrapper = new ToolbarModel();
      expect(wrapper.getNavigationProposals()).toBe(navaigationProposals);
    });

    it('should render navigation QA text', () => {
      const wrapper = new ToolbarModel();
      expect(wrapper.getNavigationQA()).toBe(navaigationQA);
    });
  });
});
