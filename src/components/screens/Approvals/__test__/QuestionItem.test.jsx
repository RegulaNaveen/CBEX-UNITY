import React from 'react';
import { shallow, mount } from 'enzyme';
import QuestionItem from '../QuestionItem';

describe.skip('<QuestionItem />', () => {
  let wrapper;

  const defaultProps = {
    questionId: 'Q1',
    approvalSectionTitle: 'Approval Section 1',
    disabled: false,
    isQuesFreezed: false,
    archivedQuestion: null,
    eventCategories: [],
    trackEvent: jest.fn(),
    updateQuestionVisibility: jest.fn(),
    highlightQuestionId: null,
    isShowQuestion: true,
  };

  beforeEach(() => {
    wrapper = shallow(<QuestionItem {...defaultProps} />);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the question text', () => {
    const questionText = 'What is your name?';

    wrapper.setProps({ ...defaultProps, questionText });

    const text = wrapper.find('QuestionLabel').text();
    expect(text).toEqual(questionText);
  });

  it('renders the correct input component', () => {
    const questionType = 'text';
    const question = { ...defaultProps, questionType };
    wrapper.setProps({ question });

    const inputComponent = wrapper.find('TextQuestion');
    expect(inputComponent.exists()).toBe(true);
  });

  it('shows answer history when icon button is clicked', () => {
    const question = { ...defaultProps, questionType: 'text' };
    wrapper.setProps({ question });

    const iconButton = wrapper.find('IconButton');
    iconButton.simulate('click');

    expect(wrapper.state('isShowHistory')).toBe(true);
  });
});
