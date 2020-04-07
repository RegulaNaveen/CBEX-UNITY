// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import Checkbox from '../../../models/CheckboxModel';

describe('Login component', () => {
  const onChanceStub = sinon.stub();
  const id = 'Fake id';
  const value = 'Fake value';
  const name = 'Fake name';
  const onChange = onChanceStub;
  const checked = false;
  const children = 'Fake text';

  describe('remderomg', () => {
    it('should render Checkbox component with the correct props', () => {
      const wrapper = new Checkbox(
        id,
        value,
        name,
        onChange,
        checked,
        children
      );

      expect(wrapper.hasCheckbox()).toBe(true);
    });
  });
});
