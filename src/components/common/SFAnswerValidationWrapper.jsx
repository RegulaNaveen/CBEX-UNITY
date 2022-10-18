import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSelectedBid, getShowNaCheckbox } from '../../redux/selectors';
import { SF_HOST_URL } from '../../constants/api';

const primarySFobject = {
  ResourceRequest: 'pse__Resource_Request__c',
  Opportunity: 'Opportunity',
  BidHistory: 'Bid_History__c',
  Account: 'Account',
};

class SFAnswerValidationWrapper extends Component {
  constructor(props) {
    super(props);
  }

  getLink() {
    const { sfObject, selectedBid } = this.props;
    const agreementId = selectedBid.get('agreementId') || '';
    const opportunityId = selectedBid.get('opportunityId') || '';
    const accountId = selectedBid.get('accountId') || '';
    if (sfObject === primarySFobject.BidHistory)
      return `${SF_HOST_URL}lightning/r/Bid_History__c/${agreementId}/view`;
    if (sfObject === primarySFobject.Opportunity)
      return `${SF_HOST_URL}lightning/r/Opportunity/${opportunityId}/view`;
    if (sfObject === primarySFobject.ResourceRequest)
      return `${SF_HOST_URL}lightning/r/Bid_History__c/${agreementId}/related/Bid_History_Resource_Requests__r/view`;
    if (sfObject === primarySFobject.Account)
      return `${SF_HOST_URL}lightning/r/Account/${accountId}/view`;
    return `${SF_HOST_URL}`;
  }

  render() {
    const { hasDifferentSFanswer, showNaCheckbox } = this.props;
    return (
      <div
        className={`wrap-with-validation ${
          hasDifferentSFanswer ? 'hasDifferentSFanswer' : ''
        }${showNaCheckbox ? 'markNaActive' : ''}`}
      >
        {this.props.children}
        {hasDifferentSFanswer && (
          <div className="alert-sf-diff">
            <ul>
              <li>Does not match Salesforce value.</li>
              <li>
                <a
                  tabIndex={-1}
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
  selectedBid: getSelectedBid(state),
  showNaCheckbox: getShowNaCheckbox(state),
});

export default connect(mapStateToProps)(SFAnswerValidationWrapper);
