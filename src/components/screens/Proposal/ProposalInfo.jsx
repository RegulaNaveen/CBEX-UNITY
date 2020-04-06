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
            <div className="proposalInfo-details-data">
              Business Development:
            </div>
            <div className="proposalInfo-details-data">Dwight Schrute</div>
          </div>
        </div>
        <div className="proposalInfo-details-row">
          <div className="proposalInfo-details-column">
            <div className="proposalInfo-details-data">Proposal Director:</div>
            <div className="proposalInfo-details-data">Michael Scott</div>
          </div>
          <div className="proposalInfo-details-column">
            <div className="proposalInfo-details-data">Labs:</div>
            <div className="proposalInfo-details-data">Kevin Malone</div>
          </div>
        </div>
        <div className="proposalInfo-details-row">
          <div className="proposalInfo-details-column">
            <div className="proposalInfo-details-data">Synopsis Sent:</div>
            <div className="proposalInfo-details-data">Yes</div>
          </div>
          <div className="proposalInfo-details-column">
            <div className="proposalInfo-details-data">Phase:</div>
            <div className="proposalInfo-details-data">2</div>
          </div>
          <div className="proposalInfo-details-column">
            <div className="proposalInfo-details-data">Number of Sites:</div>
            <div className="proposalInfo-details-data">12</div>
          </div>
        </div>
        <div className="proposalInfo-details-row">
          <div className="proposalInfo-details-column">
            <div className="proposalInfo-details-data">Countries:</div>
            <div className="proposalInfo-details-data">
              France, UK, Italy, Spain
            </div>
          </div>
          <div className="proposalInfo-details-column">
            <div className="proposalInfo-details-data">Indication:</div>
            <div className="proposalInfo-details-data">Myopia</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProposalInfo;
