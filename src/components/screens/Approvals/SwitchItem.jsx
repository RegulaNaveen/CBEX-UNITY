import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import QuestionItem from './QuestionItem';
import StatementItem from './StatementItem';
import { getQuestion } from '../../../redux/selectors';

const SwitchItem = ({
  questionId,
  approvalSectionTitle,
  disabled,
  updateQuestionVisibility,
  highlightQuestionId,
  isQuesFreezed,
  archivedQuestion
}) => {
  const question = isQuesFreezed
    ? archivedQuestion
    : useSelector(getQuestion(questionId));

  return question?.answerConfiguration?.type === 'statement' ? (
    <StatementItem
      questionId={questionId}
      approvalSectionTitle={approvalSectionTitle}
      disabled={disabled}
      updateQuestionVisibility={updateQuestionVisibility}
      highlightQuestionId={highlightQuestionId}
      archivedQuestion={archivedQuestion}
      isQuesFreezed={isQuesFreezed}
    />
  ) : (
    <QuestionItem
      questionId={questionId}
      approvalSectionTitle={approvalSectionTitle}
      disabled={disabled}
      updateQuestionVisibility={updateQuestionVisibility}
      highlightQuestionId={highlightQuestionId}
      archivedQuestion={archivedQuestion}
      isQuesFreezed={isQuesFreezed}
    />
  );
};

export default SwitchItem;
