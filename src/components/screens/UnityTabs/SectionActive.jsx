import React from 'react';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import Grid from 'apollo-react/components/Grid';
import QuestionItem from './QuestionItem';
import { getSelectedBid } from '../../../redux/selectors';

const SectionActive = ({
  UnityTabSectionTitle = '',
  UnityTabSectionQuestions = []
}) => {
  const { isCurrent } = useSelector(getSelectedBid)?.toJS();
  const selectedBidIsCurrent = !!isCurrent;

  return (
    <Grid container className="approval-ques">
      <Grid item xs={12} className="approval-sec-title">
        {UnityTabSectionTitle}
      </Grid>
      <Grid item xs={12} className="approval-ques-left">
        {!isEmpty(UnityTabSectionQuestions) &&
          UnityTabSectionQuestions.map(item => (
            <QuestionItem
              questionId={item}
              UnityTabSectionTitle={UnityTabSectionTitle}
              key={item}
              disabled={!selectedBidIsCurrent}
            />
          ))}
      </Grid>
    </Grid>
  );
};

SectionActive.propTypes = {
  UnityTabSectionTitle: PropTypes.string.isRequired,
  UnityTabSectionQuestions: PropTypes.array.isRequired
};

export default SectionActive;
