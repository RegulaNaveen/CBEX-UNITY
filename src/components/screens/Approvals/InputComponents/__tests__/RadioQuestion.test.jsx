import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import RadioQuestionInput from '../RadioQuestion';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn()
}));

describe('RadioQuestionInput', () => {
  const mockDispatch = jest.fn();
  useDispatch.mockReturnValue(mockDispatch);

  const mockQuestion = {
    questionId: '1',
    answerConfiguration: {
      options: ['Option 1', 'Option 2', 'Option 3']
    }
  };

  const mockLastAnswer = {
    answer: 'Option 1'
  };

  const mockUserData = {};

  const mockSocketContext = {
    questionLockWrapper: jest.fn(),
    questionUnlockWrapper: jest.fn()
  };

  const mockTrackEventSubmitAnswer = jest.fn();
  const mockCheckDisableFlag = jest.fn();

  it('should render RadioQuestion component with correct props', () => {
    const { getByLabelText } = render(
      <RadioQuestionInput
        question={mockQuestion}
        lastAnswer={mockLastAnswer}
        disabled={false}
        userData={mockUserData}
        socketContext={mockSocketContext}
        trackEventSubmitAnswer={mockTrackEventSubmitAnswer}
        checkDisableFlag={mockCheckDisableFlag}
      />
    );

    const radioOption1 = getByLabelText('Option 1');
    const radioOption2 = getByLabelText('Option 2');
    const radioOption3 = getByLabelText('Option 3');

    expect(radioOption1.checked).toBe(true);
    expect(radioOption2.checked).toBe(false);
    expect(radioOption3.checked).toBe(false);
    expect(radioOption1.disabled).toBe(false);
    expect(radioOption2.disabled).toBe(false);
    expect(radioOption3.disabled).toBe(false);
  });

  it('should call dispatch and update answer when a different option is selected', () => {
    const { getByLabelText } = render(
      <RadioQuestionInput
        question={mockQuestion}
        lastAnswer={mockLastAnswer}
        disabled={false}
        userData={mockUserData}
        socketContext={mockSocketContext}
        trackEventSubmitAnswer={mockTrackEventSubmitAnswer}
        checkDisableFlag={mockCheckDisableFlag}
      />
    );
    const radioOption2 = getByLabelText('Option 2');
    fireEvent.click(radioOption2);
    fireEvent.focus(radioOption2);
    fireEvent.blur(radioOption2);
    expect(mockDispatch).toHaveBeenCalled();
  });
});
