// @flow
import React from 'react';

function ProposalInfo() {
  return (
    <div className="pi-wrapper">
      <p className="pi-title">RFP-1028</p>
      <p className="pi-subtitle">Details</p>
      <div className="pi-details">
        <div className="pi-details-row">
          <div className="pi-details-column">
            <p className="pi-details-title">Account Executive:</p>
            <p className="pi-details-subtitle">Jan Levinson-Gould</p>
          </div>
          <div className="pi-details-column">
            <p className="pi-details-title">Business Development:</p>
            <p className="pi-details-subtitle">Dwight Schrute</p>
          </div>
        </div>
        <div className="pi-details-row">
          <div className="pi-details-column">
            <p className="pi-details-title">Proposal Director:</p>
            <p className="pi-details-subtitle">Michael Scott</p>
          </div>
          <div className="pi-details-column">
            <p className="pi-details-title">Labs:</p>
            <p className="pi-details-subtitle">Kevin Malone</p>
          </div>
        </div>
        <div className="pi-details-row">
          <div className="pi-details-row-segment">
            <p className="pi-details-title">Synopsis Sent:</p>
            <p className="pi-details-data">Yes</p>
          </div>
          <div className="pi-details-row-segment">
            <p className="pi-details-title">Phase:</p>
            <p className="pi-details-data">2</p>
          </div>
          <div className="pi-details-row-segment">
            <p className="pi-details-title">Number of Sites:</p>
            <p className="pi-details-data">12</p>
          </div>
        </div>
        <div className="pi-details-row">
          <div className="pi-details-column">
            <p className="pi-details-title">Countries:</p>
            <p className="pi-details-subtitle">France, UK, Italy, Spain</p>
          </div>
          <div className="pi-details-column">
            <p className="pi-details-title">Indication:</p>
            <p className="pi-details-subtitle">Myopia</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProposalInfo;
