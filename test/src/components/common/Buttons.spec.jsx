// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import PrimaryButton from './models/PrimaryButtonModel';
import LinkButton from './models/LinkButtonModel';

describe('Button component', () => {
  describe('rendering', () => {
    const onChanceStub = sinon.stub();
    const id = 'Fake id';
    const children = 'Fake text';
    const type = 'Fake type';
    const onChange = onChanceStub;

    it('should render PrimaryButton component with the correct props', () => {
      const wrapper = new PrimaryButton(id, children, type, onChange);

      expect(wrapper.getIdPrimaryButton()).toBe(id);
      expect(wrapper.getChildrenPrimaryButton()).toBe(children);
      expect(wrapper.getTypePrimaryButton()).toBe(type);
      expect(wrapper.getOnChangePrimaryButton()).toBe(onChange);
    });

    it('should render LinkButton component with the correct props', () => {
      const wrapper = new LinkButton(id, children, type, onChange);

      expect(wrapper.getIdLinkButton()).toBe(id);
      expect(wrapper.getChildrenLinkButton()).toBe(children);
      expect(wrapper.getTypeLinkButton()).toBe(type);
      expect(wrapper.getOnChangeLinkButton()).toBe(onChange);
    });
  });
});
