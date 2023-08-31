import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import QuestionItem from './QuestionItem';
import StatementItem from './StatementItem';
import { getQuestion } from '../../../redux/selectors';

const SwitchItem = ({
  questionId,
  approvalSectionTitle,
  key,
  disabled,
  updateQuestionVisibility,
  highlightQuestionId
}) => {
  const question = useSelector(getQuestion(questionId));
  return question?.answerConfiguration?.type === 'statement' ? (
    <StatementItem
      questionId={questionId}
      approvalSectionTitle={approvalSectionTitle}
      disabled={disabled}
      updateQuestionVisibility={updateQuestionVisibility}
      highlightQuestionId={highlightQuestionId}
    />
  ) : (
    <QuestionItem
      questionId={questionId}
      approvalSectionTitle={approvalSectionTitle}
      disabled={disabled}
      updateQuestionVisibility={updateQuestionVisibility}
      highlightQuestionId={highlightQuestionId}
    />
  );
};

export default SwitchItem;
