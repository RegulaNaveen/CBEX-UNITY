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
  getOpportunity,
  onGetValidatedProposalDetails
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
import UnityGrid from '../../common/atoms/inputs/Grid';
import UnityTab from '../../common/atoms/inputs/Tab';
import { onHandleOpenClose } from '../../../redux/actions/sidebar-actions';

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
  getValidatedData: (proposalId: string) => void,
  eventCategories: any,
  userActions: any,
  trackEvent: any,
  trackPageView: any,
  proposalDetail: any,
  getOpportunityInfo: (oppId: string) => void
};

export class Opportunity extends Component<Props, State> {
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
      getOpportunityInfo,
      authData,
      getRefreshAuthData,
      getValidatedData,

      trackPageView,
      eventCategories,
      match: { params }
    } = this.props;

    const selectedView = localStorage.getItem('proposalTypeView');

    if (selectedView) this.setState({ selectedView });

    if (!authData) getRefreshAuthData();

    getOpportunityInfo(params.id);

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
    const { enableValidateTab } = this.state;
    const {
      isLoading,
      details,
      isOpen,
      match: { params }
    } = this.props;

    if (isLoading)
      return (
        <div className="proposal-loader">
          <Loader type="TailSpin" color="#297DFD" height={100} width={100} />
        </div>
      );

    return (
      <div className="proposal-details">
        <UnityGrid data={details} isOpen={isOpen} />
        <UnityTab id={params.id} enableValidateTab={enableValidateTab} />
      </div>
    );
  };

  componentWillUnmount(){
    const { handleOpenClose} = this.props;
    if(handleOpenClose)
     handleOpenClose(false);
  }

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
  proposalDetail: getProposalDetails(state),
  isOpen: getIsOpen(state),
  details: getProposalDetails(state),
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    getRefreshAuthData: onRefreshUserData,
    getOpportunityInfo: getOpportunity,
    getValidatedData: onGetValidatedProposalDetails,
    handleOpenClose: onHandleOpenClose,
  })
)(MatomoHOC(Opportunity));
