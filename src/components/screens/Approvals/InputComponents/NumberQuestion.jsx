import React from 'react';
import TextArea from '../../../common/atoms/inputs/TextArea';

const NumberQuestion = ({ question }) => {
  return (
    <>
      <TextArea
        className="proposal-text-area"
        type="number"
        // onBlur={this.handleTextChange}
        // value={answerValue || ''}
      />
    </>
  );
};

export default NumberQuestion;
