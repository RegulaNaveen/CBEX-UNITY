import React from 'react';
import propTypes from 'prop-types';

const TimelineQuestions = ({ question }) => {
  const { questionId, questionOrder, questionText } = question.toJS();

  return (
    <li key={questionId} className="timeline-question-listitem">
      {questionText}
    </li>
  );
};

TimelineQuestions.defaultProps = {
  question: {}
};

TimelineQuestions.prototypes = {
  question: propTypes.object
};

export default TimelineQuestions;
