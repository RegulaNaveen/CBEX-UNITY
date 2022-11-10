import React from 'react';
import { useDispatch } from 'react-redux';
import AutoCompleteWithAddOption from '../../../views/modals/AutoCompleteWithAddOption';
import { setProposalAnswerData } from '../../../../redux/actions/proposal-actions';

const SelectQuestion = ({ question, lastAnswer, userData, socketContext }) => {
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
  };

  return (
    <AutoCompleteWithAddOption
      sfObject={question.sfObject}
      sfField={question.sfField}
      lov={question?.answerConfiguration?.options}
      onFocus={() => {}}
      onBlur={() => {}}
      disabled={false}
      answer={lastAnswer.answer}
      onChange={changeHandler}
    />
  );
};

export default SelectQuestion;
