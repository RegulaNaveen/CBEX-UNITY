// @flow
import React, { Component } from 'react';
import { withRouter, Match } from 'react-router-dom';
import { Map } from 'immutable'; // NOSONAR
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import classNames from 'classnames';
import { compose } from 'redux';
import {
  UpdateNewBid,
  expandAllSectionsAction,
  getOpportunity,
  onGetValidatedProposalDetails,
  closeNewbidflags,
  updateAnswerFromWebSocket,
  updateProposalDetailFromWebSocket,
  updateSwitchTempStatusFromWebSocket,
  updateSwitchInProgress
} from '../../../redux/actions/proposal-actions';
import { updateProposalNotesFromWebSocket } from '../../../redux/actions/notepad-actions';
import { onRefreshUserData } from '../../../redux/actions/sso-auth-actions';
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
import { WebsocketProvider } from '../../../context/y-websocket';
import { NOTES_SOCKET_URL } from '../../../constants/api';
import NotesSocketContext from '../../../context/notesSocketContext';
import * as Y from 'yjs';

const ThemeContext = React.createContext('light');
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
  setSeenOne: Function
};

export class Opportunity extends Component<Props, State> {
  static contextType = SocketContext;

  constructor(props: Object) {
    super(props);
    this.state = {
      selectedView: 'questions',
      enableValidateTab: false,
      windowSize: window.innerWidth,
      ydoc: new Y.Doc(),
      wsInstance: undefined
    };
  }

  componentDidMount() {
    const {
      getOpportunityInfo,
      authData,
      getRefreshAuthData,
      getValidatedData,
      expandAllSections,
      trackPageView,
      eventCategories,
      location: { search },
      match: { params },
      setSeenOne
    } = this.props;
    const winLocationSearch = window.location.search;
    const queryparams = new URLSearchParams(winLocationSearch);
    const notificationId = queryparams.get('notification_id');
    if (notificationId) {
      setSeenOne(notificationId);
    }
    expandAllSections(false);
    const selectedView = new URLSearchParams(search).get('viewType');
    if (selectedView && selectedView === 'documents')
      this.setState({ selectedView });

    if (!authData) getRefreshAuthData();

    getOpportunityInfo(params.id);

    window.addEventListener('storage', e => this.handleStorageChange(e));
    window.addEventListener('resize', this.handleResize);
    const windowSize = window.innerWidth;

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

    // Track Page view
    trackPageView({
      documentTitle: `${eventCategories.plainPd}`
    });

    // Scroll
    try {
      console.log('Back to top#');
      window.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
    }

    if (!this.state.wsInstance) {
      const {
        match: { params }
      } = this.props;

      console.log('creating new connection');
      const { ydoc } = this.state;
      const storedValue = `doc-${params.id}`;
      if (params.id) {
        const wsProvider = new WebsocketProvider(
          NOTES_SOCKET_URL,
          `?=${storedValue}&`,
          ydoc
        );
        this.setState({ wsInstance: wsProvider });
      }
    }
  }

  componentDidUpdate() {
    const {
      match: { params }
    } = this.props;
    this.context.updateSocketOppId(params.id);
  }

  componentWillUnmount() {
    const { handleOpenClose } = this.props;
    if (handleOpenClose) handleOpenClose(false);

    localStorage.removeItem('proposalTypeView');
    localStorage.removeItem('proposalId');

    window.removeEventListener('storage', this.handleStorageChange);
    this.context.updateSocketOppId(null);
    this.state.wsInstance?.destroy();
  }

  handleResize = () => {
    let windowSize = window.innerWidth;

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

  onChangeProposalView = (selectedView: string) => {
    this.setState({ selectedView });
    this.trackMatomoEventTabs(selectedView);
  };

  renderContent = () => {
    const { enableValidateTab, selectedView, windowSize } = this.state;
    const {
      isLoading,
      details,
      isOpen,
      selectedBid,

      match: { params }
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
        />
        <NotesSocketContext.Provider
          value={{ wsInstance: this.state.wsInstance, ydoc: this.state.ydoc }}
        >
          <UnityTab
            id={params.id}
            enableValidateTab={enableValidateTab}
            selectedView={selectedView}
          />
        </NotesSocketContext.Provider>
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
  newbidflag: getStatusOfNewBid(state)
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
    setSeenOne: notificationActions.setSeenOne
  })
)(MatomoHOC(Opportunity));
