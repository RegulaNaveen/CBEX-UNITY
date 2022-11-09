import React from 'react';
import RadioQuestion from '../../../common/atoms/inputs/RadioQuestion';

const RadioQuestionInput = ({ question, lastAnswer }) => {
  return (
    <RadioQuestion
      value={lastAnswer.answer}
      // onClick={val => this.onClickChange(val, answerValue)}
      items={question?.answerConfiguration?.options}
      disabled={false}
      onFocus={() => {}}
      onBlur={() => {}}
    />
  );
};

export default RadioQuestionInput;
