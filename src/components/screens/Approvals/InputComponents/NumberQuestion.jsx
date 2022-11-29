import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import TextArea from '../../../common/atoms/inputs/TextArea';
import { setProposalAnswerData } from '../../../../redux/actions/proposal-actions';

const NumberQuestion = ({
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

  const handleTextChange = (textValue, lastAns, editorData) => {
    const { proposalId, questionId } = question;
    questionUnlockWrapper(question?.questionId);
    const s1 = textValue
      .trim()
      .split(' ')
      .filter(v => v.trim().length > 0);
    const s2 = lastAns
      .trim()
      .split(' ')
      .filter(v => v.trim().length > 0);

    if (!isEmpty(textValue.replace(/\r?\n|\r| /g, ''))) {
      if (
        s1.length !== s2.length ||
        s1.join(' ').trim() !== s2.join(' ').trim()
      ) {
        dispatch(
          setProposalAnswerData(
            socketContext,
            proposalId,
            questionId,
            String(textValue).trim(),
            userData,
            editorData,
            true
          )
        );
      }
    } else if (!textValue.trim() && lastAns.trim()) {
      dispatch(
        setProposalAnswerData(
          socketContext,
          proposalId,
          questionId,
          ' ',
          userData,
          editorData,
          true
        )
      );
    }
    trackMatomoEventSubmitAnswer(String(textValue).trim());
  };

  return (
    <>
      <TextArea
        disabled={checkDisableFlag() || !!disabled}
        className="proposal-text-area"
        type="number"
        value={lastAnswer.answer}
        onBlur={handleTextChange}
        onFocus={() => questionLockWrapper(question?.questionId)}
      />
    </>
  );
};

NumberQuestion.defaultProps = {
  disabled: false
};
NumberQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  lastAnswer: PropTypes.object.isRequired,
  disabled: PropTypes.any,
  userData: PropTypes.any.isRequired,
  socketContext: PropTypes.object.isRequired,
  trackMatomoEventSubmitAnswer: PropTypes.func.isRequired
};

export default NumberQuestion;
