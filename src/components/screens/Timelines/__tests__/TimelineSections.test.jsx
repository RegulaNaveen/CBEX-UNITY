import React from 'react';
import { shallow } from 'enzyme';
import { OrderedMap } from 'immutable';
import TimelineSections from '../TimelineSections';
import TimelineQuestions from '../TimelineQuestions';

describe('TimelineSections', () => {
  it('renders correctly with default props', () => {
    const wrapper = shallow(<TimelineSections />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the section title correctly', () => {
    const sectionName = 'Example Section';
    const wrapper = shallow(<TimelineSections sectionName={sectionName} />);
    // const sectionTitle = wrapper.find('[data-testid="timeline-section-title"]');
    expect(
      wrapper.find('[data-testid="timeline-section-title"]').text()
    ).toEqual(' Example Section');
  });
});
