/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React from 'react';
import Accordion from 'apollo-react/components/Accordion';
import AccordionDetails from 'apollo-react/components/AccordionDetails';
import AccordionSummary from 'apollo-react/components/AccordionSummary';
import Typography from 'apollo-react/components/Typography';
import propTypes from 'prop-types';
import { OrderedMap } from 'immutable';
import TimelineQuestions from './TimelineQuestions';

const TimelineSections = ({
  sectionName,
  sectionOrder,
  questions,
  draggedQuestionData,
  setDraggedQuestionData
}) => {
  return (
    <>
      <Accordion defaultExpanded={sectionOrder === 1} style={{ width: '100%' }}>
        <AccordionSummary>
          <Typography
            className="section-tile"
            data-testid="timeline-section-title"
          >
            {' '}
            {sectionName}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul
            className="timeline-questions-list-container"
            data-testid="timeline-timeline-questions-list-container"
          >
            {questions.valueSeq().map(question => {
              if (question.get('answerConfiguration').get('type') === 'date') {
                return (
                  <TimelineQuestions
                    key={question.get('questionId')}
                    question={question}
                    draggedQuestionData={draggedQuestionData}
                    setDraggedQuestionData={setDraggedQuestionData}
                  />
                );
              }
            })}
          </ul>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

TimelineSections.defaultProps = {
  sectionName: '',
  sectionOrder: 0,
  questions: new OrderedMap(),
  draggedQuestionData: {},
  setDraggedQuestionData: () => {}
};

TimelineSections.propTypes = {
  sectionName: propTypes.string,
  sectionOrder: propTypes.number,
  questions: propTypes.object,
  draggedQuestionData: propTypes.object,
  setDraggedQuestionData: propTypes.func
};

export default TimelineSections;
