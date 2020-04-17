// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import PrimaryButtonModel from './models/PrimaryButtonModel';
import LinkButtonModel from './models/LinkButtonModel';

describe('Button component', () => {
  describe('rendering', () => {
    const id = 'Fake id';
    const children = 'Fake text';
    const type = 'button';

    describe('PrimaryButton component', () => {
      describe('rendering', () => {
        it('should render the correct id', () => {
          const wrapper = new PrimaryButtonModel(id, children, type);
          expect(wrapper.getId()).toBe(id);
        });

        it('should render the correct children', () => {
          const wrapper = new PrimaryButtonModel(id, children, type);
          expect(wrapper.getChildren()).toBe(children);
        });

        it('should render the correct type', () => {
          const wrapper = new PrimaryButtonModel(id, children, type);
          expect(wrapper.getType()).toBe(type);
        });
      });

      describe('interactions', () => {
        it('should handle onChange event handler', () => {
          const wrapper = new PrimaryButtonModel(id, children, type);
          wrapper.doClick();
          expect(wrapper.onClickCalledOnce()).toBe(true);
          wrapper.resetEventHandlers();
        });
      });
    });

    describe('LinkButton component', () => {
      describe('rendering', () => {
        it('should render the correct id', () => {
          const wrapper = new LinkButtonModel(id, children, type);
          expect(wrapper.getId()).toBe(id);
        });

        it('should render the correct children', () => {
          const wrapper = new LinkButtonModel(id, children, type);
          expect(wrapper.getChildren()).toBe(children);
        });

        it('should render the correct type', () => {
          const wrapper = new LinkButtonModel(id, children, type);
          expect(wrapper.getType()).toBe(type);
        });
      });

      describe('interactions', () => {
        it('should handle onChange event handler', () => {
          const wrapper = new LinkButtonModel(id, children, type);
          wrapper.doClick();
          expect(wrapper.onClickCalledOnce()).toBe(true);
          wrapper.resetEventHandlers();
        });
      });
    });
  });
});
