// @flow
import React from 'react';
import { formatDate } from '../../../utils/DateUtils';

type Props = {
  data: Object
};

function ProposalInfo({ data }: Props) {
  const {
    'Bid due date': bidDueDate,
    Customer: customer,
    'Is this IQVIA Biotech': iqviaBiotech,
    'Line of business': lineOfBusiness,
    Phase: phase,
    'Product name': productName,
    'Protocol number': protocolNumber,
    'Therapeutic area': therapeuticArea,
    'Verbatim indication': verbatimIndication
  } = data;

  const placeholder = 'No data';
  const date = bidDueDate && formatDate(new Date(bidDueDate), 'dd-MMM-yyyy');

  return (
    <div id="proposal-info">
      <h2>Overview</h2>

      <div className="proposal-info-details">
        <div className="detail-column">
          <div className="detail-column-item">
            <p>Customer:</p>
            <p>{customer || placeholder}</p>
          </div>
          <div className="detail-column-item">
            <p>Therapeutic Area:</p>
            <p>{therapeuticArea || placeholder}</p>
          </div>
        </div>

        <div className="detail-column">
          <div className="detail-column-item">
            <p>Line of Business:</p>
            <p>{lineOfBusiness || placeholder}</p>
          </div>
          <div className="detail-column-item">
            <p>Verbatim Indication:</p>
            <p>{verbatimIndication || placeholder}</p>
          </div>
        </div>

        <div className="detail-column">
          <div className="detail-column-item">
            <p>Product Name:</p>
            <p>{productName || placeholder}</p>
          </div>
          <div className="detail-column-item">
            <p>Protocol Number:</p>
            <p>{protocolNumber || placeholder}</p>
          </div>
        </div>

        <div className="detail-column">
          <div className="detail-column-item">
            <p>
              IQVIA Biotech: <span>{iqviaBiotech || placeholder}</span>
            </p>
          </div>
          <div className="detail-column-item">
            <p>
              Phase: <span>{phase ? phase.split(' ')[1] : placeholder}</span>
            </p>
          </div>
          <div className="detail-column-item">
            <p>
              Bid Due Date: <span>{date || placeholder}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProposalInfo;
