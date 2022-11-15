import React, { useState, useEffect } from 'react';
import Grid from 'apollo-react/components/Grid';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import AccordionDetails from '@material-ui/core/AccordionDetails';

import { selectProposalQuestions } from '../../../redux/selectors/index';
import QuestionItem from './QuestionItem';
import ActionButtons from './ActionButtons';
import CustomAccordion from '../../common/CustomAccordion/CustomAccordion';
import CustomAccordionSummary from '../../common/CustomAccordion/CustomAccordionSummary';

const generateQuestionsHash = proposalQuestions => {
  try {
    const hash = {};
    if (Array.isArray(proposalQuestions)) {
      // Filter questions on the current template
      const templateQuestions = proposalQuestions.filter(item => item.active);
      if (Array.isArray(templateQuestions) && templateQuestions.length > 0) {
        templateQuestions.forEach(question => {
          hash[question.questionId] = question;
        });
      }
    }
    return hash;
  } catch (error) {
    console.error(error);
    return {};
  }
};

const Section = ({ approval }) => {
  const proposalQuestions = useSelector(selectProposalQuestions);
  const [questionHash, setQuestionHash] = useState({});

  useEffect(() => {
    setQuestionHash(generateQuestionsHash(proposalQuestions));
  }, [proposalQuestions]);

  const {
    ApprovalSectionTitle = '',
    ApprovalSectionLeftQuestions,
    ApprovalSectionRightQuestions
  } = approval;
  const [expanded, setExpanded] = useState(false);

  const renderSectionBody = (
    <Grid container className="approval-ques">
      <Grid item xs={8} className="approval-ques-left">
        {ApprovalSectionLeftQuestions?.map(item => (
          <QuestionItem question={questionHash[item] || {}} />
        ))}
      </Grid>
      <Grid item xs={4} className="approval-ques-right">
        {ApprovalSectionRightQuestions?.map(item => (
          <QuestionItem question={questionHash[item] || {}} />
        ))}
      </Grid>
      <Grid item xs={12} className="approval-ques-actions">
        <ActionButtons />
      </Grid>
    </Grid>
  );

  return (
    <CustomAccordion
      className="accordion-container"
      expanded={expanded}
      onChange={() => setExpanded(prev => !prev)}
    >
      <CustomAccordionSummary>
        <p className="accordion-title">{ApprovalSectionTitle}</p>
      </CustomAccordionSummary>
      <AccordionDetails>{renderSectionBody}</AccordionDetails>
    </CustomAccordion>
  );
};

Section.propTypes = {
  approval: PropTypes.object.isRequired
};

export default Section;
