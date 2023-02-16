import React from 'react';
import Typography from 'apollo-react/components/Typography';
import AnswerInput from './AnswerInput';

function ProposalTeam() {
  return (
    <>
      <Typography
        style={{
          margin: '16px',
          fontSize: '20px',
          color: '#000000',
          fontWeight: 600,
          lineHeight: 1.04
        }}
      >
        Team
      </Typography>
      <hr className="divider-hr-proposal-team" />
      <AnswerInput />
    </>
  );
}

export default ProposalTeam;
