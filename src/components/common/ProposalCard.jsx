// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Folder, Clipboard, RightArrow } from '../svg';
import { PROPOSAL } from '../../routes';

type Props = {
  title: string,
  opportunityName: string,
  daysRemain: number,
  dueDate: string,
  account: string,
  protocolNumber: number,
  phase: number,
  therapeuticArea: string,
  verbatimIndication: string,
  proposalId: string
};

// TODO: Replace Link to prop in Documents.
const ProposalCard = ({
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
}: Props) => (
  <div className="card">
    <div className="header-section">
      <div>
        <p className="title">{title}</p>
        <p className="proposal-name">{opportunityName}</p>
      </div>
      <div>
        <p className="remain-days">{daysRemain}</p>
        <p className="info-days">Days until Due</p>
      </div>
    </div>
    <div className="info-section">
      <p>Due Date:</p>
      <p>{dueDate}</p>
      <p>Account: </p>
      <p>{account}</p>
      <p>Protocol Number:</p>
      <p>{protocolNumber}</p>
      <p>Phase:</p>
      <p>{phase}</p>
      <p>Therapeutic Area</p>
      <p>{therapeuticArea}</p>
      <p>Verbatim Indication</p>
      <p>{verbatimIndication}</p>
    </div>
    <div className="buttons-section">
      <Link to={`${PROPOSAL}${proposalId}`} className="link-icon">
        <Clipboard className="icon" />
      </Link>
      <p className="questions">Questions</p>
      <Link to={PROPOSAL} className="link-icon">
        <Folder className="icon" />
      </Link>
      <p className="documents">Documents</p>
    </div>
    <div className="link-section">
      <Link to={`${PROPOSAL}${proposalId}`}>View Opportunity Hub</Link>
      <RightArrow className="right-arrow" />
    </div>
  </div>
);

export default ProposalCard;
