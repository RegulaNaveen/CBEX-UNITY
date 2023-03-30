import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Calendar from 'apollo-react-icons/Calendar';
import CalendarCheck from 'apollo-react-icons/CalendarCheck';
import { getLastAnswer } from './utils';
import indeterminate from '../../../../img/Indeterminate.svg';
import Tooltip from 'apollo-react/components/Tooltip';
import { CalendarWithMinus, CalendarWithNum } from '../../svg';

const IndeterminateIcon = () => <img src={indeterminate} alt="indeterminate" />;

const CalendarIcon = ({ question }) => {
  const [
    canShowCarryForwardIndication,
    setCanShowCarryForwardIndication
  ] = useState(false);
  const allFlags = useSelector(state => state.proposal.get('eventflag'));

  useEffect(() => {
    let willShowCarryForwardIndication = canShowCarryForwardIndication;
    if (Object.keys(allFlags).length > 0) {
      if (allFlags['carryForwardAnswerFlag']) {
        willShowCarryForwardIndication = true;
      } else {
        willShowCarryForwardIndication = false;
      }

      if (willShowCarryForwardIndication !== canShowCarryForwardIndication) {
        setCanShowCarryForwardIndication(willShowCarryForwardIndication);
      }
    }
  }, [allFlags]);

  const answers = Array.from(question.answers).reverse();
  const { bidAnswerCopy, latestAnsweredBidNo } = question;
  const lastAnswer = getLastAnswer(question);
  const color = {
    unityPredicted: '#0768fd',
    answered: '#00c221',
    unAnswered: '#b7b7b7'
  };

  // Empty Answers are stored with a spaces
  const isAnswerEmpty = answer => isEmpty(answer) || answer === ' ';

  const renderCalendarIcon = () => {
    // calculate to show carry forward indication icon only if flag is enabled
    if (canShowCarryForwardIndication && answers.length > 0) {
      let latestAnswer = null;
      if (Array.isArray(answers)) {
        latestAnswer = answers[0].answer;
      }
      const isLatestAnsRejectedCFA =
        answers[1] &&
        answers[1]['userName'] === 'CarryForwardAnswer' &&
        latestAnswer === ' ';
      const isLatestAnswerCFA =
        answers[0] && answers[0]['userName'] === 'CarryForwardAnswer';
      if (bidAnswerCopy && latestAnsweredBidNo !== null && isLatestAnswerCFA) {
        return (
          <Tooltip
            variant="light"
            title={`Answer derived from bid ${latestAnsweredBidNo}`}
            placement="left"
            tabIndex={-1}
          >
            <span>
              <CalendarWithNum number={latestAnsweredBidNo} />
            </span>
          </Tooltip>
        );
      } else if (
        isLatestAnsRejectedCFA ||
        (!bidAnswerCopy && latestAnsweredBidNo !== null)
      ) {
        return <CalendarWithMinus />;
      }
    }
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
