// @flow
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
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

class GridView extends Component<Props> {
  renderContent() {
    const { data } = this.props;

    if (isEmpty(data))
      return (
        <div className="no-info">
          <p>No data to show</p>
        </div>
      );

    return (
      <div
        className={classNames('grid-view', { 'is-centered': data.length > 1 })}
      >
        {data.map(proposal => {
          const formatted = formatProposal(proposal);

          return (
            <ProposalCard
              key={uuidv4()}
              title={formatted.title}
              opportunityName={formatted.opportunityName}
              daysRemain={formatted.daysRemain}
              dueDate={formatted.dueDate}
              account={formatted.account}
              protocolNumber={formatted.protocolNumber}
              phase={formatted.phase}
              therapeuticArea={formatted.therapeuticArea}
              verbatimIndication={formatted.verbatimIndication}
              proposalId={formatted.proposalId}
            />
          );
        })}
      </div>
    );
  }

  render() {
    return this.renderContent();
  }
}

export default GridView;
