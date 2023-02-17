import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import AutoCompleteWithAddOption from '../../../views/modals/AutoCompleteWithAddOption';
import { setProposalAnswerData } from '../../../../redux/actions/proposal-actions';

const SelectQuestion = ({
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

  const changeHandler = async textValue => {
    try {
      const { proposalId, questionId } = question;
      await dispatch(
        setProposalAnswerData(
          socketContext,
          proposalId,
          questionId,
          textValue,
          userData
        )
      );
      questionUnlockWrapper(question?.questionId);
      trackMatomoEventSubmitAnswer(textValue);
    } catch (error) {
      console.error(error);
      questionUnlockWrapper(question?.questionId);
    }
  };

  return (
    <AutoCompleteWithAddOption
      multilineFlag={true}
      sfObject={question.sfObject}
      sfField={question.sfField}
      lov={question?.answerConfiguration?.options}
      onFocus={() => {
        questionLockWrapper(question?.questionId);
      }}
      onBlur={() => {
        questionUnlockWrapper(question?.questionId);
      }}
      disabled={checkDisableFlag() || !!disabled}
      answer={lastAnswer.answer}
      onChange={changeHandler}
    />
  );
};

SelectQuestion.defaultProps = {
  disabled: false
};
SelectQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  lastAnswer: PropTypes.object.isRequired,
  disabled: PropTypes.any,
  userData: PropTypes.any.isRequired,
  socketContext: PropTypes.object.isRequired,
  trackMatomoEventSubmitAnswer: PropTypes.func.isRequired
};

export default SelectQuestion;
