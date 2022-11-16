import React from 'react';
import { useDispatch } from 'react-redux';
import RadioQuestion from '../../../common/atoms/inputs/RadioQuestion';
import { setProposalAnswerData } from '../../../../redux/actions/proposal-actions';

const RadioQuestionInput = ({
  question,
  lastAnswer,
  userData,
  socketContext,
  trackMatomoEventSubmitAnswer
}) => {
  const dispatch = useDispatch();

  const changeHandler = (selectedValue: string, lastAnswer: string) => {
    const { proposalId, questionId } = question;
    if (lastAnswer !== selectedValue) {
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
      disabled={false}
      onFocus={() => {}}
      onBlur={() => {}}
    />
  );
};

export default RadioQuestionInput;
