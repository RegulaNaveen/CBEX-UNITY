import React from 'react';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';
import Typography from 'apollo-react/components/Typography';
import QuestionLabel from '../QuestionLabel';

describe('QuestionLabel', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<QuestionLabel questionLabel="Test question" />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the correct question label text', () => {
    const questionLabel = 'Test question';
    const wrapper = shallow(<QuestionLabel questionLabel={questionLabel} />);
    expect(wrapper.find(Typography).text()).toEqual(questionLabel);
  });
});
