import React from 'react';
import AutoCompleteWithAddOption from '../../../views/modals/AutoCompleteWithAddOption';

const SelectQuestion = ({ question, lastAnswer }) => {
  return (
    <AutoCompleteWithAddOption
      sfObject={question.sfObject}
      sfField={question.sfField}
      lov={question?.answerConfiguration?.options}
      onFocus={() => {}}
      onBlur={() => {}}
      disabled={false}
      answer={lastAnswer.answer}
      // onChange={this.handlePropsalChange}
    />
  );
};

export default SelectQuestion;
