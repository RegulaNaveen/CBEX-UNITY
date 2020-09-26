// @flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import type { Match } from 'react-router-dom';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import classNames from 'classnames';
import { compose } from 'redux';
import { getProposal, onGetValidatedProposalDetails } from '../../../actions/proposal-actions';
import { onRefreshUserData } from '../../../actions/sso-auth-actions';
import {
  getIsOpen,
  getPendingValidatedItems,
  getProposalDetails,
  isProposalLoading
} from '../../../redux/selectors';
import Questions from './Questions';
import Toolbar from '../../views/toolbar';
import TabButtons from '../../common/TabButtons';
import Documents from './Documents';
import Validate from './Validate';

type State = {
  selectedView: string
};

type Props = {
  authData: Map,
  details: Map,
  match: Match,
  isLoading: boolean,
  isSidebarOpen: boolean,
  notifications: number,
  getRefreshAuthData: Function,
  getProposalInfo: Function,
  getValidatedData: (proposalId: string) => void
};

export class Proposal extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      selectedView: 'questions'
    };
  }

  componentDidMount() {
    const {
      getProposalInfo,
      authData,
      getRefreshAuthData,
      getValidatedData,
      match: { params }
    } = this.props;

    const selectedView = localStorage.getItem('proposalTypeView');

    if (selectedView) this.setState({ selectedView });

    if (!authData) getRefreshAuthData();

    getProposalInfo(params.id);
    getValidatedData(params.id);
  }

  componentWillUnmount() {
    localStorage.removeItem('proposalTypeView');
    localStorage.removeItem('proposalId');
  }

  onChangeProposalView = (selectedView: string) => {
    this.setState({ selectedView });
  };

  renderContent = () => {
    const { selectedView } = this.state;
    const { isLoading, details, notifications } = this.props;

    const viewsMap = {
      questions: <Questions />,
      documents: <Documents />,
      validate: <Validate />
    };

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
          elements={[
            { tabName: 'questions' },
            { tabName: 'documents' },
            { tabName: 'validate', notifications }
          ]}
          selectedView={selectedView}
          onChangeView={this.onChangeProposalView}
        />

        {viewsMap[selectedView]}
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
      </div>
    );
  }
}

const mapStateToProps = (state: Map) => ({
  details: getProposalDetails(state),
  isLoading: isProposalLoading(state),
  isSidebarOpen: getIsOpen(state),
  notifications: getPendingValidatedItems(state)
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    getRefreshAuthData: onRefreshUserData,
    getProposalInfo: getProposal,
    getValidatedData: onGetValidatedProposalDetails
  })
)(Proposal);
