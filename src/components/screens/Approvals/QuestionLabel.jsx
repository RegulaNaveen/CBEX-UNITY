import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'apollo-react/components/Typography';
import RichTextEditor from 'apollo-react/components/RichTextEditor';

const QuestionLabel = React.forwardRef(
  ({ questionJSON, questionLabel }, questionTextRef1) =>
    questionJSON ? (
      <RichTextEditor
        style={{ minHeight: '0px' }}
        variant="view"
        defaultValue={JSON.parse(questionJSON)}
        ref={questionTextRef1}
      />
    ) : (
      <Typography className="ques-title">{questionLabel}</Typography>
    )
);

QuestionLabel.propTypes = {
  questionLabel: PropTypes.string.isRequired
};

export default QuestionLabel;
