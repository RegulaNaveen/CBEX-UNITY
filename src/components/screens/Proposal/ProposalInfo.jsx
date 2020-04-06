// @flow
import React from 'react';

function ProposalInfo() {
  return (
    <div className="proposalInfo-wrapper">
      <p className="proposalInfo-title">RFP-1028</p>
      <p className="proposalInfo-subtitle">Details</p>
      <div className="proposalInfo-details">
        <div className="proposalInfo-details-row">
          <div className="proposalInfo-details-column">
            <p className="proposalInfo-details-title">Account Executive:</p>
            <p className="proposalInfo-details-subtitle">Jan Levinson-Gould</p>
          </div>
          <div className="proposalInfo-details-column">
            <div className="proposalInfo-details-title">
              Business Development:
            </div>
            <div className="proposalInfo-details-subtitle">Dwight Schrute</div>
          </div>
        </div>
        <div className="proposalInfo-details-row">
          <div className="proposalInfo-details-column">
            <div className="proposalInfo-details-title">Proposal Director:</div>
            <div className="proposalInfo-details-subtitle">Michael Scott</div>
          </div>
          <div className="proposalInfo-details-column">
            <div className="proposalInfo-details-title">Labs:</div>
            <div className="proposalInfo-details-subtitle">Kevin Malone</div>
          </div>
        </div>
        <div className="proposalInfo-details-row">
          <div className="proposalInfo-details-row-segment">
            <div className="proposalInfo-details-title">Synopsis Sent:</div>
            <div className="proposalInfo-details-data">Yes</div>
          </div>
          <div className="proposalInfo-details-row-segment">
            <div className="proposalInfo-details-title">Phase:</div>
            <div className="proposalInfo-details-data">2</div>
          </div>
          <div className="proposalInfo-details-row-segment">
            <div className="proposalInfo-details-title">Number of Sites:</div>
            <div className="proposalInfo-details-data">12</div>
          </div>
        </div>
        <div className="proposalInfo-details-row">
          <div className="proposalInfo-details-column">
            <div className="proposalInfo-details-title">Countries:</div>
            <div className="proposalInfo-details-subtitle">
              France, UK, Italy, Spain
            </div>
          </div>
          <div className="proposalInfo-details-column">
            <div className="proposalInfo-details-title">Indication:</div>
            <div className="proposalInfo-details-subtitle">Myopia</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProposalInfo;
