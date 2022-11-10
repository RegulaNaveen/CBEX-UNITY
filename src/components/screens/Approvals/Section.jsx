import React, { useState, useEffect } from 'react';
import Grid from 'apollo-react/components/Grid';
import { useSelector } from 'react-redux';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ChevronRight from 'apollo-react-icons/ChevronRight';

import { selectProposalQuestions } from '../../../redux/selectors/index';
import QuestionItem from './QuestionItem';
import ActionButtons from './ActionButtons';

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

  const SectionBody = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={8}>
          {ApprovalSectionLeftQuestions?.map(item => (
            <QuestionItem question={questionHash[item] || {}} />
          ))}
        </Grid>
        <Grid item xs={4}>
          {ApprovalSectionRightQuestions?.map(item => (
            <QuestionItem question={questionHash[item] || {}} />
          ))}
        </Grid>
        <Grid item xs={12}>
          <ActionButtons />
        </Grid>
      </Grid>
    );
  };

  return (
    <Accordion
      className="accordion-container"
      expanded={expanded}
      onChange={() => setExpanded(prev => !prev)}
    >
      <AccordionSummary expandIcon={<ChevronRight />}>
        <p className="accordion-title">{ApprovalSectionTitle}</p>
      </AccordionSummary>
      <AccordionDetails>{SectionBody()}</AccordionDetails>
    </Accordion>
  );
};

export default Section;
