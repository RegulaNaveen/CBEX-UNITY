// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import ModalModel from './models/ModalModel';

describe('Modal component', () => {
  const children = 'Fake children';

  describe('rendering', () => {
    it('should render the correct children', () => {
      const wrapper = new ModalModel(children);
      expect(wrapper.getChildren()).toBe(children);
    });
  });
});
