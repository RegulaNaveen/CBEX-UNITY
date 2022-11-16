import React from 'react';
import { useDispatch } from 'react-redux';
import { setProposalAnswerData } from '../../../../redux/actions/proposal-actions';
import YNDropdown from '../../../common/atoms/inputs/Dropdown';

const YesNoQuestion = ({
  question,
  lastAnswer,
  userData,
  socketContext,
  trackMatomoEventSubmitAnswer
}) => {
  try {
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
    const optionsYN = ['Yes', 'No'];
    return (
      <>
        <YNDropdown
          items={optionsYN}
          disabled={false}
          questionId={question.questionId}
          value={lastAnswer.answer}
          onClick={val => changeHandler(val, lastAnswer.answer)}
        />
      </>
    );
  } catch (error) {
    console.error(error);
    return <p>Error rendering y/n question</p>;
  }
};

export default YesNoQuestion;
