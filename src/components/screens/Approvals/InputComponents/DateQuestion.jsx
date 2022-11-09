import React from 'react';
import QuestionDatePicker from '../../../common/atoms/inputs/QuestionDatePicker';

const DateQuestion = ({ question }) => {
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
      // value={answerValue}
      resetDate={resetDate}
      handleDayChange={handleDayChange}
      onFocus={() => {}}
      onBlur={() => {}}
    />
  );
};

export default DateQuestion;
