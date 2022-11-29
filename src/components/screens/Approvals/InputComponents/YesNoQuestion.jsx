import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { setProposalAnswerData } from '../../../../redux/actions/proposal-actions';
import YNDropdown from '../../../common/atoms/inputs/Dropdown';

const YesNoQuestion = ({
  question,
  lastAnswer,
  disabled,
  userData,
  socketContext,
  trackMatomoEventSubmitAnswer,
  checkDisableFlag
}) => {
  try {
    const dispatch = useDispatch();
    const { questionLockWrapper, questionUnlockWrapper } = socketContext;
    const optionsYN = ['Yes', 'No'];
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
      <>
        <YNDropdown
          items={optionsYN}
          disabled={checkDisableFlag() || !!disabled}
          questionId={question.questionId}
          value={lastAnswer.answer}
          onClick={val => changeHandler(val, lastAnswer.answer)}
          // onFocus={() => {
          //   questionLockWrapper(question?.questionId);
          // }}
          // onBlur={() => {
          //   questionUnlockWrapper(question?.questionId);
          // }}
        />
      </>
    );
  } catch (error) {
    console.error(error);
    return <p>Error rendering y/n question</p>;
  }
};

YesNoQuestion.defaultProps = {
  disabled: false
};
YesNoQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  lastAnswer: PropTypes.object.isRequired,
  disabled: PropTypes.any,
  userData: PropTypes.any.isRequired,
  socketContext: PropTypes.object.isRequired,
  trackMatomoEventSubmitAnswer: PropTypes.func.isRequired
};

export default YesNoQuestion;
