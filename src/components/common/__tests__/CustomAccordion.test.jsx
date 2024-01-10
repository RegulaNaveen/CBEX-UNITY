import React from 'react';
import { shallow } from 'enzyme';
import CustomAccordion from '../CustomAccordion/CustomAccordion';

describe('CustomAccordion', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<CustomAccordion />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render children', () => {
    const children = <div>Test Children</div>;
    const wrapper = shallow(<CustomAccordion>{children}</CustomAccordion>);
    expect(wrapper.contains(children)).toBe(true);
  });
});
