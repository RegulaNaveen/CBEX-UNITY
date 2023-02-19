import React from 'react';
import propTypes from 'prop-types';

const TimelineQuestions = ({
  question,
  draggedQuestionData,
  setDraggedQuestionData
}) => {
  const { questionId, questionOrder, questionText } = question.toJS();

  return (
    <li
      key={questionId}
      className="timeline-question-listitem"
      draggable={true}
      onDragStart={() => {
        console.log('tapas ddrag ', question.toJS());
        setDraggedQuestionData(question.toJS());
      }}
    >
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
