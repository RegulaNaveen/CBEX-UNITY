// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import InputField from '../../../models/InputFieldModel';

describe('InputField component', () => {
  describe('rendering', () => {
    it('should render InputField component with the correct props', () => {
      const onChanceStub = sinon.stub();
      const title = 'Fake title';
      const placeholder = 'Fake placeholder';
      const onChange = onChanceStub;
      const type = 'Fake type';
      const id = 'Fake id';
      const wrapper = new InputField(title, placeholder, onChange, type, id);

      expect(wrapper.getTitleInputField()).toBe(title);
      expect(wrapper.getPlaceholderInput()).toBe(placeholder);
      expect(wrapper.getOnChangeInputField()).toBe(onChange);
      expect(wrapper.getTypeInputField()).toBe(type);
      expect(wrapper.getIdInputField()).toBe(id);
    });
  });
});
