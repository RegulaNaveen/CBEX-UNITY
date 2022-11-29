import React from 'react';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import Grid from 'apollo-react/components/Grid';
import QuestionItem from './QuestionItem';
import ActionButtons from './ActionButtons';

const SectionActive = ({
  ApprovalSectionId,
  ApprovalSectionTitle = '',
  ApprovalSectionLeftQuestions: leftQues = [],
  ApprovalSectionRightQuestions: rightQues = []
}) => {
  const questionHash = useSelector(state => state.approvals.quesHashData);
  console.log({ questionHash });

  return (
    <Grid container className="approval-ques">
      <Grid item xs={12} className="approval-sec-title">
        {ApprovalSectionTitle}
      </Grid>
      <Grid item xs={8} className="approval-ques-left">
        {!isEmpty(leftQues) &&
          leftQues.map(item => (
            <QuestionItem
              question={questionHash[item] || {}}
              approvalSectionTitle={ApprovalSectionTitle}
              key={item}
            />
          ))}
      </Grid>
      <Grid item xs={4} className="approval-ques-right">
        {!isEmpty(rightQues) &&
          rightQues.map(item => (
            <QuestionItem
              question={questionHash[item] || {}}
              approvalSectionTitle={ApprovalSectionTitle}
              key={item}
            />
          ))}
      </Grid>
      <Grid item xs={12} className="approval-ques-actions">
        <ActionButtons sectionId={ApprovalSectionId} />
      </Grid>
    </Grid>
  );
};

SectionActive.propTypes = {
  ApprovalSectionId: PropTypes.string.isRequired,
  ApprovalSectionTitle: PropTypes.string.isRequired,
  ApprovalSectionLeftQuestions: PropTypes.array.isRequired,
  ApprovalSectionRightQuestions: PropTypes.array.isRequired
};

export default SectionActive;
