// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Folder, Clipboard, RightArrow } from '../svg';
import { PROPOSAL } from '../../routes';

type Props = {
  title: string,
  opportunityName: string,
  daysRemain: number | string,
  dueDate: string,
  customer: string,
  protocolNumber: string,
  phase: string,
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
  bidNo,
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
          <p
            className={title === 'No data' ? 'no-data-placeholder' : undefined}
          >
            {title}
          </p>
          <p
            className={
              opportunityName === 'No data' ? 'no-data-placeholder' : undefined
            }
          >
            {opportunityName}
          </p>
        </div>
      </div>

      <div className="info-section">
        <div className="section-data">
          <span>Due Date:</span>
          <span
            className={
              dueDate === 'No data' ? 'no-data-placeholder' : undefined
            }
          >
            {dueDate}
          </span>
        </div>
        <div className="section-data">
          <span>Customer: </span>
          <span
            className={
              customer === 'No data' ? 'no-data-placeholder' : undefined
            }
          >
            {customer}
          </span>
        </div>
        <div className="section-data">
          <span>Protocol Number:</span>
          <span
            className={
              protocolNumber === 'No data' ? 'no-data-placeholder' : undefined
            }
          >
            {protocolNumber}
          </span>
        </div>
        <div className="section-data">
          <span>Phase:</span>
          <span
            className={phase === 'No data' ? 'no-data-placeholder' : undefined}
          >
            {phase}
          </span>
        </div>
        <div className="section-data">
          <span>Therapeutic Area</span>
          <span
            className={
              therapeuticArea === 'No data' ? 'no-data-placeholder' : undefined
            }
          >
            {therapeuticArea}
          </span>
        </div>
        <div className="section-data">
          <span>Verbatim Indication</span>
          <span
            className={
              verbatimIndication === 'No data'
                ? 'no-data-placeholder'
                : undefined
            }
          >
            {verbatimIndication}
          </span>
        </div>
        <div className="section-data">
          <span>Current Bid</span>
          <span
            className={
              bidNo === 'No data'
                ? 'no-data-placeholder'
                : undefined
            }
          >
            {bidNo}
          </span>
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

        <div
          className="button"
          id="documents"
          role="presentation"
          onClick={setProposalTypeView}
        >
         <div>
            <p>{daysRemain}</p>
            <p>Days until Due</p>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default ProposalCard;
