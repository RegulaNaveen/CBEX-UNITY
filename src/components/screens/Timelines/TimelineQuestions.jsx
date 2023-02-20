import React from 'react';
import propTypes from 'prop-types';

const TimelineQuestions = ({ question, setDraggedQuestionData }) => {
  const { questionId, questionText } = question.toJS();

  return (
    <li
      key={questionId}
      className="timeline-question-listitem"
      draggable
      onDragStart={() => {
        setDraggedQuestionData(question?.toJS());
      }}
    >
      {questionText}
    </li>
  );
};

TimelineQuestions.defaultProps = {
  question: {},
  setDraggedQuestionData: () => {}
};

TimelineQuestions.propTypes = {
  question: propTypes.object,
  setDraggedQuestionData: propTypes.object
};

export default TimelineQuestions;
