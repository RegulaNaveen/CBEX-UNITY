// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import ToolbarModel from './models/ToolbarModel';

describe('Toolbar component', () => {
  describe('rendering', () => {
    const titleOne = 'IQVIA™';
    const titleTwo = 'Unity';
    // TODO: Uncomment and test when navigation is implemented
    // const navaigationHome = 'Home';
    const navaigationProposals = 'Proposals';
    // TODO: Uncomment and test when navigation is implemented
    // const navaigationQA = 'Q & A';

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

    // TODO: Uncomment and test when navigation is implemented
    // it('should render navigation Home text', () => {
    //   const wrapper = new ToolbarModel();
    //   expect(wrapper.getNavigationHome()).toBe(navaigationHome);
    // });

    it('should render navigation Proposals text', () => {
      const wrapper = new ToolbarModel();
      expect(wrapper.getNavigationProposals()).toBe(navaigationProposals);
    });

    // TODO: Uncomment and test when navigation is implemented
    // it('should render navigation QA text', () => {
    //   const wrapper = new ToolbarModel();
    //   expect(wrapper.getNavigationQA()).toBe(navaigationQA);
    // });

    it('should not render collapsed components by default', () => {
      const wrapper = new ToolbarModel();
      expect(wrapper.hasToolbarMenu()).toBe(false);
    });
  });

  describe('interactions', () => {
    it('should render collapsed components when menu title is clicked', () => {
      const wrapper = new ToolbarModel();
      wrapper.doClick();
      expect(wrapper.hasToolbarMenu()).toBe(true);
    });

    it('should render collapsed components when button keyPress enter triggers on menu title', () => {
      const wrapper = new ToolbarModel();
      wrapper.doEnterKeyPress();
      expect(wrapper.hasToolbarMenu()).toBe(true);
    });
  });
});
