import React from 'react';
import YNDropdown from '../../../common/atoms/inputs/Dropdown';

const YesNoQuestion = ({ question }) => {
  const optionsYN = ['Yes', 'No'];
  return (
    <>
      <YNDropdown
        items={optionsYN}
        disabled={false}
        questionId={question.questionId}
        // onClick={val => this.onClickChange(val, answerValue)}
        // value={answerValue}
      />
    </>
  );
};

export default YesNoQuestion;
