import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import QuestionItem from './QuestionItem';
import StatementItem from './StatementItem';
import { getQuestion } from '../../../redux/selectors';

const SwitchItem = ({
  questionId = '',
  UnityTabSectionTitle = '',
  disabled,
  tabId
}) => {
  const question = useSelector(getQuestion(questionId));
  return question?.answerConfiguration?.type === 'statement' ? (
    <StatementItem
      data-testId="statement-item"
      questionId={questionId}
      UnityTabSectionTitle={UnityTabSectionTitle}
      disabled={disabled}
    />
  ) : (
    <QuestionItem
      data-testId="question-item"
      questionId={questionId}
      UnityTabSectionTitle={UnityTabSectionTitle}
      disabled={disabled}
      tabId = {tabId}
    />
  );
};

export default SwitchItem;
