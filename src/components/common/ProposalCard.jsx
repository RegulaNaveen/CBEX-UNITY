// @flow
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Folder, Clipboard, RightArrow } from '../svg';

type Props = {
  info: Array<Object>,
  title: string,
  daysRemain: number,
  opportunityName: string
};

// TODO: Replace data structure when we know how object is structured.
const ProposalCard = ({ info, title, daysRemain, opportunityName }: Props) => (
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
      {info.map(item => (
        <>
          <p key={uuidv4()}>{item.label}</p>
          <p key={uuidv4()}>{item.info}</p>
        </>
      ))}
    </div>
    <div className="buttons-section">
      <Clipboard className="icon" />
      <p className="questions">Questions</p>
      <Folder className="icon" />
      <p className="documents">Documents</p>
    </div>
    <div className="link-section">
      <p>View Opportunity Hub</p>
      <RightArrow className="right-arrow" />
    </div>
  </div>
);

export default ProposalCard;
