import React from 'react';
import { useDispatch } from 'react-redux';
import QuestionDatePicker from '../../../common/atoms/inputs/QuestionDatePicker';
import { parseMomentDate } from '../../../../utils/DateUtils';
import { setProposalAnswerData } from '../../../../redux/actions/proposal-actions';

const DateQuestion = ({
  question,
  lastAnswer,
  userData,
  socketContext,
  trackMatomoEventSubmitAnswer
}) => {
  const dispatch = useDispatch();
  const resetDate = () => {
    const { proposalId, questionId } = question;
    dispatch(
      setProposalAnswerData(
        socketContext,
        proposalId,
        questionId,
        ' ',
        userData
      )
    );
    trackMatomoEventSubmitAnswer(' ');
  };

  const handleDayChange = (selectedDay: string, lastAnswerValue = '') => {
    const { proposalId, questionId } = question;

    if (
      parseMomentDate(lastAnswerValue.trim()) !==
        parseMomentDate(selectedDay.trim()) &&
      selectedDay
    ) {
      dispatch(
        setProposalAnswerData(
          socketContext,
          proposalId,
          questionId,
          selectedDay,
          userData
        )
      );
      trackMatomoEventSubmitAnswer(selectedDay);
    }
  };

  return (
    <QuestionDatePicker
      value={lastAnswer.answer}
      resetDate={resetDate}
      handleDayChange={handleDayChange}
      onFocus={() => {}}
      onBlur={() => {}}
    />
  );
};

export default DateQuestion;
