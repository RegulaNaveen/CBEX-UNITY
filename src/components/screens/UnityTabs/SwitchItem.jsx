import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import QuestionItem from './QuestionItem';
import StatementItem from './StatementItem';
import { getQuestion } from '../../../redux/selectors';

const SwitchItem = ({
  questionId = '',
  UnityTabSectionTitle = '',
  disabled
}) => {
  const question = useSelector(getQuestion(questionId));
  return question?.answerConfiguration?.type === 'statement' ? (
    <StatementItem
      questionId={questionId}
      UnityTabSectionTitle={UnityTabSectionTitle}
      disabled={disabled}
    />
  ) : (
    <QuestionItem
      questionId={questionId}
      UnityTabSectionTitle={UnityTabSectionTitle}
      disabled={disabled}
    />
  );
};

export default SwitchItem;
