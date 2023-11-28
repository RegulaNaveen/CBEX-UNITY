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
  trackEventSubmitAnswer,
  checkDisableFlag,
  toggleWatch,
  onCascadeChange,
  forceBlur
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
      trackEventSubmitAnswer(textValue);
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
      toggleWatch={toggleWatch}
      onCascadeChange={onCascadeChange}
      forceBlur={forceBlur}
    />
  );
};

SelectQuestion.defaultProps = {
  disabled: false,
  toggleWatch: () => {},
  onCascadeChange: () => {},
  forceBlur: false
};
SelectQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  lastAnswer: PropTypes.object.isRequired,
  disabled: PropTypes.any,
  userData: PropTypes.any.isRequired,
  socketContext: PropTypes.object.isRequired,
  trackEventSubmitAnswer: PropTypes.func.isRequired,
  toggleWatch: PropTypes.func,
  onCascadeChange: PropTypes.func,
  forceBlur: PropTypes.bool
};

export default SelectQuestion;
