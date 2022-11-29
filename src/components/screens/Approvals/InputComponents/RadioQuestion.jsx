import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import RadioQuestion from '../../../common/atoms/inputs/RadioQuestion';
import { setProposalAnswerData } from '../../../../redux/actions/proposal-actions';

const RadioQuestionInput = ({
  question,
  lastAnswer,
  disabled,
  userData,
  socketContext,
  trackMatomoEventSubmitAnswer,
  checkDisableFlag
}) => {
  const dispatch = useDispatch();
  const { questionLockWrapper, questionUnlockWrapper } = socketContext;

  const changeHandler = (selectedValue, lastAns) => {
    const { proposalId, questionId } = question;
    if (lastAns !== selectedValue) {
      dispatch(
        setProposalAnswerData(
          socketContext,
          proposalId,
          questionId,
          selectedValue,
          userData
        )
      );
      trackMatomoEventSubmitAnswer(selectedValue);
    }
  };

  return (
    <RadioQuestion
      value={lastAnswer.answer}
      onClick={val => changeHandler(val, lastAnswer.answer)}
      items={question?.answerConfiguration?.options}
      disabled={checkDisableFlag() || !!disabled}
      onFocus={() => {
        questionLockWrapper(question?.questionId);
      }}
      onBlur={() => {
        questionUnlockWrapper(question?.questionId);
      }}
    />
  );
};

RadioQuestionInput.defaultProps = {
  disabled: false
};
RadioQuestionInput.propTypes = {
  question: PropTypes.object.isRequired,
  lastAnswer: PropTypes.object.isRequired,
  disabled: PropTypes.any,
  userData: PropTypes.any.isRequired,
  socketContext: PropTypes.object.isRequired,
  trackMatomoEventSubmitAnswer: PropTypes.func.isRequired
};

export default RadioQuestionInput;
