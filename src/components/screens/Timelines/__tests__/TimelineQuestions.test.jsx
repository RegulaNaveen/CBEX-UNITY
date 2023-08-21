import React from 'react';
import { shallow } from 'enzyme';
import TimelineQuestions from '../TimelineQuestions';

describe('TimelineQuestions', () => {
  const mockQuestion = {
    toJS: jest.fn().mockReturnValue({
      questionId: 1,
      questionText: 'Sample question'
    })
  };

  it('renders the question text', () => {
    const wrapper = shallow(<TimelineQuestions question={mockQuestion} />);
    expect(wrapper.text()).toEqual('Sample question');
  });

  it('calls setDraggedQuestionData on drag start', () => {
    const setDraggedQuestionData = jest.fn();
    const wrapper = shallow(
      <TimelineQuestions
        question={mockQuestion}
        setDraggedQuestionData={setDraggedQuestionData}
      />
    );

    wrapper.find('.timeline-question-listitem').simulate('dragStart');
    expect(setDraggedQuestionData).toHaveBeenCalledWith(mockQuestion.toJS());
  });
});
