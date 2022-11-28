import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import QuestionDatePicker from '../../../common/atoms/inputs/QuestionDatePicker';
import { parseMomentDate } from '../../../../utils/DateUtils';
import { setProposalAnswerData } from '../../../../redux/actions/proposal-actions';

const DateQuestion = ({
  question,
  lastAnswer,
  disabled,
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
        userData,
        null,
        true
      )
    );
    trackMatomoEventSubmitAnswer(' ');
  };

  const handleDayChange = (selectedDay, lastAnswerValue = '') => {
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
          userData,
          null,
          true
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
      disabled={!!disabled}
    />
  );
};

DateQuestion.defaultProps = {
  disabled: false
};
DateQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  lastAnswer: PropTypes.object.isRequired,
  disabled: PropTypes.any,
  userData: PropTypes.any.isRequired,
  socketContext: PropTypes.object.isRequired,
  trackMatomoEventSubmitAnswer: PropTypes.func.isRequired
};

export default DateQuestion;
