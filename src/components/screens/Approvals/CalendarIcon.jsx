import React from 'react';
import isEmpty from 'lodash/isEmpty';
import Calendar from 'apollo-react-icons/Calendar';
import CalendarCheck from 'apollo-react-icons/CalendarCheck';
import { getLastAnswer } from './utils';
import indeterminate from '../../../../img/Indeterminate.svg';

const IndeterminateIcon = () => <img src={indeterminate} alt="indeterminate" />;

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
    // No Answers i.e lastAnswer is an Empty Object {}
    if (Object.keys(lastAnswer).length === 0) {
      return (
        <Calendar
          data-testid="noanswers-icon"
          style={{ color: color.unAnswered }}
        />
      );
    }
    // UnityPredictedAnswer
    if (
      !isAnswerEmpty(lastAnswer.answer) &&
      lastAnswer?.userName === 'UnityPredictedAnswer'
    ) {
      return (
        <CalendarCheck
          data-testid="unity-predicted-calender-icon"
          style={{ color: color.unityPredicted }}
        />
      );
    }
    // Answered
    if (!isAnswerEmpty(lastAnswer.answer)) {
      return (
        <CalendarCheck
          data-testid="unity-nonpredicted-calender-icon"
          style={{ color: color.answered }}
        />
      );
    }
    // Indertermined | Unanswered
    return <IndeterminateIcon data-testid="indeterminate-icon" />;
  };
  return renderCalendarIcon();
};

export default CalendarIcon;
