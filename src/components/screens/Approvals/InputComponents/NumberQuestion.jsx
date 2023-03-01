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

  const handleTextChange = async (textValue, lastAns = ' ', editorData) => {
    try {
      const { proposalId, questionId } = question;
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
          await dispatch(
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
          questionUnlockWrapper(question?.questionId);
          trackMatomoEventSubmitAnswer(String(textValue).trim());
        } else {
          questionUnlockWrapper(question?.questionId);
        }
      } else if (!textValue.trim() && lastAns.trim()) {
        await dispatch(
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
        questionUnlockWrapper(question?.questionId);
        trackMatomoEventSubmitAnswer(String(textValue).trim());
      } else {
        questionUnlockWrapper(question?.questionId);
      }
    } catch (error) {
      console.error(error);
      questionUnlockWrapper(question?.questionId);
    }
  };

  return (
    <>
      <TextArea
        disabled={checkDisableFlag() || !!disabled}
        className="proposal-text-area"
        data-testid="proposal--text--area"
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
