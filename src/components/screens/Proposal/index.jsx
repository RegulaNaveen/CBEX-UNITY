// @flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import type { Match } from 'react-router-dom';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { compose } from 'redux';
import { getProposal } from '../../../actions/proposal-actions';
import { refreshAuthData } from '../../../actions/auth-actions';
import { getProposalDetails, isProposalLoading } from '../../../selectors';
import Questions from './Questions';
import Toolbar from '../../Toolbar';
import TabButtons from '../../common/TabButtons';
import Documents from './Documents';

type State = {
  selectedView: string
};

type Props = {
  authData: Map,
  details: Map,
  match: Match,
  isLoading: boolean,
  getRefreshAuthData: Function,
  getProposalInfo: Function
};

export class Proposal extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      selectedView: 'questions'
    };
  }

  componentDidMount() {
    const { getProposalInfo, match, authData, getRefreshAuthData } = this.props;

    if (!authData) getRefreshAuthData();

    getProposalInfo(match.params.id);
  }

  onChangeProposalView = (selectedView: string) => {
    this.setState({ selectedView });
  };

  renderContent = () => {
    const { selectedView } = this.state;
    const { isLoading, details } = this.props;

    const { 'CRM #': crm } = details;
    const placeholder = 'No data';

    if (isLoading)
      return (
        <div className="proposal-loader">
          <Loader type="TailSpin" color="#297DFD" height={100} width={100} />
        </div>
      );

    return (
      <div className="proposal-details">
        <h1>{crm || placeholder}</h1>

        <TabButtons
          elements={['questions', 'documents']}
          selectedView={selectedView}
          onChangeView={this.onChangeProposalView}
        />

        {selectedView === 'questions' ? <Questions /> : <Documents />}
      </div>
    );
  };

  render() {
    return (
      <div className="proposal-wrapper">
        <Toolbar />
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = (state: Map) => ({
  details: getProposalDetails(state),
  isLoading: isProposalLoading(state)
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    getRefreshAuthData: refreshAuthData,
    getProposalInfo: getProposal
  })
)(Proposal);
