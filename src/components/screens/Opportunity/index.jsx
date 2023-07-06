/* eslint-disable react/prop-types */
/* eslint-disable import/named */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable flowtype/no-types-missing-file-annotation */
import React, { Component } from 'react';
import { withRouter, Match } from 'react-router-dom';
import { Map } from 'immutable'; // NOSONAR
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import classNames from 'classnames';
import { compose } from 'redux';
import isEmpty from 'lodash/isEmpty';
import {
  UpdateNewBid,
  expandAllSectionsAction,
  getOpportunity,
  onGetValidatedProposalDetails,
  closeNewbidflags,
  updateAnswerFromWebSocket,
  updateProposalDetailFromWebSocket,
  updateSwitchTempStatusFromWebSocket,
  updateSwitchInProgress,
  resetProposalId,
  setFlag,
  changeBid,
  activateProposalLoading,
  getIntegrationsData,
  resetQuestionsFilterAction,
  toggleEditCustomNameModal,
  onEditCustomName
} from '../../../redux/actions/proposal-actions';
import { resetFiltersAction } from '../../../redux/actions/approval-actions';
import { updateProposalNotesFromWebSocket } from '../../../redux/actions/notepad-actions';
import { onRefreshUserData } from '../../../redux/actions/sso-auth-actions';
import { getSFNonEditabelField } from '../../../redux/actions/proposals-actions';
import { saveRecentOppActivity } from '../../../api/proposals';
import {
  getIsOpen,
  getProposalDetails,
  getSelectedBid,
  isProposalLoading,
  getStatusOfNewBid
} from '../../../redux/selectors';
import Toolbar from '../../views/toolbar';
import MatomoHOC from '../../HOC/MatomoHOC';
import UnityFooter from '../../common/Footer';
import UnityGrid from '../../common/atoms/inputs/Grid';
import UnityTab from '../../common/atoms/inputs/Tab';
import { onHandleOpenClose } from '../../../redux/actions/sidebar-actions';
import ProcessingCRM from '../../views/modals/ProcessingCRM';
import BidDoneBanner from '../../views/BidDoneBanner';
import GenerateDocs from '../../views/export-component/GenerateDocs';
import { SocketContext } from '../../../context/SocketContext';
import * as notificationActions from '../../../redux/actions/notification-actions';
import { UBUILD, DASHBOARD } from '../../../routes';
import featureFlags from '../../../constants/featureFlags';
import launchDarkly from '../../../utils/launchDarkly';
import {
  getBidList,
  selectFavourite,
  selectCustomName,
  selectNextMilestone
} from '../../../redux/selectors/proposal';
import {
  clearSearchAction,
  closeSearchAction
} from '../../../redux/actions/search-actions';

type State = {
  selectedView: string
};

type Props = {
  authData: Map,
  details: Map,
  match: Match,
  isLoading: boolean,
  isSidebarOpen: boolean,
  isOpen: boolean,
  selectedBid: any,
  search: any,
  location: any,
  newbidflag: boolean,
  closeNewbidflag: Function,
  addNewBid: Function,
  getRefreshAuthData: Function,
  expandAllSections: Function,
  handleOpenClose: Function,
  updateAnswerAction: Function,
  updateProposalDetail: Function,
  updateSwitchTempStatus: Function,
  setSwitchInProgress: Function,
  updateProposalNotes: Function,
  getValidatedData: (proposalId: string) => void,
  eventCategories: any,
  userActions: any,
  trackEvent: any,
  trackPageView: any,
  proposalDetail: any,
  getOpportunityInfo: (oppId: string, flag?: boolean) => void,
  setSeenOne: Function,
  setResetProposalId: Function,
  setEventFlg: Function,
  bidList: any,
  changeBidInView: Function
};

export class Opportunity extends Component<Props, State> {
  static contextType = SocketContext;

  constructor(props: Object) {
    super(props);
    this.state = {
      selectedView: 'questions',
      enableValidateTab: false,
      windowSize: window.innerWidth
    };
  }

  async componentDidMount() {
    const {
      getOpportunityInfo,
      authData,
      getRefreshAuthData,
      getValidatedData,
      expandAllSections,
      trackPageView,
      eventCategories,
      setEventFlg,
      location: { search },
      match: { params },
      setSeenOne,
      selectedBid,
      getSFNonEditabelInfoField,
      location,
      ProposalLoading,
      getIntegrationsData
    } = this.props;
    ProposalLoading();
    const winLocationSearch = window.location.search;
    const queryparams = new URLSearchParams(winLocationSearch);
    const notificationId = queryparams.get('notification_id');
    const bidNumber = queryparams.get('bidNo');
    const flagValue = await launchDarkly(Object.values(featureFlags), false);
    if (flagValue) setEventFlg(flagValue);
    if (notificationId) {
      setSeenOne(notificationId);
    }
    expandAllSections(false);
    const selectedView = new URLSearchParams(search).get('viewType');
    if (selectedView) this.setState({ selectedView });
    if (!authData) getRefreshAuthData();
    getSFNonEditabelInfoField();
    getOpportunityInfo(params.id, bidNumber);
    getIntegrationsData();
    const proposalId = selectedBid.get('id', '');
    localStorage.setItem('proposalId', proposalId);
    if ((this.props && location && location?.pathname) !== UBUILD) {
      if (location?.pathname !== DASHBOARD)
        this.context.updateSocketOppId(params.id, proposalId);
      else this.context.updateSocketOppId(null, null);
    }

    window.addEventListener('storage', e => this.handleStorageChange(e));
    window.addEventListener('resize', this.handleResize);
    // const windowSize = window.innerWidth;

    // NOSONAR
    const enableValidateTab = localStorage.getItem('enableValidateTab');
    if (enableValidateTab === null) {
      localStorage.setItem('enableValidateTab', false);
    } else if (enableValidateTab === 'true') {
      getValidatedData(params.id);
      this.setState({
        enableValidateTab: true
      });
    }
    if (window && window.location && window.location.href) {
      const obj = {
        url: window.location.href,
        oppNo: params.id,
        type: 'opportunity page'
      };
      saveRecentOppActivity(obj);
    }

    // Track Page view
    trackPageView({
      documentTitle: `${eventCategories.plainPd}`
    });

    // Scroll
    try {
      window.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      match: { params },
      selectedBid,
      bidList,
      changeBidInView,
      location
    } = this.props;
    const thisProposalId = selectedBid.get('id', '');
    const { bidStatus } = selectedBid.toJS();
    const prevProposalId = prevProps.selectedBid.get('id', '');

    // Bid changed
    if (prevProposalId !== thisProposalId) {
      if ((this.props && location && location?.pathname) !== UBUILD) {
        this.context.updateSocketOppId(params.id, thisProposalId);
        localStorage.setItem('proposalId', thisProposalId);
      }
    }
    // Bid level redirection
    // Applied when a `bidNo` query param is found in the url
    // Example ?bidNo=3
    const winLocationSearch = window.location.search;
    const queryparams = new URLSearchParams(winLocationSearch);
    const bidNo = queryparams.get('bidNo');
    const prevBidList = prevProps.bidList;
    if (
      bidNo &&
      Array.isArray(bidList) &&
      bidList.length > 0 &&
      bidList.length !== prevBidList.length // check to prevent infinite rerenders
    ) {
      const bidItemToSelect = bidList.find(item => item.bidNo === bidNo);
      if (!bidStatus && !isEmpty(bidItemToSelect)) {
        changeBidInView(bidItemToSelect);
      }
    }
    // END Bid level redirection
  }

  componentWillUnmount() {
    const {
      handleOpenClose,
      setResetProposalId,
      resetQuestionsFilter,
      resetApprovalsFilter,
      closeSearch,
      clearSearch
    } = this.props;
    if (handleOpenClose) handleOpenClose(false);
    setResetProposalId();
    localStorage.removeItem('proposalTypeView');
    localStorage.removeItem('proposalId');

    window.removeEventListener('storage', this.handleStorageChange);
    this.context.updateSocketOppId(null, null);
    if (resetQuestionsFilter) resetQuestionsFilter();
    if (resetApprovalsFilter) resetApprovalsFilter();
    clearSearch();
    closeSearch();
  }

  handleResize = () => {
    const windowSize = window.innerWidth;
    this.setState({ windowSize });
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

  onChangeSelectedTab = value => {
    this.setState({ selectedView: value });
  };

  onChangeProposalView = (selectedView: string) => {
    this.setState({ selectedView });
    this.trackMatomoEventTabs(selectedView);
  };

  handleEditCustomName = () => {
    const {
      toggleEditCustomNameModal,
      onEditCustomName,
      customName,
      details
    } = this.props;
    onEditCustomName(details['CRM #'], customName);
    toggleEditCustomNameModal(true);
  };

  renderContent = () => {
    const { enableValidateTab, selectedView, windowSize } = this.state;
    const {
      isLoading,
      details,
      isOpen,
      selectedBid,
      match: { params },
      favourite,
      customName,
      nextMilestone
    } = this.props;
    const { bidStatus } = selectedBid.toJS();
    if (isLoading)
      return (
        <div className="proposal-loader">
          <Loader type="TailSpin" color="#297DFD" height={100} width={100} />
        </div>
      );
    return (
      <div className="proposal-details">
        <GenerateDocs />
        <UnityGrid
          data={details}
          isOpen={isOpen}
          windowSize={windowSize}
          bidStatus={bidStatus}
          favourite={favourite}
          customName={customName}
          nextMilestone={nextMilestone}
          handleEditCustomName={this.handleEditCustomName}
        />
        <span className="unity-tabs-container-wrapper">
          <UnityTab
            id={params.id}
            enableValidateTab={enableValidateTab}
            selectedView={selectedView}
            onChangeSelectedTab={this.onChangeSelectedTab}
          />
        </span>
      </div>
    );
  };

  render() {
    const {
      isSidebarOpen,
      selectedBid,
      newbidflag,
      closeNewbidflag
    } = this.props;
    const {
      questionTemplateVersionNumber,
      opportunityType,
      bidStatus
    } = selectedBid.toJS();
    return (
      <div
        className={classNames('proposal-wrapper', {
          'is-collapsed': isSidebarOpen
        })}
      >
        <Toolbar />

        <BidDoneBanner
          isOpen={newbidflag}
          onCloseHandler={() => closeNewbidflag()}
        />

        {this.renderContent()}

        {bidStatus && (
          <ProcessingCRM
            isOpen={bidStatus}
            title="Processing CRM data"
            message="A new Bid is being created based on CRM data"
          />
        )}

        <UnityFooter
          questionTemplateVersionNumber={questionTemplateVersionNumber || ''}
          opportunityType={opportunityType || ''}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: Map) => ({
  details: getProposalDetails(state),
  isLoading: isProposalLoading(state),
  isSidebarOpen: getIsOpen(state),
  proposalDetail: getProposalDetails(state),
  isOpen: getIsOpen(state),
  selectedBid: getSelectedBid(state),
  newbidflag: getStatusOfNewBid(state),
  bidList: getBidList(state),
  favourite: selectFavourite(state),
  customName: selectCustomName(state),
  nextMilestone: selectNextMilestone(state)
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    getRefreshAuthData: onRefreshUserData,
    getOpportunityInfo: getOpportunity,
    getValidatedData: onGetValidatedProposalDetails,
    handleOpenClose: onHandleOpenClose,
    expandAllSections: expandAllSectionsAction,
    addNewBid: UpdateNewBid,
    closeNewbidflag: closeNewbidflags,
    updateAnswerAction: updateAnswerFromWebSocket,
    updateProposalDetail: updateProposalDetailFromWebSocket,
    updateProposalNotes: updateProposalNotesFromWebSocket,
    updateSwitchTempStatus: updateSwitchTempStatusFromWebSocket,
    setSwitchInProgress: updateSwitchInProgress,
    setSeenOne: notificationActions.setSeenOne,
    setResetProposalId: resetProposalId,
    setEventFlg: setFlag,
    changeBidInView: changeBid,
    getSFNonEditabelInfoField: getSFNonEditabelField,
    ProposalLoading: activateProposalLoading,
    getIntegrationsData,
    resetQuestionsFilter: resetQuestionsFilterAction,
    resetApprovalsFilter: resetFiltersAction,
    closeSearch: closeSearchAction,
    clearSearch: clearSearchAction,
    saverecentoppactivity: saveRecentOppActivity,
    toggleEditCustomNameModal,
    onEditCustomName
  })
)(MatomoHOC(Opportunity));
