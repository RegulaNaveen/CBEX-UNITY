import React from 'react';
import { shallow } from 'enzyme';
import ChipView from '../Chip/ChipView';

describe('ChipView', () => {
  it('should render null for empty label', () => {
    const wrapper = shallow(<ChipView label="" />);
    expect(wrapper.type()).toBeNull();
  });

  it('should render Tag with correct props for string label', () => {
    const wrapper = shallow(<ChipView label="Test Label" />);
    const tag = wrapper.find('Tag');
    expect(tag.prop('label')).toBe('Test Label');
    expect(tag.prop('variant')).toBe('blue');
  });

  it('should render null for invalid object label', () => {
    const label = { toJS: () => null };
    const wrapper = shallow(<ChipView label={label} />);
    expect(wrapper.type()).toBeNull();
  });
});
