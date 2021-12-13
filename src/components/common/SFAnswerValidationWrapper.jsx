import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProposalDetails } from '../../redux/selectors';
import { SF_HOST_URL } from '../../constants/api';

const primarySFobject = {
  ResourceRequest: 'pse__Resource_Request__c',
  Opportunity: 'Opportunity',
  BidHistory: 'Bid_History__c'
};

class SFAnswerValidationWrapper extends Component {
  constructor(props) {
    super(props);
  }

  getLink() {
    const { sfObject, proposalDetail } = this.props;
    if (sfObject === primarySFobject.BidHistory)
      return `${SF_HOST_URL}/lightning/r/Bid_History__c/${proposalDetail.agreementId}/view`;
    if (sfObject === primarySFobject.Opportunity)
      return `${SF_HOST_URL}/lightning/r/Opportunity/${proposalDetail.opportunityId}/view`;
    if (sfObject === primarySFobject.ResourceRequest)
      return `${SF_HOST_URL}/lightning/r/Bid_History__c/${proposalDetail.agreementId}/related/Bid_History_Resource_Requests__r/view`;
    return `${SF_HOST_URL}`;
  }

  render() {
    const { hasDifferentSFanswer } = this.props;
    console.log(this.getLink());
    return (
      <div
        className={`wrap-with-validation ${
          hasDifferentSFanswer ? 'hasDifferentSFanswer' : ''
        }`}
      >
        {this.props.children}
        {hasDifferentSFanswer && (
          <div className="alert-sf-diff">
            <ul>
              <li>Does not match Salesforce value</li>
              <li>
                <a
                  className="take-me-to-SF"
                  href={this.getLink()}
                  target="_blank"
                  rel="noreferrer"
                >
                  Click here to open on SF
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: Object) => ({
  proposalDetail: getProposalDetails(state)
});

export default connect(mapStateToProps)(SFAnswerValidationWrapper);
