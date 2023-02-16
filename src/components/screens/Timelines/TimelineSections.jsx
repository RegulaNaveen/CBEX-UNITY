import React from 'react';
import Accordion from 'apollo-react/components/Accordion';
import AccordionDetails from 'apollo-react/components/AccordionDetails';
import AccordionSummary from 'apollo-react/components/AccordionSummary';
import Typography from 'apollo-react/components/Typography';
import propTypes from 'prop-types';
import TimelineQuestions from './TimelineQuestions';
import { OrderedMap } from 'immutable';

const TimelineSections = ({ sectionName, sectionOrder, questions }) => {
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
                return <TimelineQuestions question={question} />;
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
  sectionOrder: '',
  questions: new OrderedMap(),
};

TimelineSections.propTypes = {
  sectionName: propTypes.string,
  sectionOrder: propTypes.string,
  questions: propTypes.map,
};

export default TimelineSections;
