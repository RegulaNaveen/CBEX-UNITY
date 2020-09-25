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
  customer: string,
  protocolNumber: number,
  phase: number,
  therapeuticArea: string,
  verbatimIndication: string,
  proposalId: string
};

const ProposalCard = ({
  title,
  opportunityName,
  daysRemain,
  dueDate,
  customer,
  protocolNumber,
  phase,
  therapeuticArea,
  verbatimIndication,
  proposalId
}: Props) => {
  function setProposalTypeView({
    currentTarget
  }: SyntheticEvent<HTMLButtonElement>) {
    const { id } = currentTarget;
    localStorage.setItem('proposalTypeView', id);
  }

  return (
    <div className="card">
      <div className="header-section">
        <div>
          <p>{title}</p>
          <p>{opportunityName}</p>
        </div>
        <div>
          <p>{daysRemain}</p>
          <p>Days until Due</p>
        </div>
      </div>

      <div className="info-section">
        <div className="section-data">
          <span>Due Date:</span>
          <span>{dueDate}</span>
        </div>
        <div className="section-data">
          <span>Customer: </span>
          <span>{customer}</span>
        </div>
        <div className="section-data">
          <span>Protocol Number:</span>
          <span>{protocolNumber}</span>
        </div>
        <div className="section-data">
          <span>Phase:</span>
          <span>{phase}</span>
        </div>
        <div className="section-data">
          <span>Therapeutic Area</span>
          <span>{therapeuticArea}</span>
        </div>
        <div className="section-data">
          <span>Verbatim Indication</span>
          <span>{verbatimIndication}</span>
        </div>
      </div>

      <div className="buttons-section">
        <div
          className="button"
          id="questions"
          role="presentation"
          onClick={setProposalTypeView}
        >
          <Link to={`${PROPOSAL}${proposalId}`}>
            <Clipboard />
          </Link>
          <p>Questions</p>
        </div>

        <div
          className="button"
          id="documents"
          role="presentation"
          onClick={setProposalTypeView}
        >
          <Link to={`${PROPOSAL}${proposalId}`}>
            <Folder />
          </Link>
          <p>Documents</p>
        </div>
      </div>

      <div className="link-section">
        <div className="link">
          <Link to={`${PROPOSAL}${proposalId}`}>View Opportunity Hub</Link>
          <RightArrow className="right-arrow" />
        </div>
      </div>
    </div>
  );
};

export default ProposalCard;
