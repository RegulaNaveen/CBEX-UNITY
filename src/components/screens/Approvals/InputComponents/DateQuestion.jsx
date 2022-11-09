import React from 'react';
import QuestionDatePicker from '../../../common/atoms/inputs/QuestionDatePicker';

const DateQuestion = ({ question, lastAnswer }) => {
  const resetDate = () => {
    // TODO
    // Set proposal answer to empty value
  };
  const handleDayChange = () => {
    // TODO
    // Set proposal answer to empty value
  };

  return (
    <QuestionDatePicker
      value={lastAnswer.answer}
      resetDate={resetDate}
      handleDayChange={handleDayChange}
      onFocus={() => {}}
      onBlur={() => {}}
    />
  );
};

export default DateQuestion;
