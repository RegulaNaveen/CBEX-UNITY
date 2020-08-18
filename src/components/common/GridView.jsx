// @flow
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import ProposalCard from './ProposalCard';

type Props = {
  data: [Object]
};

const GridView = ({ data }: Props) => {
  return (
    <div id="grid-view">
      {data.map(proposal => {
        return (
          <ProposalCard
            key={uuidv4()}
            title={proposal.title}
            opportunityName={proposal.opportunityName}
            daysRemain={proposal.daysRemain}
            dueDate={proposal.dueDate}
            account={proposal.account}
            protocolNumber={proposal.protocolNumber}
            phase={proposal.phase}
            therapeuticArea={proposal.therapeuticArea}
            verbatimIndication={proposal.verbatimIndication}
            proposalId={proposal.proposalId}
          />
        );
      })}
    </div>
  );
};

export default GridView;
