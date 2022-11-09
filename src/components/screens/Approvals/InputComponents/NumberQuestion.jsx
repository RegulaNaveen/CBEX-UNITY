import React from 'react';
import TextArea from '../../../common/atoms/inputs/TextArea';

const NumberQuestion = ({ question, lastAnswer }) => {
  return (
    <>
      <TextArea
        className="proposal-text-area"
        type="number"
        value={lastAnswer.answer}
      />
    </>
  );
};

export default NumberQuestion;
