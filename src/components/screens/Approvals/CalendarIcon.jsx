import React from 'react';
import isEmpty from 'lodash/isEmpty';
import Calendar from 'apollo-react-icons/Calendar';
import CalendarCheck from 'apollo-react-icons/CalendarCheck';
import getLastAnswer from './getLastAnswer';

const CalendarIcon = ({ question }) => {
  const lastAnswer = getLastAnswer(question);
  const color = {
    unityPredicted: '#0768fd',
    answered: '#00c221',
    unAnswered: '#b7b7b7'
  };

  // Empty Answers are stored with a spaces
  const isAnswerEmpty = answer => isEmpty(answer) || answer === ' ';

  const renderCalendarIcon = () => {
    // UnityPredictedAnswer
    if (
      !isAnswerEmpty(lastAnswer.answer) &&
      lastAnswer?.userName === 'UnityPredictedAnswer'
    ) {
      return <CalendarCheck style={{ color: color.unityPredicted }} />;
    }
    // Answered
    if (!isAnswerEmpty(lastAnswer.answer)) {
      return <CalendarCheck style={{ color: color.answered }} />;
    }
    // Unanswered
    return <Calendar style={{ color: color.unAnswered }} />;
  };
  return renderCalendarIcon();
};

export default CalendarIcon;
