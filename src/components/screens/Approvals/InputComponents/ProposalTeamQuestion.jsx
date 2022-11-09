import React from 'react';
import AutoComplete from '../../../common/atoms/inputs/AutoComplete';

const NumberQuestion = ({ question }) => {
  return (
    <>
      <AutoComplete
        sectionName={question.section?.sectionName}
        onFocus={() => {}}
        onBlur={() => {}}
        // onChange={this.handlePropsalChange}
        // text={answerValue}
        disabled={false}
      />
    </>
  );
};

export default NumberQuestion;
