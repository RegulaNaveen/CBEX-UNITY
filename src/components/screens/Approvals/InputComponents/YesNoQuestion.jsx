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
  checkDisableFlag,
  toggleWatch,
  onCascadeChange,
  forceBlur
}) => {
  try {
    const dispatch = useDispatch();
    const { questionLockWrapper, questionUnlockWrapper } = socketContext;
    const optionsYN = ['Yes', 'No'];
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
          trackMatomoEventSubmitAnswer(selectedValue);
        }
      } catch (error) {
        console.error(error);
        questionUnlockWrapper(question?.questionId);
      }
    };

    return (
      <>
        <YNDropdown
          data-testid="YNFropdown-yes-no question"
          items={optionsYN}
          disabled={checkDisableFlag() || !!disabled}
          questionId={question.questionId}
          value={lastAnswer.answer}
          onClick={val => changeHandler(val, lastAnswer.answer)}
          onFocus={() => {
            questionLockWrapper(question?.questionId);
          }}
          onBlur={() => {
            questionUnlockWrapper(question?.questionId);
          }}
          toggleWatch={toggleWatch}
          onCascadeChange={onCascadeChange}
          forceBlur={forceBlur}
        />
      </>
    );
  } catch (error) {
    console.error(error);
    return <p>Error rendering y/n question</p>;
  }
};

YesNoQuestion.defaultProps = {
  disabled: false,
  toggleWatch: () => {},
  onCascadeChange: () => {},
  forceBlur: false
};
YesNoQuestion.propTypes = {
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

export default YesNoQuestion;
