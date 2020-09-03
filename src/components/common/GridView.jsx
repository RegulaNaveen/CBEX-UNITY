// @flow
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import ProposalCard from './ProposalCard';
import { formatDate, dateDiffInDays } from '../../utils/DateUtils';

type Props = {
  data: [Object]
};

const formatProposal = (proposal: Object) => {
  const dueDate = new Date(proposal['bid due date']);
  const daysRemain = dateDiffInDays(dueDate);

  const formatted = {
    title: proposal['opportunity #'],
    opportunityName: proposal.opportunityName,
    daysRemain,
    dueDate: formatDate(dueDate, 'dd-MMM-yyyy'),
    account: proposal.account,
    protocolNumber: proposal['protocol #'],
    phase: proposal.phase,
    therapeuticArea: proposal.therapeuticArea,
    verbatimIndication: proposal.indication,
    proposalId: proposal.proposalId
  };

  return formatted;
};

const GridView = ({ data }: Props) => (
  <div id="grid-view">
    {data.map(proposal => {
      const {
        title,
        opportunityName,
        daysRemain,
        dueDate,
        account,
        protocolNumber,
        phase,
        therapeuticArea,
        verbatimIndication,
        proposalId
      } = formatProposal(proposal);
      return (
        <ProposalCard
          key={uuidv4()}
          title={title}
          opportunityName={opportunityName}
          daysRemain={daysRemain}
          dueDate={dueDate}
          account={account}
          protocolNumber={protocolNumber}
          phase={phase}
          therapeuticArea={therapeuticArea}
          verbatimIndication={verbatimIndication}
          proposalId={proposalId}
        />
      );
    })}
  </div>
);

export default GridView;
