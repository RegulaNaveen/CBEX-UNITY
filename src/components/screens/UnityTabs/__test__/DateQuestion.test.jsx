import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { mount } from 'enzyme';
import DateQuestion from '../InputComponents/DateQuestion';
import QuestionDatePicker from '../../../common/atoms/inputs/QuestionDatePicker';
import { setProposalAnswerData } from '../../../../redux/actions/proposal-actions';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn()
}));

describe('DateQuestion', () => {
  const mockDispatch = jest.fn();
  useDispatch.mockReturnValue(mockDispatch);

  const question = {
    proposalId: 1,
    questionId: 2
  };

  const lastAnswer = {
    answer: '2022-01-01'
  };

  const userData = {};

  const socketContext = {
    questionLockWrapper: jest.fn(),
    questionUnlockWrapper: jest.fn()
  };

  const trackMatomoEventSubmitAnswer = jest.fn();

  const checkDisableFlag = jest.fn().mockReturnValue(false);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    const wrapper = mount(
      <DateQuestion
        question={question}
        lastAnswer={lastAnswer}
        userData={userData}
        socketContext={socketContext}
        trackMatomoEventSubmitAnswer={trackMatomoEventSubmitAnswer}
        checkDisableFlag={checkDisableFlag}
      />
    );

    expect(wrapper.find(QuestionDatePicker).length).toBe(1);
  });

  it('should call setProposalAnswerData and update the answer when handleDayChange is called with a different date', async () => {
    const wrapper = mount(
      <DateQuestion
        question={question}
        lastAnswer={lastAnswer}
        userData={userData}
        socketContext={socketContext}
        trackMatomoEventSubmitAnswer={trackMatomoEventSubmitAnswer}
        checkDisableFlag={checkDisableFlag}
      />
    );

    const selectedDay = '2023-01-01';

    await wrapper
      .find(QuestionDatePicker)
      .props()
      .handleDayChange(selectedDay, lastAnswer.answer);

    expect(socketContext.questionUnlockWrapper).toHaveBeenCalledWith(
      question.questionId
    );
    expect(trackMatomoEventSubmitAnswer).toHaveBeenCalledWith(selectedDay);
  });

  it('should not call setProposalAnswerData when handleDayChange is called with the same date', async () => {
    const wrapper = mount(
      <DateQuestion
        question={question}
        lastAnswer={lastAnswer}
        userData={userData}
        socketContext={socketContext}
        trackMatomoEventSubmitAnswer={trackMatomoEventSubmitAnswer}
        checkDisableFlag={checkDisableFlag}
      />
    );

    const selectedDay = '2022-01-01';

    await wrapper
      .find(QuestionDatePicker)
      .props()
      .handleDayChange(selectedDay, lastAnswer.answer);

    expect(mockDispatch).not.toHaveBeenCalled();

    expect(trackMatomoEventSubmitAnswer).not.toHaveBeenCalled();
  });
});
