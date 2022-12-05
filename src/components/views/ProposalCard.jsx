// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import ThumbsUp from 'apollo-react-icons/ThumbsUp';
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
  proposalId: string,
  approvalsCount: any,
  isApprovalCountPresent: Boolean
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
  proposalId,
  approvalsCount,
  isApprovalCountPresent
}: Props) => {
  function setProposalTypeView({
    currentTarget
  }: SyntheticEvent<HTMLButtonElement>) {
    const { id } = currentTarget;
    localStorage.setItem('proposalTypeView', id);
  }
  const NO_DATA = 'No data';
  const NO_DATA_PLACEHOLDER = 'no-data-placeholder';
  const CLASS_SECTION_DATA = 'section-data';

  const checkNoDataClass = (keyToCheck: string) =>
    keyToCheck === NO_DATA ? NO_DATA_PLACEHOLDER : undefined;
  console.log({ title }, { opportunityName }, { isApprovalCountPresent });
  return (
    <div className="card">
      <div className="header-section">
        <div>
          <p className={checkNoDataClass(title)}>{title}</p>
          <p className={checkNoDataClass(opportunityName)}>{opportunityName}</p>
        </div>
      </div>

      <div className="info-section">
        <div className={CLASS_SECTION_DATA}>
          <span>
            <b>Customer:</b>{' '}
          </span>
          <span className={checkNoDataClass(customer)}>{customer}</span>
        </div>
        <div className={CLASS_SECTION_DATA}>
          <span>
            <b>Protocol Number:</b>
          </span>
          <span className={checkNoDataClass(protocolNumber)}>
            {protocolNumber}
          </span>
        </div>
        <div className={CLASS_SECTION_DATA}>
          <span>
            <b>Phase:</b>
          </span>
          <span className={checkNoDataClass(phase)}>{phase}</span>
        </div>
        <div className={CLASS_SECTION_DATA}>
          <span>
            <b>Therapeutic Area:</b>
          </span>
          <span className={checkNoDataClass(therapeuticArea)}>
            {therapeuticArea}
          </span>
        </div>
        <div className={CLASS_SECTION_DATA}>
          <span>
            <b>Verbatim Indication:</b>
          </span>
          <span className={checkNoDataClass(verbatimIndication)}>
            {verbatimIndication}
          </span>
        </div>
        <div className={CLASS_SECTION_DATA}>
          <span>
            <b>Bid Due Date:</b>
          </span>
          <span className={checkNoDataClass(dueDate)}>{dueDate}</span>
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
          <p>Strategy Development</p>
        </div>

        <div
          className="button"
          id="approvals"
          role="presentation"
          onClick={setProposalTypeView}
          disabled={!isApprovalCountPresent}
        >
          {!isApprovalCountPresent ? (
            <ThumbsUp
              fontSize="large"
              htmlColor={!isApprovalCountPresent ? '#7f7f7f' : '#1faa00'}
              style={{ transform: 'scaleX(-1)' }}
            />
          ) : (
            <Link to={`${OPPORTUNITY}${title}?viewType=approvals`}>
              <ThumbsUp
                fontSize="large"
                htmlColor={!isApprovalCountPresent ? '#7f7f7f' : '#1faa00'}
                style={{ transform: 'scaleX(-1)' }}
              />
            </Link>
          )}

          <p>Approvals</p>
        </div>

        <div
          className="button"
          id="documents"
          role="presentation"
          onClick={setProposalTypeView}
        >
          <Link to={`${OPPORTUNITY}${title}?viewType=documents`}>
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
