// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import Checkbox from '../../../models/CheckboxModel';

describe('Checkbox component', () => {
  describe('rendering', () => {
    it('should render Checkbox component with the correct props', () => {
      const onChanceStub = sinon.stub();
      const id = 'Fake id';
      const value = 'Fake value';
      const name = 'Fake name';
      const onChange = onChanceStub;
      const checked = false;
      const children = 'Fake text';
      const wrapper = new Checkbox(
        id,
        value,
        name,
        onChange,
        checked,
        children
      );

      expect(wrapper.hasCheckbox()).toBe(true);
      expect(wrapper.getIdCheckbox()).toBe(id);
      expect(wrapper.getValueCheckbox()).toBe(value);
      expect(wrapper.getNameCheckbox()).toBe(name);
      expect(wrapper.getOnChangeCheckbox()).toBe(onChange);
      expect(wrapper.getCheckedCheckbox()).toBe(checked);
      expect(wrapper.getChildrenCheckbox()).toBe(children);
    });
  });
});
