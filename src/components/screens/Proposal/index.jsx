// @flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import type { Match } from 'react-router-dom';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import classNames from 'classnames';
import { compose } from 'redux';
import {
  getProposal,
  onGetValidatedProposalDetails,
  getOpportunity
} from '../../../redux/actions/proposal-actions';
import { fetchNotes } from '../../../redux/actions/notepad-actions';
import { onRefreshUserData } from '../../../redux/actions/sso-auth-actions';
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
import MatomoHOC from '../../HOC/MatomoHOC';
import UnityFooter from '../../common/Footer';
import resData from '../../../constants/sample_response.json';

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
  getValidatedData: (proposalId: string) => void,
  getNotes: (proposalId: string) => void,
  eventCategories: any,
  userActions: any,
  trackEvent: any,
  trackPageView: any,
  proposalDetail: any,
  getOpportunityInfo: (proposalId: string) => void
};

export class Proposal extends Component<Props, State> {
  toRef;

  constructor(props: Object) {
    super(props);

    this.state = {
      selectedView: 'questions',
      enableValidateTab: false
    };
  }

  componentDidMount() {
    const {
      getProposalInfo,
      authData,
      getRefreshAuthData,
      getValidatedData,
      getNotes,
      trackPageView,
      eventCategories,
      match: { params },
      getOpportunityInfo
    } = this.props;

    const selectedView = localStorage.getItem('proposalTypeView');

    if (selectedView) this.setState({ selectedView });

    if (!authData) getRefreshAuthData();

    // getProposalInfo(params.id);

    getOpportunityInfo('UZA80784');

    getNotes(params.id);

    window.addEventListener('storage', e => this.handleStorageChange(e));

    const enableValidateTab = localStorage.getItem('enableValidateTab');
    if (enableValidateTab === null) {
      localStorage.setItem('enableValidateTab', false);
    } else if (enableValidateTab === 'true') {
      getValidatedData(params.id);
      this.setState({
        enableValidateTab: true
      });
    }

    // Track Page view
    trackPageView({
      documentTitle: `${eventCategories.plainPd}`
    });
  }

  componentWillUnmount() {
    localStorage.removeItem('proposalTypeView');
    localStorage.removeItem('proposalId');

    window.removeEventListener('storage', this.handleStorageChange);
  }

  trackMatomoEventTabs = tab => {
    const {
      eventCategories,
      userActions,
      proposalDetail,
      trackEvent
    } = this.props;
    trackEvent({
      category: eventCategories.pd(this.props),
      action: `Tab: ${userActions.click} On ${tab}`,
      customDimensions: [
        {
          id: 1,
          value: JSON.stringify(proposalDetail)
        }
      ]
    });
  };

  onChangeProposalView = (selectedView: string) => {
    this.setState({ selectedView });
    this.trackMatomoEventTabs(selectedView);
  };

  handleStorageChange(e) {
    const {
      getValidatedData,
      match: { params }
    } = this.props;

    if (e.key === 'enableValidateTab') {
      const isEnabled = e.newValue === 'true';
      const { selectedView: selectedViewState } = this.state;
      this.setState({
        enableValidateTab: isEnabled,
        selectedView:
          !isEnabled && selectedViewState === 'validate'
            ? 'questions'
            : selectedViewState
      });
      if (isEnabled) {
        getValidatedData(params.id);
      }
    }
  }

  renderContent = () => {
    const { selectedView, enableValidateTab } = this.state;
    const {
      isLoading,
      details,
      notifications,
      match: { params }
    } = this.props;

    const viewsMap = {
      questions: <Questions proposalID={params.id} />,
      documents: <Documents />
      // validate: <Validate />
    };

    if (enableValidateTab) {
      viewsMap.validate = <Validate />;
    }

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
        {enableValidateTab ? (
          <TabButtons
            elements={[
              { tabName: 'questions' },
              { tabName: 'documents' },
              { tabName: 'validate', notifications }
            ]}
            selectedView={selectedView}
            onChangeView={this.onChangeProposalView}
          />
        ) : (
          <TabButtons
            elements={[
              { tabName: 'questions' },
              { tabName: 'documents' }
              // { tabName: 'validate', notifications }
            ]}
            selectedView={selectedView}
            onChangeView={this.onChangeProposalView}
          />
        )}
        {viewsMap[selectedView]}
      </div>
    );
  };

  render() {
    const { isSidebarOpen, proposalDetail } = this.props;
    const { questionTemplateVersionNumber } = proposalDetail;
    return (
      <div
        className={classNames('proposal-wrapper', {
          'is-collapsed': isSidebarOpen
        })}
      >
        <Toolbar />
        {this.renderContent()}
        <UnityFooter
          questionTemplateVersionNumber={questionTemplateVersionNumber || ''}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: Map) => ({
  details: getProposalDetails(state),
  isLoading: isProposalLoading(state),
  isSidebarOpen: getIsOpen(state),
  notifications: getPendingValidatedItems(state),
  proposalDetail: getProposalDetails(state)
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    getRefreshAuthData: onRefreshUserData,
    getProposalInfo: getProposal,
    getValidatedData: onGetValidatedProposalDetails,
    getNotes: fetchNotes,
    getOpportunityInfo: getOpportunity
  })
)(MatomoHOC(Proposal));
