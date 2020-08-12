// @flow
import React from 'react';
import '../../../styles/App.scss';
import { Folder, Clipboard, RightArrow } from '../svg/index';

type Props = {
  info: Array<Object>,
  title: string,
  daysRemain: number,
  opportunityName: string
};

const Card = ({ info, title, daysRemain, opportunityName }: Props) => (
  <div className="card">
    <div className="header-section">
      <div>
        <p id="title">{title}</p>
        <p id="proposal-name">{opportunityName}</p>
      </div>
      <div>
        <p id="remain-days">{daysRemain}</p>
        <p id="info-days">Days until Due</p>
      </div>
    </div>
    <div className="info-section">
      {info.map(item => {
        return (
          <>
            <p key={Math.random()}>{item.label}</p>
            <p key={Math.random()}>{item.info}</p>
          </>
        );
      })}
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

export default Card;
