// @flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import type { Match } from 'react-router-dom';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import classNames from 'classnames';
import { compose } from 'redux';
import { getProposal } from '../../../actions/proposal-actions';
import { refreshAuthData } from '../../../actions/auth-actions';
import {
  getIsOpen,
  getPendingValidatedItems,
  getProposalDetails,
  isProposalLoading
} from '../../../selectors';
import Questions from './Questions';
import Toolbar from '../../Toolbar';
import TabButtons from '../../common/TabButtons';
import Documents from './Documents';
import Validate from './Validate';
import ComposedIcon from '../../common/ComposedIcon';

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

    const selectedView = localStorage.getItem('proposalTypeView');

    if (selectedView) this.setState({ selectedView });

    if (!authData) getRefreshAuthData();

    getProposalInfo(match.params.id);
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
        <div className="proposal-detail">
          <div className="proposal-info-view">
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
          </div>

          {selectedView === 'validate' ? (
            <div className="proposal-legend">
              <h2>Legend</h2>
              <p>
                <ComposedIcon iconType="match" width={20} height={20} /> Current
                CRM Matches Intake Document Scan
              </p>
              <p>
                <ComposedIcon iconType="no match" width={20} height={20} />
                Current CRM does not match Intake Document Scan. Validate
                information and update as required
              </p>
              <p>
                <ComposedIcon iconType="null" width={20} height={20} /> Data not
                found by Intake Document Scan
              </p>
            </div>
          ) : null}
        </div>

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
    getRefreshAuthData: refreshAuthData,
    getProposalInfo: getProposal
  })
)(Proposal);
