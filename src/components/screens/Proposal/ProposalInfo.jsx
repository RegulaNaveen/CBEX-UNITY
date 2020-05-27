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
      <p className="pi-title">{crm || 'No data'}</p>
      <p className="pi-subtitle">Details</p>
      <div className="pi-details">
        <div className="pi-details-row">
          <div className="pi-details-column">
            <p className="pi-details-title">Customer:</p>
            <p className="pi-details-subtitle">{customer || 'No data'}</p>
          </div>
          <div className="pi-details-column">
            <p className="pi-details-title">Therapeutic Area:</p>
            <p className="pi-details-subtitle">
              {therapeuticArea || 'No data'}
            </p>
          </div>
        </div>
        <div className="pi-details-row">
          <div className="pi-details-column">
            <p className="pi-details-title">Line of Business:</p>
            <p className="pi-details-subtitle">{lineOfBusiness || 'No data'}</p>
          </div>
          <div className="pi-details-column">
            <p className="pi-details-title">Verbatim Indication:</p>
            <p className="pi-details-subtitle">
              {verbatimIndication || 'No data'}
            </p>
          </div>
        </div>
        <div className="pi-details-row">
          <div className="pi-details-column">
            <p className="pi-details-title">Product Name:</p>
            <p className="pi-details-subtitle">{productName || 'No data'}</p>
          </div>
          <div className="pi-details-column">
            <p className="pi-details-title">Protocol Number:</p>
            <p className="pi-details-subtitle">{protocolNumber || 'No data'}</p>
          </div>
        </div>
        <div className="pi-details-row">
          <div className="pi-details-row-segment">
            <p className="pi-details-title">IQVIA Biotech:</p>
            <p className="pi-details-data">{iqviaBiotech || 'No data'}</p>
          </div>
          <div className="pi-details-row-segment">
            <p className="pi-details-title">Phase:</p>
            <p className="pi-details-data">
              {phase ? phase.split(' ')[1] : 'No data'}
            </p>
          </div>
          <div className="pi-details-row-segment">
            <p className="pi-details-title">Bid DueDate:</p>
            <p className="pi-details-data">{bidDueDate || 'No data'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProposalInfo;
