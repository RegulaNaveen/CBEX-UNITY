import React from 'react';
import AutoComplete from '../../../common/atoms/inputs/AutoComplete';

const ProposalTeamQuestion = ({ question, lastAnswer }) => {
  return (
    <>
      <AutoComplete
        sectionName={question.section?.sectionName}
        onFocus={() => {}}
        onBlur={() => {}}
        // onChange={this.handlePropsalChange}
        text={lastAnswer.answer}
        disabled={false}
      />
    </>
  );
};

export default ProposalTeamQuestion;
