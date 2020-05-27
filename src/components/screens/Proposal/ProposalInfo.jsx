// @flow
import React from 'react';

type Props = {
  data: Object
};

function ProposalInfo({ data }: Props) {
  const {
    bidDueDate,
    crm,
    customer,
    iqviaBiotech,
    lineOfBusiness,
    phase,
    productName,
    protocolNumber,
    therapeuticArea,
    verbatimIndication
  } = data;

  return (
    <div className="pi-wrapper">
      <p className="pi-title">{crm}</p>
      <p className="pi-subtitle">Details</p>
      <div className="pi-details">
        <div className="pi-details-row">
          <div className="pi-details-column">
            <p className="pi-details-title">Customer:</p>
            <p className="pi-details-subtitle">{customer}</p>
          </div>
          <div className="pi-details-column">
            <p className="pi-details-title">Therapeutic Area:</p>
            <p className="pi-details-subtitle">{therapeuticArea}</p>
          </div>
        </div>
        <div className="pi-details-row">
          <div className="pi-details-column">
            <p className="pi-details-title">Line of Business:</p>
            <p className="pi-details-subtitle">{lineOfBusiness}</p>
          </div>
          <div className="pi-details-column">
            <p className="pi-details-title">Verbatim Indication:</p>
            <p className="pi-details-subtitle">{verbatimIndication}</p>
          </div>
        </div>
        <div className="pi-details-row">
          <div className="pi-details-column">
            <p className="pi-details-title">Product Name:</p>
            <p className="pi-details-subtitle">{productName}</p>
          </div>
          <div className="pi-details-column">
            <p className="pi-details-title">Protocol Number:</p>
            <p className="pi-details-subtitle">{protocolNumber}</p>
          </div>
        </div>
        <div className="pi-details-row">
          <div className="pi-details-row-segment">
            <p className="pi-details-title">IQVIA Biotech:</p>
            <p className="pi-details-data">{iqviaBiotech}</p>
          </div>
          <div className="pi-details-row-segment">
            <p className="pi-details-title">Phase:</p>
            <p className="pi-details-data">
              {phase ? phase.split(' ')[1] : ''}
            </p>
          </div>
          <div className="pi-details-row-segment">
            <p className="pi-details-title">Bid DueDate:</p>
            <p className="pi-details-data">{bidDueDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProposalInfo;
