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
  trackEventSubmitAnswer,
  checkDisableFlag
}) => {
  const dispatch = useDispatch();
  const { questionLockWrapper, questionUnlockWrapper } = socketContext;

  const changeHandler = async (selectedValue, lastAns) => {
    try {
      const { proposalId, questionId } = question;
      if (lastAns !== selectedValue) {
        await dispatch(
          setProposalAnswerData(
            socketContext,
            proposalId,
            questionId,
            selectedValue,
            userData
          )
        );
        questionUnlockWrapper(question?.questionId);
        trackEventSubmitAnswer(selectedValue);
      }
    } catch (error) {
      console.error(error);
      questionUnlockWrapper(question?.questionId);
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
  trackEventSubmitAnswer: PropTypes.func.isRequired
};

export default RadioQuestionInput;
