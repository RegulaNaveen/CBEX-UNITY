// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Folder, Clipboard, RightArrow } from '../svg';
import { OPPORTUNITY } from '../../routes';
import House from 'apollo-react-icons/House';

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
          <span><b>Customer:</b> </span>
          <span
            className={
              customer === 'No data' ? 'no-data-placeholder' : undefined
            }
          >
            {customer}
          </span>
        </div>
        <div className="section-data">
          <span><b>Protocol Number:</b></span>
          <span
            className={
              protocolNumber === 'No data' ? 'no-data-placeholder' : undefined
            }
          >
            {protocolNumber}
          </span>
        </div>
        <div className="section-data">
          <span><b>Phase:</b></span>
          <span
            className={phase === 'No data' ? 'no-data-placeholder' : undefined}
          >
            {phase}
          </span>
        </div>
        <div className="section-data">
          <span><b>Therapeutic Area</b></span>
          <span
            className={
              therapeuticArea === 'No data' ? 'no-data-placeholder' : undefined
            }
          >
            {therapeuticArea}
          </span>
        </div>
        <div className="section-data">
          <span><b>Verbatim Indication</b></span>
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
          <span><b>Bid Due Date:</b></span>
          <span
            className={
              dueDate === 'No data' ? 'no-data-placeholder' : undefined
            }
          >
            {dueDate}
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
          <Link to={`${OPPORTUNITY}${title}`}>
            <House fontSize="large" htmlColor="#b350bf"></House>
          </Link>
          <p>Questions</p>
        </div>

        <div
          className="button"
          id="documents"
          role="presentation"
          onClick={setProposalTypeView}
        >
          <Link to={`${OPPORTUNITY}${title}`}>
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
            <p>Days until Bid Due</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalCard;
