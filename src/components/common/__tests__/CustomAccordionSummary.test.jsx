import React from 'react';
import { shallow } from 'enzyme';
import CustomAccordionSummary from '../CustomAccordion/CustomAccordionSummary';

describe('<CustomAccordionSummary />', () => {
  it('renders without crashing', () => {
    shallow(<CustomAccordionSummary />);
  });

  it('renders children', () => {
    const wrapper = shallow(
      <CustomAccordionSummary>
        <div>Test</div>
      </CustomAccordionSummary>
    );
    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.contains(<div>Test</div>)).toBeTruthy();
  });

  it('applies custom class name', () => {
    const wrapper = shallow(<CustomAccordionSummary className="test" />);
    expect(wrapper.hasClass('custom-accordion-summary')).toBeTruthy();
    expect(wrapper.hasClass('test')).toBeTruthy();
  });
});
