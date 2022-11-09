import React from 'react';
import AutoCompleteWithAddOption from '../../../views/modals/AutoCompleteWithAddOption';

const SelectQuestion = ({ question }) => {
  return (
    <AutoCompleteWithAddOption
      sfObject={question.sfObject}
      sfField={question.sfField}
      lov={question?.answerConfiguration?.options}
      onFocus={() => {}}
      onBlur={() => {}}
      disabled={false}
      // answer={answerValue}
      // onChange={this.handlePropsalChange}
    />
  );
};

export default SelectQuestion;
