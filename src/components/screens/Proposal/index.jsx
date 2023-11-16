// @flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import type { Match } from 'react-router-dom';
import { Map } from 'immutable'; // NOSONAR
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import classNames from 'classnames';
import { compose } from 'redux';
import { getProposalByID } from '../../../redux/actions/proposal-actions';
import {
  getProposalDetails,
  isProposalLoading
} from '../../../redux/selectors';
import Toolbar from '../../views/toolbar';
import AnalyticsHOC from '../../HOC/AnalyticsHOC';
import UnityFooter from '../../common/Footer';
import { OPPORTUNITY, DASHBOARD } from '../../../routes';

type State = {
  selectedView: string
};

type Props = {
  match: Match,
  isLoading: boolean,
  getProposalInfo: Function,
  proposalDetail: any
};

export class Proposal extends Component<Props, State> {
  toRef;
  async componentDidMount() {
    const {
      getProposalInfo,

      match: { params }
    } = this.props;

    const results = await getProposalInfo(params.id);
    if (results && results.proposal) {
      let url = `${window.location.origin}${OPPORTUNITY}${results.proposal.proposalDetails['CRM #']}`;
      location.replace(url);
    } else {
      let url = `${window.location.origin}${DASHBOARD}`;
      location.replace(url);
    }
  }

  renderContent = () => {
    const { isLoading } = this.props;

    if (isLoading)
      return (
        <div className="proposal-loader">
          <Loader type="TailSpin" color="#297DFD" height={100} width={100} />
        </div>
      );
  };

  render() {
    const { isSidebarOpen } = this.props;
    return (
      <div
        className={classNames('proposal-wrapper', {
          'is-collapsed': isSidebarOpen
        })}
      >
        <Toolbar />
        {this.renderContent()}
        <UnityFooter
          questionTemplateVersionNumber={''}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: Map) => ({
  isLoading: isProposalLoading(state),
  proposalDetail: getProposalDetails(state)
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    getProposalInfo: getProposalByID
  })
)(AnalyticsHOC(Proposal));
