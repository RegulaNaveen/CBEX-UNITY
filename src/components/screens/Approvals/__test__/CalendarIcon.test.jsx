import React from 'react';
import { shallow } from 'enzyme';
import CalendarIcon from '../CalendarIcon';

describe('CalendarIcon', () => {
  it('renders the noanswers icon when last answer is an empty object', () => {
    const question = { answers: [{}] };
    const wrapper = shallow(<CalendarIcon question={question} />);
    const icon = wrapper.find('[data-testid="noanswers-icon"]');
    expect(icon.prop('style')).toEqual({ color: '#b7b7b7' });
  });

  it('renders the unity-predicted-calender-icon when the last answer is predicted by Unity', () => {
    const question = {
      answers: [{ answer: 'Some answer', userName: 'UnityPredictedAnswer' }],
    };
    const wrapper = shallow(<CalendarIcon question={question} />);
    const icon = wrapper.find('[data-testid="unity-predicted-calender-icon"]');
    expect(icon.prop('style')).toEqual({ color: '#0768fd' });
  });

  it('renders the unity-nonpredicted-calender-icon when the last answer is not predicted by Unity', () => {
    const question = {
      answers: [{ answer: 'Some answer', userName: 'Some User' }],
    };
    const wrapper = shallow(<CalendarIcon question={question} />);
    const icon = wrapper.find(
      '[data-testid="unity-nonpredicted-calender-icon"]'
    );
    expect(icon.prop('style')).toEqual({ color: '#00c221' });
  });

  it('renders the indeterminate icon when the last answer is empty or has spaces', () => {
    const question = {
      answers: [{ answer: '  ' }],
    };
    const wrapper = shallow(<CalendarIcon question={question} />);
    expect(wrapper.find('[data-testid="indeterminate-icon"]').exists()).toBe(
      false
    );
  });
});
