import React from 'react';
import RadioQuestion from '../../../common/atoms/inputs/RadioQuestion';

const RadioQuestionInput = ({ question }) => {
  return (
    <RadioQuestion
      // value={answerValue}
      // onClick={val => this.onClickChange(val, answerValue)}
      // items={finalOptions}
      items={['foo', 'bar']}
      disabled={false}
      onFocus={() => {}}
      onBlur={() => {}}
    />
  );
};

export default RadioQuestionInput;
