// @flow
import React from 'react';

type Props = {
  data: Object
};

function ProposalInfo({ data }: Props) {
  const {
    title,
    accountExecutive,
    businessDevelopment,
    proposalDirector,
    labs,
    synopsis,
    phase,
    sites,
    countries,
    indication
  } = data;

  return (
    <div className="pi-wrapper">
      <p className="pi-title">{title}</p>
      <p className="pi-subtitle">Details</p>
      <div className="pi-details">
        <div className="pi-details-row">
          <div className="pi-details-column">
            <p className="pi-details-title">Account Executive:</p>
            <p className="pi-details-subtitle">{accountExecutive}</p>
          </div>
          <div className="pi-details-column">
            <p className="pi-details-title">Business Development:</p>
            <p className="pi-details-subtitle">{businessDevelopment}</p>
          </div>
        </div>
        <div className="pi-details-row">
          <div className="pi-details-column">
            <p className="pi-details-title">Proposal Director:</p>
            <p className="pi-details-subtitle">{proposalDirector}</p>
          </div>
          <div className="pi-details-column">
            <p className="pi-details-title">Labs:</p>
            <p className="pi-details-subtitle">{labs}</p>
          </div>
        </div>
        <div className="pi-details-row">
          <div className="pi-details-row-segment">
            <p className="pi-details-title">Synopsis Sent:</p>
            <p className="pi-details-data">{synopsis ? 'Yes' : 'No'}</p>
          </div>
          <div className="pi-details-row-segment">
            <p className="pi-details-title">Phase:</p>
            <p className="pi-details-data">{phase}</p>
          </div>
          <div className="pi-details-row-segment">
            <p className="pi-details-title">Number of Sites:</p>
            <p className="pi-details-data">{sites}</p>
          </div>
        </div>
        <div className="pi-details-row">
          <div className="pi-details-column">
            <p className="pi-details-title">Countries:</p>
            <p className="pi-details-subtitle">{countries.join(', ')}</p>
          </div>
          <div className="pi-details-column">
            <p className="pi-details-title">Indication:</p>
            <p className="pi-details-subtitle">{indication}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProposalInfo;
