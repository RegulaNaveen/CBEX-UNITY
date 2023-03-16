import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import QuestionDatePicker from '../../../common/atoms/inputs/QuestionDatePicker';
import { formatTheDate, parseMomentDate } from '../../../../utils/DateUtils';
import { setProposalAnswerData } from '../../../../redux/actions/proposal-actions';

const DateQuestion = ({
  question,
  lastAnswer,
  disabled,
  userData,
  socketContext,
  trackMatomoEventSubmitAnswer,
  checkDisableFlag,
  toggleWatch,
  onCascadeChange,
  forceBlur
}) => {
  const dispatch = useDispatch();
  const { questionLockWrapper, questionUnlockWrapper } = socketContext;
  const resetDate = async () => {
    try {
      const { proposalId, questionId } = question;
      await dispatch(
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
      questionUnlockWrapper(question?.questionId);
      trackMatomoEventSubmitAnswer(' ');
    } catch (error) {
      console.error(error);
      questionUnlockWrapper(question?.questionId);
    }
  };

  const handleDayChange = async (selectedDay, lastAnswerValue = '') => {
    try {
      const { proposalId, questionId } = question;
      if (
        parseMomentDate(lastAnswerValue.trim()) !==
          parseMomentDate(selectedDay.trim()) &&
        selectedDay
      ) {
        await dispatch(
          setProposalAnswerData(
            socketContext,
            proposalId,
            questionId,
            formatTheDate(selectedDay),
            userData,
            null,
            true
          )
        );
        questionUnlockWrapper(question?.questionId);
        trackMatomoEventSubmitAnswer(selectedDay);
      }
    } catch (error) {
      console.error(error);
      questionUnlockWrapper(question?.questionId);
    } finally {
      if (toggleWatch) toggleWatch(false);
    }
  };

  const handleFocus = useCallback(() => {
    questionLockWrapper(question?.questionId);
  }, [socketContext, question]);

  const handleBlur = useCallback(() => {
    questionUnlockWrapper(question?.questionId);
  }, [socketContext, question]);

  return (
    <QuestionDatePicker
      disabled={checkDisableFlag() || !!disabled}
      value={lastAnswer.answer}
      resetDate={resetDate}
      handleDayChange={handleDayChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      toggleWatch={toggleWatch}
      onCascadeChange={onCascadeChange}
      forceBlur={forceBlur}
    />
  );
};

DateQuestion.defaultProps = {
  disabled: false,
  toggleWatch: () => {},
  onCascadeChange: () => {},
  forceBlur: false
};
DateQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  lastAnswer: PropTypes.object.isRequired,
  disabled: PropTypes.any,
  userData: PropTypes.any.isRequired,
  socketContext: PropTypes.object.isRequired,
  trackMatomoEventSubmitAnswer: PropTypes.func.isRequired,
  toggleWatch: PropTypes.func,
  onCascadeChange: PropTypes.func,
  forceBlur: PropTypes.bool
};

export default DateQuestion;
