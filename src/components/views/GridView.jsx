// @flow
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
import ProposalCard from './ProposalCard';
import { parseMomentDate, remainingDays } from '../../utils/DateUtils';

type Props = {
  data: Array<Object>,
  allFlags: Object
};

const formatProposal = (proposal: Object) => {
  const placeholder = 'No data';
  const dueDate = parseMomentDate(proposal['bid due date']);
  const daysRemain = remainingDays(dueDate);

  const formatted = {
    title: proposal['opportunity number'] || placeholder,
    opportunityName: proposal.opportunityName || placeholder,
    daysRemain,
    dueDate: dueDate || placeholder,
    customer: proposal.customer || placeholder,
    protocolNumber: proposal['protocol number'] || placeholder,
    phase: proposal.phase || placeholder,
    therapeuticArea: proposal.therapeuticArea || placeholder,
    verbatimIndication: proposal['verbatim indication'] || placeholder,
    proposalId: proposal.proposalId || placeholder,
    approvalsCount: proposal.approvalsCount || null,
    isApprovalCountPresent: proposal.isApprovalCountPresent || false,
    isFavourite: proposal.isFavourite || false,
    bidStopStatus: proposal.bidStopStatus || false
  };

  return formatted;
};

class GridView extends Component<Props> {
  renderContent() {
    const { data, allFlags } = this.props;

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
              customer={formatted.customer}
              protocolNumber={formatted.protocolNumber}
              phase={formatted.phase}
              therapeuticArea={formatted.therapeuticArea}
              verbatimIndication={formatted.verbatimIndication}
              proposalId={formatted.proposalId}
              approvalsCount={formatted.approvalsCount}
              isApprovalCountPresent={formatted.isApprovalCountPresent}
              allFlags={allFlags}
              favourite={formatted.isFavourite}
              bidStopStatus={formatted.bidStopStatus}
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
