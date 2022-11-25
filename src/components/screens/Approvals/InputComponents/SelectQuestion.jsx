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
  trackMatomoEventSubmitAnswer
}) => {
  const dispatch = useDispatch();

  const changeHandler = textValue => {
    const { proposalId, questionId } = question;
    dispatch(
      setProposalAnswerData(
        socketContext,
        proposalId,
        questionId,
        textValue,
        userData
      )
    );
    trackMatomoEventSubmitAnswer(textValue);
  };

  return (
    <AutoCompleteWithAddOption
      sfObject={question.sfObject}
      sfField={question.sfField}
      lov={question?.answerConfiguration?.options}
      onFocus={() => {}}
      onBlur={() => {}}
      disabled={!!disabled}
      answer={lastAnswer.answer}
      onChange={changeHandler}
    />
  );
};

SelectQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  lastAnswer: PropTypes.object.isRequired,
  disabled: PropTypes.any.isRequired,
  userData: PropTypes.any.isRequired,
  socketContext: PropTypes.object.isRequired,
  trackMatomoEventSubmitAnswer: PropTypes.func.isRequired
};

export default SelectQuestion;
