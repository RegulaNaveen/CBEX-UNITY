// @flow
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
import ProposalCard from './ProposalCard';
import {
  parseMomentDate,
  getRemainingDays,
  parseCorrectDate
} from '../../utils/DateUtils';
import { getNextMilestone } from '../../utils/utils';

type Props = {
  data: Array<Object>,
  allFlags: Object,
  tabIndex: Number
};

const formatProposal = (proposal: Object) => {
  const placeholder = 'No data';
  const dueDate = parseMomentDate(parseCorrectDate(proposal['bid due date']));
  const daysRemain = getRemainingDays(dueDate);

  const formatted = {
    title: proposal['opportunity number'] || placeholder,
    opportunityName: proposal.opportunityName || placeholder,
    daysRemain,
    customer: proposal.customer || placeholder,
    bidNo: proposal['bidNo'] || placeholder,
    dueDate: dueDate || placeholder,
    protocolNumber: proposal['protocol number'] || placeholder,
    phase: proposal.phase || placeholder,
    therapeuticArea: proposal.therapeuticArea || placeholder,
    verbatimIndication: proposal['verbatim indication'] || placeholder,
    opportunityStage: proposal['opportunity status'] || placeholder,
    proposalId: proposal.proposalId || placeholder,
    approvalsCount: proposal.approvalsCount || null,
    isApprovalCountPresent: proposal.isApprovalCountPresent || false,
    isFavourite: proposal.isFavourite || false,
    bidStopStatus: proposal.bidStopStatus || false,
    customName: proposal.customName || '',
    nextMilestone: getNextMilestone(proposal.nextMilestone),
    bidType: proposal.bidType || placeholder
  };

  return formatted;
};

class GridView extends Component<Props> {
  renderContent() {
    const { data, allFlags, tabIndex } = this.props;

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
              tabIndex={tabIndex}
              title={formatted.title}
              opportunityName={formatted.opportunityName}
              daysRemain={formatted.daysRemain}
              customer={formatted.customer}
              bidNo={formatted.bidNo}
              dueDate={formatted.dueDate}
              protocolNumber={formatted.protocolNumber}
              phase={formatted.phase}
              therapeuticArea={formatted.therapeuticArea}
              verbatimIndication={formatted.verbatimIndication}
              opportunityStage={formatted.opportunityStage}
              proposalId={formatted.proposalId}
              approvalsCount={formatted.approvalsCount}
              isApprovalCountPresent={formatted.isApprovalCountPresent}
              allFlags={allFlags}
              favourite={formatted.isFavourite}
              bidStopStatus={formatted.bidStopStatus}
              customName={formatted.customName}
              proposalDetails={proposal}
              nextMilestone={formatted.nextMilestone}
              bidType={formatted.bidType}
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
