import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'apollo-react/components/Typography';

const QuestionLabel = ({ questionLabel }) => {
  return <Typography className="ques-title">{questionLabel}</Typography>;
};

QuestionLabel.propTypes = {
  questionLabel: PropTypes.string.isRequired
};

export default QuestionLabel;
